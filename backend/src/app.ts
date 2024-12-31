import express,{Application,Request,Response} from "express"
import authRouter from "./routes/authRoutes";
import courseRouter from "./routes/courseRoutes";
import cookieParser from "cookie-parser"
import lessonRouter from "./routes/lessonRoutes";
import quizRoutes from "./routes/quizRoutes";
import progressRouter from "./routes/progressRoutes";
import userRouter from "./routes/userRoutes";
import discussionRoutes from "./routes/discussionRoutes";
import commentRoutes from "./routes/commentRoutes";


const app:Application=express();

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/courses',courseRouter)
app.use('/api/lessons',lessonRouter)
app.use('/api/quiz',quizRoutes)
app.use('/api/progress',progressRouter)
app.use('/api/user',userRouter)
app.use('/api/discussion',discussionRoutes)
app.use('/api/comments',commentRoutes)
export default app;