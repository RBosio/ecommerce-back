import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  const rmqService = app.get(RmqService);

  app.connectMicroservice(rmqService.getRmqOptions('USER'));
  
  await app.startAllMicroservices();
  await app.listen(null);
}
bootstrap();
