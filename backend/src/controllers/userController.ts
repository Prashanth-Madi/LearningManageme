import { Request,Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma=new PrismaClient();
export const enroll=async(req:Request,res:Response)=>{
    const {userId,courseId}=req.params
    try{
        const userExists=await prisma.user.findFirst({where:{user_id:userId}})
        if(!userExists){
            res.status(404).json({message:`${userId} does not exist`})
            return
        }
        const courseExists=await prisma.courses.findFirst({where:{course_id:courseId}})
        if(!courseExists){
            res.status(404).json({message:`${courseId} does not exist`})
            return
        }
        const isUserEnrolled=await prisma.enrollments.findFirst({where:{
            user_id:userId,
            course_id:courseId
        }})
        if(isUserEnrolled){
            res.status(409).json({message:`${userId} has already enrolled in the course ${courseId}`})
            return

        }
        
        const enrolled=await prisma.enrollments.create({
            data:{
                user_id:userId,
                course_id:courseId
            }
        })
        const lessons=await prisma.lessons.findMany({
            where:{course_id:courseId}
        })
        const progressData=lessons.map((lesson)=>({
            user_id:userId,
            course_id:courseId,
            lesson_id:lesson.lesson_id,
            is_complete:false
        }))
        const insertProgress= await prisma.progress.createMany({data:progressData})
        res.status(200).json({message:"Enrolled and Progress records added"})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }

}