import { Request, Response, Router } from 'express';
const {Posts}= require('../../models')
const router = Router();

router.get('/',(req, res) => {
    res.send('Hello World!');
  });
  
  router.post('/',async (req, res) => {
    const posts=req.body
    await Posts.create(posts)
    res.send(posts)
  });

  router.get('/all-posts',async (req, res) => {
    const posts=await Posts.findAll()
    res.send(posts)
  });



export default router 