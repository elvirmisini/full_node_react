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
    posts.UserId=req.data.id
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

router.get('/byuserId/:id',async (req, res) => {
    const userId=req.params.id
    const listOfPosts = await Posts.findAll({where:{UserId:userId},include:[Likes]})
    res.json(listOfPosts)
  });

  router.put("/title", validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id: id } });
    res.json(newTitle);
  });
  
  router.put("/postText", validateToken, async (req, res) => {
    const { newText, id } = req.body;
    await Posts.update({ postText: newText }, { where: { id: id } });
    res.json(newText);
  });


export default router 