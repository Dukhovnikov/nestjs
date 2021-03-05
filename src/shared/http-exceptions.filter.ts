import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResp = {
      code: status,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message['error'] || exception.message || null
          : 'Internal Server Error',
    };

    return response.status(status).json(errorResp);
  }
}
