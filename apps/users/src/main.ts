import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { RmqService } from '@app/common';
import { USER_SERVICE } from 'apps/api-gateway/src/constants';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  const rmqService = app.get(RmqService);

  app.connectMicroservice(rmqService.getRmqOptions(USER_SERVICE));

  await app.listen(null);
  await app.startAllMicroservices();
}
bootstrap();
