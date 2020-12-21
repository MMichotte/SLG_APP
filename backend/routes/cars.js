import express from 'express'
import * as carsController from '../controllers/carsController'
import makeCallback from '../helpers/express-callback'

const router = express.Router()

router.get('/cars', makeCallback(carsController.getAllCars))

export { router as carsRoutes }
