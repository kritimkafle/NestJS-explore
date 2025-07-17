// src/common/filters/http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'InternalServerError';

        if (
            exception instanceof PrismaClientKnownRequestError &&
            exception.code === 'P2002'
        ) {
            status = HttpStatus.BAD_REQUEST;
            message = "Employee with this email already exists.";
            error = 'UniqueConstraintViolation';
        }

        // HttpException (manually thrown)
        else if (exception instanceof HttpException) {
            const res = exception.getResponse();
            status = exception.getStatus();
            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object') {
                const r = res as any;
                message = r.message || message;
                error = r.error || error;
            }
        }

        response.status(status).json({
            statusCode: status,
            message,
            error,
        });
    }
}
