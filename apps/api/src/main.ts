/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const GLOBAL_PREFIX = 'api';

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const PORT = process.env.PORT || 8080;
  const PORTFOLIO_FRONTEND_URL = process.env.PORTFOLIO_URL || 'http://localhost:4200';

  app.enableCors({
    origin: [PORTFOLIO_FRONTEND_URL],
  });

  await app.listen(PORT, () => {
    Logger.log('Listening at http://localhost:' + PORT + '/' + GLOBAL_PREFIX);
  });
}

bootstrap();
