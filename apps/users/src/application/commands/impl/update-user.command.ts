import { UpdateUserDto } from '@app/common';

export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly updateUserDto: UpdateUserDto,
  ) {}
}
