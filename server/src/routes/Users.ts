import { Request, Response, Router } from 'express';
const {Users}= require('../../models')
const router = Router();
import bcrypt, { compare } from "bcrypt";
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
      res.json({token:accessToken,username:username,id:user.id})
    }
  });


router.get('/auth',validateToken, async (req, res) => {
    
    res.json(req.data.username)
  });

router.get('/basicInfo/:id', async (req, res) => {
    
  const id=req.params.id
  const basicInfo=await Users.findByPk(id,{attributes:{exclude:['password']}})

  res.json(basicInfo)
  });

  
router.put('/changepassword',validateToken, async (req, res) => {
    const {oldPassword,newPassword}=req.body
    const user=await Users.findOne({where:{username:req.data.username}})
  
    if(!user) res.json({error:"User does not exists"})
  
    const comparePassword=await bcrypt.compare(oldPassword,user.password)
    if(!comparePassword){
      res.json({error:"Wrong password"})
    }

    await Users.update({password:await bcrypt.hash(newPassword,10)},{where:{username:req.data.username}})

  res.json("Success")
});

export default router 