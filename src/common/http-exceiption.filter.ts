import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error: any = exception.getResponse();

        let errorMessage = error.message ? error.message : error;
        if (!(exception instanceof HttpException)) {
            errorMessage = "Server Error."
        }

        response.status(status).json({
            statusCode: status,
            error: errorMessage,
            path: request.url,
            timestamp: new Date().toISOString()
        });
    }
}