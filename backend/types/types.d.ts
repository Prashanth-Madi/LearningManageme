import "express-session"
import express from 'express';
import Request from 'express';

declare module "express-session"{
    interface SessionData{
        userId?:string,
        email?:string
    }
}

declare namespace Express{
    interface Request{
        user?:
        {
            id:String,
            role:String
        }
    }
}