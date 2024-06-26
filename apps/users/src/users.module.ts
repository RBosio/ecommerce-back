import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/users.controller';
import {
  DatabaseModule,
  RmqModule,
  UserRepository,
  UserSchema,
} from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/queries/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaFactory } from '@app/common/infrastructure/typeorm/user-schema.factory';
import { CommandHandlers } from './application/commands/handlers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    CqrsModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserSchema]),
  ],
  controllers: [UsersController],
  providers: [
    UserRepository,
    ...QueryHandlers,
    ...CommandHandlers,
    UserSchemaFactory,
  ],
})
export class UsersModule {}
