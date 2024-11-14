import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app.module'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './filters/http-exception'
import { ResponseInterceptor } from './interceptors/response.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )

    app.useGlobalInterceptors(new ResponseInterceptor())

    app.useGlobalFilters(new HttpExceptionFilter())

    await app.listen(3005)
}
bootstrap()
