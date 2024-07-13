import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Isever } from 'src/common/interface';
import { WinstonModule } from 'nest-winston';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { getWinstonInstance } from '../utils/createWinstonConfig';
import { ValidationPipe } from '@nestjs/common';
import { FormatInterceptor } from 'src/interpector/response-format.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

// prisma 无法序列化BigInt mdn解决方案
Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});

const creatSwaggerDocument = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Nestjs Template Swagger')
    .setDescription('back end restful api')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
};
async function bootstrap() {
  //日志
  const logInstance = getWinstonInstance();
  const logger = WinstonModule.createLogger({ instance: logInstance });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger,
    },
  );
  creatSwaggerDocument(app);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去除前端传递的多余字段
    }),
  );
  app.useGlobalInterceptors(new FormatInterceptor());
  app.setGlobalPrefix('api/v1');
  app.enableCors(); // cors
  const server: Isever = config.get('server');
  await app.listen(server?.port ?? 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
