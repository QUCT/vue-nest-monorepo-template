import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
// import { ResponseData } from 'shared';

export interface ResponseData<T> {
  data: T;
  code: number;
  success: boolean;
  timestamp: string;
  method: string;
  path: string;
}

// 响应数据格式化拦截器
@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const responseData: ResponseData<any> = {
          code: response.statusCode || 200,
          method: response.method,
          path: response.path,
          success: true,
          message: '成功',
          timestamp: new Date().toISOString(),
          ...data,
        };

        return responseData;
      }),
    );
  }
}
