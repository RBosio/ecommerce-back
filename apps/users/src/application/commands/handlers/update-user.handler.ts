import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';
import { UserRepository } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(updateuser: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findOneById(updateuser.userId);
    if (!user) {
      throw new RpcException({
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const userUpdated = Object.assign(user, updateuser.updateUserDto);

    await this.userRepository.save(userUpdated);
  }
}
