
import express from 'express';
import { loginController, logOutController, signupController } from '../controllers/authController';
import {  authSignup } from '../middleware/authMiddleware';
import dotenv from "dotenv"

dotenv.config()
const authRouter=express.Router()
const secret=process.env.SECRET||""

authRouter.post('/login',loginController)
authRouter.post('/signup',authSignup,signupController)
authRouter.post('/logout',logOutController)

export default authRouter