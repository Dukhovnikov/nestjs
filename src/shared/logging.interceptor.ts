import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    return call$
      .handle()
      .pipe(
        tap(() =>
          Logger.log(`${method} ${url} ${new Date()}`, context.getClass().name),
        ),
      );
  }
}
