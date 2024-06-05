import { Request, Response, Router } from 'express';
const {Users}= require('../../models')
const router = Router();
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken";
import { validateToken } from '../../middlewares/AuthMiddleware';

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
    const accessToken=sign({username:user.username,id:user.id},"importantsecret")

    if(comparePassword){
      res.json(accessToken)
    }
  });


router.get('/auth',validateToken, async (req, res) => {
    
    res.json(req.data.username)
  });

export default router 