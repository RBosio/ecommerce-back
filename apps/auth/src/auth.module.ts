import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  DatabaseModule,
  RmqModule,
  UserRepository,
  UserSchema,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactory } from './domain/user.factory';
import { CommandHandlers } from './application/commands/handlers';
import { ConfigModule } from '@nestjs/config';
import { UserSchemaFactory } from '@app/common/infrastructure/typeorm/user-schema.factory';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserSchema]),
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [
    UserFactory,
    UserRepository,
    ...CommandHandlers,
    UserSchemaFactory,
  ],
})
export class AuthModule {}
