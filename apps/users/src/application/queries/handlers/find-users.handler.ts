import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from '../impl/find-users.query';
import { User, UserRepository } from '@app/common';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
