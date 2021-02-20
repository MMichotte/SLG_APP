import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import routes from './routes';
import ExpressServer from './app';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './.swagger.conf';
import swaggerUi from 'swagger-ui-express';

const addRequestId = require('express-request-id')();

const server = new ExpressServer(express);
const swaggerSpec = swaggerJSDoc(swaggerOptions);

server
  .initDatabase()
  .addMiddleware(cors())
  .addMiddleware(bodyParser.json())
  .addMiddleware(addRequestId)
  .passportConfig(passport)
  .helmetSecurity(helmet)
  .serveStaticFiles()
  .addSwaggerApiDoc(swaggerUi, swaggerSpec)
  .addRouting(routes)
  .errorHandler()
  .listenOn(process.env.PORT || 8000);

export default server.run();
