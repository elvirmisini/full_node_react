import { Request, Response, Router } from 'express';
const {Comments}= require('../../models')
const router = Router();

router.get('/:postId',async (req, res) => {
    const postId=req.params.postId
    const comments=await Comments.findAll({where:{postId:postId}})
    res.json(comments)
  });

router.post('/',async (req, res) => {
    const comment=req.body
    const comments=await Comments.create(comment)
    res.json(comments)
  });


export default router 