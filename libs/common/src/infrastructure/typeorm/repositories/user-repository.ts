import { User } from '@app/common/domain';
import { UserSchema } from '../entities';
import { BaseRepository } from './base-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchemaFactory } from '../user-schema.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<UserSchema, User> {
  constructor(
    @InjectRepository(UserSchema) userRepository: Repository<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userRepository, userSchemaFactory);
  }
}
