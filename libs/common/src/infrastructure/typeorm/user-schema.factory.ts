import { Injectable } from '@nestjs/common';
import { IEntitySchema } from '../../domain/entity-schema.interface';
import { UserSchema } from './entities/user.entity';
import { User } from '../../domain/User';

@Injectable()
export class UserSchemaFactory implements IEntitySchema<UserSchema, User> {
  create(user: User): UserSchema {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      card_number: user.getCardNumber(),
      deleted_at: user.getDeletedAt(),
    };
  }

  createFromSchema(user: UserSchema): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.card_number,
      user.deleted_at,
    );
  }
}
