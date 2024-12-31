
import express from "express"
import { addTeacher, deleteCourse, getCourses, postCourse, putCourses } from "../controllers/courseController";
import { protectedRoute } from "../middleware/authMiddleware";



const courseRouter=express.Router();

courseRouter.get('/',protectedRoute,getCourses)
courseRouter.get('/:course_id',protectedRoute,getCourses)
courseRouter.post('/',protectedRoute,postCourse)
courseRouter.put('/:course_id',protectedRoute,putCourses)
courseRouter.delete('/:course_id',protectedRoute,deleteCourse)
courseRouter.post('/addTeacher/:course_id',protectedRoute,addTeacher)

export default courseRouter