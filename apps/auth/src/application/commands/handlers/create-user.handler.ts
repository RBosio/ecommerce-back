import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserRepository } from '@app/common';
import { UserFactory } from 'apps/auth/src/domain/user.factory';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private userFactory: UserFactory,
  ) {}

  async execute({ userId, createUserDto }: CreateUserCommand): Promise<void> {
    const { name, email, password, card_number } = createUserDto;

    if (await this.userRepository.findOneById(userId))
      throw new RpcException({
        message: 'id already exists',
        status: HttpStatus.BAD_REQUEST,
      });

    if (
      await this.userRepository.findOneByOptions({
        where: {
          email,
        },
      })
    )
      throw new RpcException({
        message: 'email already exists',
        status: HttpStatus.BAD_REQUEST,
      });

    const user = this.userFactory.create(
      userId,
      name,
      email,
      card_number,
      password,
    );

    await this.userRepository.save(user);
  }
}
