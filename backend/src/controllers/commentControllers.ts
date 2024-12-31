import { Request,Response } from "express"
import { addLesson } from './lessonController';
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


/* addComment method takes in the id of the user logged in as id, his role, the discussion id and the content and creates
a record in the table comments */
export const addComment=async(req:Request,res:Response)=>{
    const {id,role,discussion_id,content}=req.body
    console.log(id,role,discussion_id,content)
    try{
        const comment=await prisma.comments.create({
            data:{
                discussion_id,
                content,
                user_id:id
            }
        })
        res.status(200).json({message:`${content} comment has been added`})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }

}

export const deleteComment=async(req:Request,res:Response)=>{
    const {role,id,discussion_id,comment_id}=req.body
    try{
        const fetchUser=await prisma.comments.findFirst({where:{discussion_id,comment_id}})
        if(!fetchUser){
            res.status(404).json({message:`comment with comment_id ${comment_id} not found`})
            return
        }
        if(role=="ADMIN"||fetchUser?.user_id==id){
            // console.log(`${role} or ${fetchUser?.user_id}==${id}`)
            const deleteComment=await prisma.comments.delete({
                where:{
                    discussion_id,
                    comment_id,
                    
                }})

            res.status(200).json({message:`Succesfully deleted the comment ${fetchUser?.content}`})

        }
        else{
            res.status(401).json({message:"You are unauthorized to delete the comment"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }

}

export const editComment=async(req:Request,res:Response)=>{
    const {role,id,discussion_id,comment_id,content}=req.body
    try{
        const fetchUser=await prisma.comments.findFirst({where:{discussion_id,comment_id}})
        if(!fetchUser){
            res.status(404).json({message:`comment with comment_id ${comment_id} not found`})
            return
        }
        if(role=="ADMIN"||fetchUser?.user_id==id){
            // console.log(`${role} or ${fetchUser?.user_id}==${id}`)
            const editComment=await prisma.comments.update({
                where:{
                    comment_id
                },
                data:{
                    content
                }
            })

            res.status(200).json({message:`Succesfully edited the comment ${fetchUser?.content} to ${content}`})

        }
        else{
            res.status(401).json({message:"You are unauthorized to edit the comment"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unknown error occurred"})
    }
}