import { Request,Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma=new PrismaClient();
export const getProgress=async (req:Request,res:Response)=>{
    const userId=req.params.userId
    try{
        const progressData=await prisma.progress.findMany({where:{user_id:userId}})
        res.status(200).json({progressData})


    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }

}

export const getCourseProgress=async (req:Request,res:Response)=>{
    const {userId,courseId}=req.params
    try{
        const courseProgressData=await prisma.progress.findMany({where:{user_id:userId,course_id:courseId}})
        res.status(200).json({courseProgressData})


    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }

}

export const postProgress=async (req:Request,res:Response)=>{
    const {userId,courseId,lessonId}=req.params
    try{
        const progressId=await prisma.progress.findFirst({where:{user_id:userId,course_id:courseId,lesson_id:lessonId}})
        const updateProgress=await prisma.progress.update({
            where:{
                progress_id:progressId?.progress_id
            },
            data:{
                is_complete:true
            }
        })
        res.status(200).json({message:`Congratulations ${lessonId} is succesfully completed` })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }
}