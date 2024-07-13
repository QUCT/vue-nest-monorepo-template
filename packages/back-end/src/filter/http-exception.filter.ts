import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  LoggerService,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as requestIp from 'request-ip';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const msg: unknown = exception['response'] || 'Internal Server Error';

    this.logger.error(exception, exception.stack);

    const responseJson = {
      code: status,
      path: request.url,
      method: request.method,
      msg: exception.message || exception.name, //exception.getResponse(),
      timestamp: new Date().toISOString(),
      query: request.query,
      body: request.body,
      params: request.params,
      ip: requestIp.getClientIp(request),
      err: msg,
    };
    response.status(status).send(responseJson);
  }
}
