import express,{Request,Response,NextFunction} from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { strict } from "assert";
import dotenv from "dotenv"

// export interface ValidateRequest extends Request{
//     isValidated?:boolean
// }

const prisma=new PrismaClient();
dotenv.config()
const secret_key=process.env.TOKEN_SECRET_KEY||""

interface DecodedToken{
    role:String,
    id:String
}

export const authSignup=async(req:Request,res:Response,next:NextFunction)=>{
    // console.log("middleware called")
    const {name,email,password,confirmPassword}=req.body
    // console.log(email,password)
    if(!name){
        res.status(401).json({message:"Name is required"})
        return;
    }
    else if(!email){
         res.status(401).json({message:"Email is required"})
         return;
    }
    else if (!password || !confirmPassword){
         res.status(401).json({message:"Password is required"})
         return;
    } 
    if (password!==confirmPassword){
         res.status(401).json({message:"Passwords do not match"})
         return;
    }
    try{
        const existingUser=await prisma.user.findUnique({where:{email}})
        if (existingUser){
            res.status(409).json({message:"The email already exists, Please use a different one"})
            return;
        }}
    catch(error){
        console.log(error)
        res.status(400).json({message:"An error occurred, please try again"})
    }
    next();


}


export const protectedRoute=async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.token;
    if(token){
        const decoded=await jwt.verify(token,secret_key) as DecodedToken
        req.body.role=decoded.role
        req.body.id=decoded.id
        next();
    }
    else{
        console.log("token not found")
        res.status(400).json({message:"Unauthorised User, Please log in and try again"})
    }

    
    
}