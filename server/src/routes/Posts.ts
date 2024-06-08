import { Request, Response, Router } from 'express';
import { validateToken } from '../../middlewares/AuthMiddleware';
const {Posts,Likes}= require('../../models')
const router = Router();

router.get('/',(req, res) => {
    res.send('Hello World!');
  });
  
  router.post('/',validateToken,async (req, res) => {
    const posts=req.body
    posts.username=req.data.username
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
    res.json(post)
  });

router.delete('/:postId',async (req, res) => {
    const postId=req.params.postId
    await Posts.destroy( {where:{id:postId}})
    res.json("Deleted")
  });



export default router 