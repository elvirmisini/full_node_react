import { NextFunction, Request, Response } from "express"
import {verify,JwtPayload} from "jsonwebtoken"

export const validateToken=(req:Request,res:Response,next:NextFunction)=>{
    const accessToken=req.header("accessToken")

    if(!accessToken) return res.json({error:"User not logged in"})

    try{
        const validToken:JwtPayload=verify(accessToken,"importantsecret") as JwtPayload
        req.data=validToken
        if(validToken){
            
            return next()
        }
    }catch(error)
    {
        return res.json({error:error})
    }
}

