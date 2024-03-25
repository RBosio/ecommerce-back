import { CreateUserDto } from '@app/common';

export class CreateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly createUserDto: CreateUserDto,
  ) {}
}
