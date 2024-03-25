import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { USER_SERVICE } from '../constants';
import { UsersController } from './infrastracture/users.controller';
import { ErrorHandlerModule } from '../error/error-handler.module';

@Module({
  imports: [RmqModule.register(USER_SERVICE), ErrorHandlerModule],
  controllers: [UsersController],
})
export class UsersModule {}
