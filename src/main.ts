import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT;

    const appOtions = {
      cors: {
        origin: true,
        credentials: true,
      },
    };

    const app = await NestFactory.create(AppModule, appOtions);

    app.use(cookieParser());
    app.setGlobalPrefix('api');

    await app.listen(PORT);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

bootstrap();
