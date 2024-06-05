import { Request, Response, Router } from 'express';
const {Comments}= require('../../models')
const router = Router();
import {validateToken} from "../../middlewares/AuthMiddleware"

router.get('/:postId',async (req, res) => {
    const postId=req.params.postId
    const comments=await Comments.findAll({where:{postId:postId}})
    res.json(comments)
  });

router.post('/',validateToken, async (req, res) => {
    const comment=req.body
    const username=req.data
    comment.username=username
    const comments=await Comments.create(comment)
    res.json(comments)
  });


export default router 