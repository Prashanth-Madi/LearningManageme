import {Request,Response} from "express"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import app from '../app';
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
// import { ValidateRequest } from "../middleware/authMiddleware";


dotenv.config();
const prisma =new PrismaClient();
const salting_rounds=parseInt(process.env.BCRYPT_SALT ||"10",10)
const secret_key=process.env.TOKEN_SECRET_KEY||""

export const signupController=async (req:Request,res:Response)=>{
    
    try{
        const {name,email,password,role}=req.body
        const hashedPassword=await bcrypt.hash(password,salting_rounds)
        const user=await prisma.user.create({
            data:{
                username:name,
                email,
                password:hashedPassword,
                role
            }
        });
         res.status(200).json({
            message:"User created Succesfully",
            user:{
                id:user.user_id,
                email:user.email,
                name:user.username,
                role:user.role
            }
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong, Please try again"})
    }


    // res.status(201).json({message:"User created succesfully"});

}

export const loginController=async(req:Request,res:Response)=>{
    const {email,password}=req.body
    if (!email){
        res.status(401).json({message:"Email is required"})
        return;
    }
    else if(!password){
        res.status(401).json({message:"Password is required"})
        return;
    }
    try{
    const existingUser=await prisma.user.findUnique({where:{email}})
    if (!existingUser){
        res.status(404).json({message:"User Not Found, Please Login with a different email or Signup"})
        return
    }
    if (existingUser){
        const match=await bcrypt.compare(password,existingUser.password)
        if (match){
            // req.isValidated=match
            //Generate a jwt token instead of adding isValidated to the request object
            const token=jwt.sign({id:existingUser.user_id,role:existingUser.role},secret_key,{expiresIn:'10m'});
            res.cookie("token",token,{
                httpOnly:true, //prevent javascript access to the cookie
                secure:true, // ensure cookies are sent over HTTPS
                sameSite:"strict", //prevent CSRF
                maxAge:600*1000 //expiration in ms
            })
            
            res.status(200).json({
                message:"User logged in succesfully",
                id:existingUser.user_id,
                email:existingUser.email,
                name:existingUser.username
            })
            
        }
        else{
            res.status(401).json({message:"Wrong Password"})
        }
        
    }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }

  
    
   
}

export const logOutController=async(req:Request,res:Response)=>{
    try{
    res.cookie("token","",{maxAge:0})
    res.status(200).json({message:"User logged out succesfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server error"})
    }
}