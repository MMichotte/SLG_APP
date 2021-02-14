import express from 'express';
import * as userController from '../controllers/userController';
import makeCallback from '../helpers/express-callback';
import passport from 'passport';

const router = express.Router();

/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [Authentification]
 *      summary: Login a user.
 *      description: Login a user by its username and password and retrieve a JWT-token.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  required: true
 *                password:
 *                  type: string
 *                  required: true
 *      responses:
 *        200:
 *          description: ''
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                description: ''
 *                type: boolean
 *                example: true
 *        400:
 *          description: ''
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                description: ''
 *                type: boolean
 *                example: false
 *        500:
 *          description: ''
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                description: ''
 *                type: boolean
 *                example: false
 */ 
router.post('/login', makeCallback(userController.login));

router.get('/login', passport.authenticate('jwt', { session: false }), makeCallback(userController.validateAuth));

export { router as userRoutes };
