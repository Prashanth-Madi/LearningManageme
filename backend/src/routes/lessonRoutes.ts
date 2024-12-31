import express from "express"
import { addLesson, deleteLesson, editLesson, getLessons } from "../controllers/lessonController"
import { protectedRoute } from "../middleware/authMiddleware"

const lessonRouter=express.Router()

lessonRouter.get('/:courseId',getLessons)
lessonRouter.post('/:courseId',protectedRoute,addLesson)
lessonRouter.put('/:courseId/:lessonId',protectedRoute,editLesson)
lessonRouter.delete('/:courseId/:lessonId',protectedRoute,deleteLesson)

export default lessonRouter