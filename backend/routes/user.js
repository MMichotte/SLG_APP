import express from 'express'
import * as userController from '../controllers/userController'
import makeCallback from '../helpers/express-callback'
import passport from 'passport'

const router = express.Router()

router.post('/login', makeCallback(userController.login))
router.get('/login', passport.authenticate('jwt', { session: false }), makeCallback(userController.validateAuth))

export { router as userRoutes }
