import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Isever } from 'common/interface';
import { WinstonModule } from 'nest-winston';
import { HttpExceptionFilter } from 'filter/http-exception.filter';
import { getWinstonInstance } from '../utils/createWinstonConfig';
import { ValidationPipe } from '@nestjs/common';
import { FormatInterceptor } from 'interpector/response-format.interceptor';

declare const module: any;

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});
async function bootstrap() {
  //日志
  const instance = getWinstonInstance();
  const logger = WinstonModule.createLogger({ instance });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger,
    },
  );
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去除前端传递的多余字段
    }),
  );
  app.useGlobalInterceptors(new FormatInterceptor());
  app.setGlobalPrefix('api/v1');
  const server: Isever = config.get('server');
  await app.listen(server?.port ?? 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
