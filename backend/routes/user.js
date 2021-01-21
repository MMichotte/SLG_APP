import express from 'express'
import * as userController from '../controllers/userController'
import makeCallback from '../helpers/express-callback'

const router = express.Router()

router.post('/login', makeCallback(userController.login))

export { router as userRoutes }
