// src/index.ts
import express, { Router } from 'express';
import PostRouter from './routes/Posts'
const db = require("../models");
import cors from "cors";
const app = express();
const port = 3001;

const router = Router()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/posts',PostRouter)

db.sequelize.sync().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})

