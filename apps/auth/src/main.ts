import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common';
import { AUTH_SERVICE } from 'apps/api-gateway/src/constants';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const rmqService = app.get(RmqService);
  app.connectMicroservice(rmqService.getRmqOptions(AUTH_SERVICE));

  await app.listen(null);
  app.startAllMicroservices();
}
bootstrap();
