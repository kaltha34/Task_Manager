import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task manager API')
    .setDescription('API documnetation for Task manager')
    .setVersion('1.0')
    .addBearerAuth() // 👈 adds JWT auth option in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
