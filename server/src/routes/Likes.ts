import { Request, Response, Router } from 'express';
const {Likes,Comments}= require('../../models')
const router = Router();
const {validateToken}=require("../../middlewares/AuthMiddleware")



  router.post('/',validateToken,async (req, res) => {
    const {PostId}=req.body
    const userId=req.data.id
    const found=await Likes.findOne({where:{PostId:PostId,UserId:userId}})
      if(!found){
        await Likes.create({PostId:PostId,UserId:userId})
        res.send({liked:true})      
      }else{
        await Likes.destroy({where:{PostId:PostId,UserId:userId}})
        res.send({liked:false})
      }
  });




export default router 