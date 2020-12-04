import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'
import express_server from "./app"

const addRequestId = require('express-request-id')();

const server = new express_server(express);

server
    .initDatabase()    
    .addMiddleware(cors())
    .addMiddleware(bodyParser.json())
    .addMiddleware(addRequestId)
    .helmetSecurity(helmet)
    .serveStaticFiles()
    .addRouting(routes)
    .errorHandler()
    .listenOn(process.env.PORT || 8000);

export default server.run();