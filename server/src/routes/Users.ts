import { Request, Response, Router } from 'express';
const {Users}= require('../../models')
const router = Router();
import bcrypt from "bcrypt";

router.post('/',async (req, res) => {
    const {username,password}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
    const users=await Users.create({username:username,password:hashedPassword})
    res.json(users)
  });
router.post('/login',async (req, res) => {
    const {username,password}=req.body
    const user=await Users.findOne({where:{username:username}})
    if(!user) res.json({error:"User does not exists"})
    const comparePassword=await bcrypt.compare(password,user.password)
    if(comparePassword){
      res.json("Success")
    }
  });


export default router 