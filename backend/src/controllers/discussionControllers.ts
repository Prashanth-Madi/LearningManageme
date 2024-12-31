import { Request,Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient();

export const createDiscussion=async(req:Request,res:Response)=>{
        const {id,title,content}=req.body
        const courseId=req.params.courseId
        try{
            
            const createDiscussion= await prisma.discussions.create({
                data:{
                    course_id:courseId,
                    user_id:id,
                    title:title,
                    content:content

            }})
            res.status(200).json({message:`Discussion is sucessfully created for the course ${courseId}`})

        }
        catch(error){
            console.log(error)
            res.status(500).json({message:"Unknown error occurred"})
        }
    
}

export const deleteDiscussion=async(req:Request,res:Response)=>{
    const {role,id}=req.body
    const discussionId=req.params.discussionId
    const isDiscussionowned=(await prisma.discussions.findFirst({where:{discussion_id:discussionId,user_id:id}}))?true:false
    try{
        const isDiscussionExists=await prisma.discussions.findFirst({where:{discussion_id:discussionId}})
        if (!isDiscussionExists){
            res.status(404).json({message:"Discussion does not exist"})
            return
        }
        if(role=="ADMIN"||isDiscussionowned){
            const deleteDiscussion=await prisma.discussions.delete({
                where:{discussion_id:discussionId}
            })
            res.status(200).json({message:`${discussionId} is successfully deleted`})
            return

        }
        else{
            res.status(401).json({message:"You are unauthorized to delete the discussion"})
            return

        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }
}

export const getDiscussions=async(req:Request,res:Response)=>{
    const courseId=req.params.courseId
    // const {id,role}=req.body
    // console.log(id,role)
    
    try{
        const discussion=await prisma.discussions.findMany({
            where:{
                course_id:courseId
            }
        })
        res.status(200).json({discussion})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }

}