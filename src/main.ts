import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exceiption.filter';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { CommonInterceptor } from './common/common.interceptor';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useWebSocketAdapter(new IoAdapter(app));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new CommonInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('CloneBeam API')
        .setDescription('New CloneBeam API Document By rhm.')
        .setVersion("0.1")
        .addApiKey({
            type: 'apiKey',
            name: 'x-jwt',
            description: 'Enter x-jwt token for auth user.',
            in: 'header'
        }, 'x-jwt')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
