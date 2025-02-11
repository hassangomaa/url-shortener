import { ErrorResponseDto } from '@app/lib/dto';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    //console.log({ error: JSON.stringify(exception, null, 2) });

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = 'Un error occurred';

    // for validation errors
    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      // if NODE_ENV is development return the exception
      if (process.env.NODE_ENV === 'development') {
        errorMessage = exception['message'];
      } else {
        errorMessage = 'Un error occurred';
      }
    } else if (httpStatus === HttpStatus.NOT_ACCEPTABLE) {
      const errorObj = exception['response'][0];
      const messageObj =
        errorObj['constraints'] || errorObj['children'][0]['constraints'];

      errorMessage = messageObj
        ? JSON.stringify(messageObj)
        : exception['response']?.message;
    } else {
      errorMessage = exception['message'];
    }

    const responseBody = new ErrorResponseDto(errorMessage);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
