import { RmqService, UpdateUserDto, User } from '@app/common';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { FindUsersQuery } from '../application/queries/impl/find-users.query';
import { FindUserQuery } from '../application/queries/impl/find-user.query';
import { UpdateUserCommand } from '../application/commands/impl/update-user.command';

@Controller()
export class UsersController {
  constructor(
    private rmqService: RmqService,
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @MessagePattern({ cmd: 'findUsers' })
  findUsers(@Ctx() context: RmqContext): Promise<User[]> {
    this.rmqService.acknowledgmentMessage(context);

    return this.queryBus.execute(new FindUsersQuery());
  }

  @MessagePattern({ cmd: 'findUser' })
  findUser(
    @Ctx() context: RmqContext,
    @Payload() userId: string,
  ): Promise<User> {
    this.rmqService.acknowledgmentMessage(context);

    return this.queryBus.execute(new FindUserQuery(userId));
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(
    @Ctx() context: RmqContext,
    @Payload() data: { userId: string; updateUserDto: UpdateUserDto },
  ) {
    this.rmqService.acknowledgmentMessage(context);

    this.commandBus.execute(
      new UpdateUserCommand(data.userId, data.updateUserDto),
    );

    return true;
  }
}
