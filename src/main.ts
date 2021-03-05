import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Containers API')
    .setDescription('Application for containers')
    .setVersion('1.0')
    .addTag('Containers', 'Endpoint related to containers information.')
    .addTag('Country', 'Endpoint related to country information.')
    .addTag('UserProfile', 'Endpoint related to users.')
    .addTag('Upload - File', 'Endpoint related to file upload.')
    .addTag('UsersPermissions - Role', 'Endpoint related to user roles.')
    .addTag(
      'UsersPermissions - User',
      'Endpoint related to authentication users.',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
