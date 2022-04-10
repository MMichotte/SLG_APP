import { redisClient } from './core/services/redis.service';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as permissionsPolicy from 'permissions-policy';
import env from '@config/env';
import { FrontendMiddleware } from '@core/middlewares/frontend.middleware';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  try {
    await redisClient.connect(); //TODO Try catch 
  }
  catch(e) {
    console.log('\nFailed to connec to redis database!\n');
    throw e;
  }
  
  /**
   * Adding security headers. 
   * doc: https://helmetjs.github.io
   */
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'default-src': ['\'self\'', 'https://restcountries.com', 'https://flagcdn.com', 'blob:'],
      'object-src' : ['\'self\'', 'https://restcountries.com', 'https://flagcdn.com', 'data:'],
      'img-src' : ['\'self\'', 'https://restcountries.com', 'https://flagcdn.com', 'data:'],
      'script-src' : ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
      'script-src-attr': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
    }
  }));
  app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
  app.use(permissionsPolicy({
    features: {
      fullscreen: ['self']
    }
  }));

  /**
   * Use a middleware to load angular app for unknown routes
   * (angular app will reside in there)
   */
  app.use(FrontendMiddleware);

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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api-docs', app, document);

  /**
   * Serve application
   */
  await app.listen(env.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
