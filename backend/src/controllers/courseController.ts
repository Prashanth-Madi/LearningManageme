import express,{Request,Response} from "express"
import { PrismaClient, Role } from '@prisma/client';

const prisma=new PrismaClient();
export const getCourses=async (req:Request,res:Response)=>{
    const course_id=req.params.course_id;
    if (course_id){
        try{
            const courses=await prisma.courses.findMany({
                where:{course_id},
                select:{
                    title:true,
                    description:true,
                    category:true,
                    createdAt:true
                }
            })
            res.status(200).json({courses}) 
        }
        catch(error){
            console.log(error)
            res.status (500).json({message:"Unknown error occurred"})
        }
    }
    else{
    try{
        const courses=await prisma.courses.findMany({
            select:{
                title:true,
                description:true,
                category:true,
                createdAt:true
            }
        })
        res.status(200).json({courses}) 

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }

    // console.log(courses)
    // console.log(req.body)
}
    
}

export const postCourse=async (req:Request,res:Response)=>{
    const {role,title,description,category,id}=req.body
    console.log(req.body)
    if (role!="TEACHER" && role!="ADMIN"){
        res.status(400).json({message:"You are unauthorized to add a course"})
        return
    }
    const isTitleTaken=await prisma.courses.findFirst({where:{
        title:title
    }})
    // console.log(isTitleTaken)
    if (isTitleTaken!=null){
        res.status(409).json({message:"The title is already taken, Please use a different one"})
    }
    else{
        
        const course=await prisma.courses.create({
            data:{
                title,
                description,
                category
            }
        })
        const courseTeacher=await prisma.courseTeachers.create({
            data:{
                user_id:id,
                course_id:course.course_id,
            }
        })

        
        
        res.status(200).json({message:"New Course added succesfully"})
    }
    
}

export const putCourses=async(req:Request,res:Response)=>{
    const {role,id,title,description,category}=req.body
    if (role!="TEACHER"&&role!="ADMIN"){
        res.status(400).json({message:"You are unauthorized to edit the courses"})
    }
    
    const course_id=req.params.course_id
    
    const update=await prisma.courses.update({
        where:{
            course_id:course_id
        },
        data:{
            title,
            description,
            category

        }
    })
    res.status(200).json({message:`${course_id} is edited`})

}

//incomplete
export const deleteCourse=async(req:Request,res:Response)=>{
    const {role,id}=req.body
    if (role!="TEACHER"&&role!="ADMIN"){
        res.status(400).json({message:"You have to be a teacher or admin to delete a course"})
    }
    const teacher_role=await prisma.courseTeachers.findFirst({where:{user_id:id}})
    if (teacher_role?.teacher_role!="PRIMARY"){
        res.status(400).json({messge:"Only a primary Teacher can delete a course"})
        return
    }
    try{
        const course_id=req.params.course_id
        const deleteCourseTeacher=await prisma.courseTeachers.deleteMany({where:{course_id}})
        console.log(deleteCourseTeacher)
        const deleteCourse=await prisma.courses.delete({
            where:{
                course_id
                    }
        
        })
    res.status(200).json({message:`${course_id} is succesfully deleted`})
    }
    catch(error){
        console.log(error)
        res.status (500).json({message:"Unknown error occurred"})
    }
}

export const addTeacher=async(req:Request,res:Response)=>{
    const {user_id,role,id,teacher_role}=req.body
    const course_id=req.params.course_id
    // console.log(req.body)
    if(user_id==id){
        res.status(409).json({message:"You cannot add yourself as a secondary teacher or as an assistant"})
        return
    }
    const checkTeacher=await prisma.courseTeachers.findFirst({where:{user_id}})
    if(checkTeacher?.user_id==user_id){
        res.status(409).json({message:`${checkTeacher?.user_id} already exists as ${checkTeacher?.teacher_role}`})
        return
    }
    if (checkTeacher!=null && checkTeacher.teacher_role==teacher_role){
        res.status(409).json({message:"The Teacher you are trying to add already exists"})
        return
    }
    try{
       
        const addCourseTeacher= await prisma.courseTeachers.create({
            data:{
                user_id,
                course_id,
                teacher_role
            }
        })
        res.status(200).json({message:`${teacher_role} teacher has been added successfully`})

    }
    catch(error){
        res.status(500).json({message:"Unknown error occurred"})
    }
    

}