import express from "express"
import { getCourseProgress, getProgress, postProgress } from "../controllers/progressControllers";
import { protectedRoute } from "../middleware/authMiddleware";

const progressRouter=express.Router();
progressRouter.get('/:userId',protectedRoute,getProgress)
progressRouter.get('/:userId/:courseId',protectedRoute,getCourseProgress)
progressRouter.post('/:userId/:courseId/:lessonId',protectedRoute,postProgress)
export default progressRouter