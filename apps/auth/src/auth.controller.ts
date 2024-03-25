import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserDto, RmqService } from '@app/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/impl/create-user.command';

@Controller()
export class AuthController {
  constructor(
    private rmqService: RmqService,
    private commandBus: CommandBus,
  ) {}

  @MessagePattern({ cmd: 'createUser' })
  async signup(
    @Ctx() context: RmqContext,
    @Payload() data: { userId: string; createUserDto: CreateUserDto },
  ) {
    this.rmqService.acknowledgmentMessage(context);

    await this.commandBus.execute(
      new CreateUserCommand(data.userId, data.createUserDto),
    );

    return true;
  }
}
