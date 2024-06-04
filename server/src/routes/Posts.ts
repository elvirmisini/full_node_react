import { Request, Response, Router } from 'express';

const router = Router();
const{Posts}=require('../../models')


router.get('/',(req, res) => {
    res.send('Hello World!');
  });


router.post('/',async (req, res) => {
    const post=req.body
    await Posts.create(post)

    res.json(post)
    
  });



export default router 