import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
    switch (exception.code) {
      case 'P2000':
      case 'P2005':
      case 'P2006':
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
      case 'P2019':
        return response.sendStatus(HttpStatus.BAD_REQUEST);
      case 'P2001':
      case 'P2015':
      case 'P2018':
      case 'P2025':
        return response.sendStatus(HttpStatus.NOT_FOUND);
      case 'P2002':
      case 'P2003':
      case 'P2004':
        return response.sendStatus(HttpStatus.CONFLICT);
      default:
      // return [null, null];
    }
  }
}
