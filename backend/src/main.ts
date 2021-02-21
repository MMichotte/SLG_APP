import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import env from './config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  /**
   * Serve static files from the ../public/dist directory
   * (angular app will reside in there)
   */
  app.useStaticAssets(join(__dirname, '../public/dist'));

  /**
   * Set base URL to be url/api 
   */
  app.setGlobalPrefix('api');

  /**
   * Swagger auto-generated documentation setup.
   */
  const swaggerOptions = new DocumentBuilder()
    .setTitle('SLG-app API')
    .setDescription('This description needs to be updated!')
    .setVersion('1.0')
    .addTag('authenticate')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, document);

  /**
   * Serve application
   */
  await app.listen(env.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
