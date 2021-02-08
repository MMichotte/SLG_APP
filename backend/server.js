import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import helmet from 'helmet'
import routes from './routes'
import ExpressServer from './app'

const addRequestId = require('express-request-id')()

const server = new ExpressServer(express)

server
    .initDatabase()
    .addMiddleware(cors())
    .addMiddleware(bodyParser.json())
    .addMiddleware(addRequestId)
    .passportConfig(passport)
    .helmetSecurity(helmet)
    .serveStaticFiles()
    .addRouting(routes)
    .errorHandler()
    .listenOn(process.env.PORT || 8000)

export default server.run()
