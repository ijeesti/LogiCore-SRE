import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch() 
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === 11000) {
      const status = HttpStatus.CONFLICT;
      const key = Object.keys(exception.keyValue)[0];
      const value = exception.keyValue[key];

      return response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        error: {
          code: 'DUPLICATE_KEY',
          message: `The ${key} '${value}' already exists.`,
          field: key,
        },
      });
    }

    // Default fallback for other errors
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: exception.message || 'Internal server error',
    });
  }
}