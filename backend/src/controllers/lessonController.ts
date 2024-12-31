import express,{Request,Response} from "express"
import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient();
export const getLessons=async(req:Request,res:Response)=>{
    const courseId=req.params.courseId

}

export const addLesson=async(req:Request,res:Response)=>{
    const courseId=req.params.courseId
    const {role,id,title,content}=req.body
    if(role!="TEACHER"){
        res.status(400).json({message:"You are unauthorized to add a Lesson"})
        return
    }
    const isTitleTaken=await prisma.lessons.findFirst({where:{title}})
    if (isTitleTaken!=null){
        res.status(400).json({message:"Title is already taken, try a different one"})
        return
    }
    try{
        const maxPositionLesson = await prisma.lessons.findFirst({
            where: {course_id: courseId },
            orderBy: { position: 'desc' },
          });
      
          // Step 2: Determine the next position
          const nextPosition = maxPositionLesson ? maxPositionLesson.position + 1 : 1;
        const lesson= await prisma.lessons.create({
            data:{
                course_id:courseId,
                title,
                content,
                position:nextPosition

            }
        })
        res.status(200).json({message:"Lesson succesfully added"})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }


}
export const editLesson=async(req:Request,res:Response)=>{
    const {role,id,title,content}=req.body
    const {courseId,lessonId}=req.params;
    
    if(role!="TEACHER"){
        res.status(400).json({message:"You are unauthorized to edit a Lesson"})
    }
    try{
        const ifLessonExists=await prisma.lessons.findFirst({where:{lesson_id:lessonId}})
    if (ifLessonExists==null){
        res.status(404).json({message:"The lesson you want to edit does not exist"})
        return
    }
    const editLesson=await prisma.lessons.update({
        where:{
            lesson_id:lessonId
        },
        data:{
            title,
            content
        }
        
    })
    res.status(200).json({message:`${lessonId} is succesfully edited`})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})

    }


}

export const deleteLesson=async(req:Request,res:Response)=>{
    const {role,id}=req.body
    const {courseId,lessonId}=req.params;
    
    if(role!="TEACHER"){
        res.status(400).json({message:"You are unauthorized to edit a Lesson"})
    }
    try{
        const ifLessonExists=await prisma.lessons.findFirst({where:{lesson_id:lessonId}})
    if (ifLessonExists==null){
        res.status(404).json({message:"The lesson you want to delete does not exist"})
        return
    }
    const deleteLesson= await prisma.lessons.delete({where:{course_id:courseId,lesson_id:lessonId}}) 
    res.status(200).json({message:`${lessonId} is succesfully deleted`})
}
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})

    }

}