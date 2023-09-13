import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './constant';

// bootstrap app
(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV.PORT);
})()
