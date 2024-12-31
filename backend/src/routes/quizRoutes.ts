import express from "express"
import { protectedRoute } from "../middleware/authMiddleware"
import { createQuiz, deleteQuiz, getQuizzes, getSpecificQuizz, putQuiz } from "../controllers/quizController"

const quizRoutes=express.Router()

quizRoutes.get('/getQuizzes/:courseId',protectedRoute,getQuizzes)
quizRoutes.get('/getQuizzes/:courseId/:quizId',protectedRoute,getSpecificQuizz)
quizRoutes.post('/createQuiz/:courseId',protectedRoute,createQuiz)
quizRoutes.put('/getQuizzes/:courseId/:quizId',protectedRoute,putQuiz)
quizRoutes.delete('/getQuizzes/:courseId/:quizId',protectedRoute,deleteQuiz)
export default quizRoutes