import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { RmqModule } from '@app/common';
import { CHAT_SERVICE } from '../constants';

@Module({
  imports: [RmqModule.register(CHAT_SERVICE)],
  controllers: [ChatController],
})
export class ChatModule {}
