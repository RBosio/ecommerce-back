import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common';
import { AUTH_SERVICE } from '../constants';

@Module({
  imports: [RmqModule.register(AUTH_SERVICE)],
  controllers: [AuthController],
})
export class AuthModule {}
