"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('SLG-app API')
        .setDescription('This description needs to be updated!')
        .setVersion('1.0')
        .addTag('authenticate')
        .addTag('users')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(env_1.default.PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map