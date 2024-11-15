import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        // Ensure status code fallback for unexpected errors
        const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR

        // Handle various formats of exception.getResponse()
        const exceptionResponse = exception.getResponse()
        let errorMessage: string | string[] | undefined

        if (typeof exceptionResponse === 'string') {
            errorMessage = exceptionResponse
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            errorMessage = (exceptionResponse as any).message
        }

        // Format the error message
        const formattedMessage = Array.isArray(errorMessage)
            ? errorMessage.join('. ')
            : errorMessage || 'An error occurred'

        // Send the response
        response.status(status).json({
            success: false,
            result: {
                error: formattedMessage,
            },
        })
    }
}
