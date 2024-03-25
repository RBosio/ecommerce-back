import { User } from '@app/common';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { FindUsersQuery } from './application/queries/impl/find-users.query';

@Controller()
export class UsersController {
  constructor(private queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'findUsers' })
  findUsers(): Promise<User[]> {
    return this.queryBus.execute(new FindUsersQuery());
  }
}
