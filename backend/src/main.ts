import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import env from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  SwaggerModule.setup('api-docs',app, document);
    
  await app.listen(env.PORT);
  
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
