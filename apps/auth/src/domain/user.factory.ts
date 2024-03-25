import { EntityFactory, User } from '@app/common';

export class UserFactory implements EntityFactory<User> {
  create(
    userId: string,
    name: string,
    email: string,
    card_number: string,
    password: string,
  ): User {
    return new User(userId, name, email, card_number, password);
  }
}
