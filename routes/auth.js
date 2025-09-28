import { registerUser } from '../controllers/authController.js'
import express from 'express'
import { meRouter } from './me.js'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)

authRouter.use('/me', meRouter)