import { registerUser } from '../controllers/authController.js'
import express from 'express'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)