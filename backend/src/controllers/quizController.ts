import express,{Request,Response} from "express"
import { PrismaClient } from '@prisma/client';

const prisma =new PrismaClient();

export const createQuiz=async(req:Request,res:Response)=>{
    const courseId=req.params.courseId
    const {role,id,title}=req.body
    if(role!="TEACHER"){
        res.status(400).json({message:"You are unauthorized to create a Quiz"})
        return
    }
    const quizExists=await prisma.quizzes.findFirst({where:{title}})
    if (quizExists!=null){
        res.status(409).json({message:"The Quiz you are trying to create already exists"})
        return
    }
    try{
        const createQuiz=await prisma.quizzes.create({data:{
            course_id:courseId,
            title,
            total_questions:0
        }})

    res.status(200).json({message:"Succesfully created a Quiz"})
    }
    catch(error){
        res.status(500).json({message:"Unknown Error occurred"})
    }

}

export const getQuizzes=async(req:Request,res:Response)=>{
    const courseId=req.params.courseId
    try{
        const getQuizzes=await prisma.quizzes.findMany({where:{course_id:courseId}})
        res.status(200).json({getQuizzes})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server error"})
    }
    

}
export const getSpecificQuizz=async(req:Request,res:Response)=>{
    const {courseId,quizId}=req.params

    try{
        const getQuizz=await prisma.quizzes.findMany({where:{course_id:courseId,quiz_id:quizId}})
        res.status(200).json({getQuizz})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server error"})
    }
    
}
export const putQuiz=async(req:Request,res:Response)=>{
    const {courseId,quizId}=req.params
    const {role,id,title}=req.body
    if(role!="TEACHER"){
        res.status(400).json({message:"You are unauthorized to edit a Quiz"})
        return
    }
    const quizExists=await prisma.quizzes.findFirst({where:{quiz_id:quizId}})
    if (quizExists==null){
        res.status(409).json({message:"The Quiz you are trying to edit does not exist"})
        return
    }
    try{
        const putQuiz=await prisma.quizzes.update(
            {where:{
                course_id:courseId,quiz_id:quizId
            },
            data:{
                title:title
            }},
        )
        res.status(200).json({message:`${quizId } is succesfully updated`})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown Error occurred"})

    }

}
export const deleteQuiz=async(req:Request,res:Response)=>{
    const {courseId,quizId}=req.params
    const {role,id,title}=req.body
    if(role!="TEACHER"){
        res.status(400).json({message:"You are unauthorized to delete a Quiz"})
        return
    }
    const quizExists=await prisma.quizzes.findFirst({where:{quiz_id:quizId}})
    if (quizExists==null){
        res.status(409).json({message:"The Quiz you are trying to delete does not exist"})
        return
    }
    try{
        const deleteQuiz=await prisma.quizzes.delete({where:{quiz_id:quizId}})
        res.status(200).json({message:`${quizId } is succesfully deleted`})
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown Error occurred"})

    }
    
    
}