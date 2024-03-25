import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User, UserRepository } from '@app/common';
import { FindUserQuery } from '../impl/find-user.query';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: FindUserQuery): Promise<User> {
    const user = await this.userRepository.findOneById(userId);
    if (!user)
      throw new RpcException({
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      });

    return user;
  }
}
