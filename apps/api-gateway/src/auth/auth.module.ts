import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/auth.controller';
import { RmqModule } from '@app/common';
import { AUTH_SERVICE } from '../constants';
import { ErrorHandlerModule } from '../error/error-handler.module';

@Module({
  imports: [RmqModule.register(AUTH_SERVICE), ErrorHandlerModule],
  controllers: [AuthController],
})
export class AuthModule {}
