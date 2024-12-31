import express from "express"
import { addComment, deleteComment, editComment } from '../controllers/commentControllers';
import { protectedRoute } from "../middleware/authMiddleware";

const commentRoutes=express.Router();

commentRoutes.get('/',protectedRoute,addComment)
commentRoutes.delete('/delete',protectedRoute,deleteComment)
commentRoutes.patch('/edit',protectedRoute,editComment)

export default commentRoutes