import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log(context, 'Custom interceptor');
    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.createdAt,
        };
        delete response.created_at;

        return response;
      }),
    );
  }
}
