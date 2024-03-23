import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { MAIL_SERVICE } from '../constants';
import { MailsController } from './mail.controller';

@Module({
  imports: [RmqModule.register(MAIL_SERVICE)],
  controllers: [MailsController],
})
export class MailsModule {}
