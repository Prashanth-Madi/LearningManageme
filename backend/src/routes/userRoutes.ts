import express from "express"
import { enroll } from "../controllers/userController";
import { protectedRoute } from "../middleware/authMiddleware";

const userRouter=express.Router();
userRouter.get('/enroll/:userId/:courseId',protectedRoute,enroll)

export default userRouter