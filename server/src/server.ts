// src/index.ts
import express, { Router } from 'express';
import PostRouter from './routes/Posts'
import CommentsRouter from './routes/Comments'
import UserRouter from './routes/Users'
import LikesRouter from './routes/Likes'
const db = require("../models");
import cors from "cors";
import { JwtPayload } from 'jsonwebtoken';
const app = express();
const port = 3001;
declare global {
  namespace Express {
      interface Request {
          data: JwtPayload
      }
  }
}
const router = Router()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/posts',PostRouter)
app.use('/comments',CommentsRouter)
app.use('/users',UserRouter)
app.use('/likes',LikesRouter)

db.sequelize.sync().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})

