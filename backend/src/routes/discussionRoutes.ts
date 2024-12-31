import express from "express"
import { protectedRoute } from "../middleware/authMiddleware";
import { createDiscussion, deleteDiscussion, getDiscussions } from "../controllers/discussionControllers";
const discussionRoutes=express.Router();

discussionRoutes.get('/:courseId',protectedRoute,getDiscussions)
discussionRoutes.post('/:courseId',protectedRoute,createDiscussion)
discussionRoutes.delete('/:discussionId',protectedRoute,deleteDiscussion)

export default discussionRoutes