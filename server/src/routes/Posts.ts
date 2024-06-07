import { Request, Response, Router } from 'express';
import { validateToken } from '../../middlewares/AuthMiddleware';
const {Posts,Likes}= require('../../models')
const router = Router();

router.get('/',(req, res) => {
    res.send('Hello World!');
  });
  
  router.post('/',async (req, res) => {
    const posts=req.body
    await Posts.create(posts)
    res.send(posts)
  });

  router.get('/all-posts',validateToken,async (req, res) => {
    const posts=await Posts.findAll({include:[Likes]})
    const likedPosts=await Likes.findAll({where:{UserId:req.data.id}})
    res.send({listOfPosts:posts,likedPosts:likedPosts})
  });

  router.get('/byId/:id',async (req, res) => {
    const id=req.params.id
    const post=await Posts.findByPk(id)
    console.log(post)
    res.json(post)
  });



export default router 