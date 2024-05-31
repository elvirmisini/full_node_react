import {Router} from "express";
import postRoutes from "./Posts";
import commentsRoutes from "./Comments";
const router = Router()
router.use(postRoutes)
router.use(commentsRoutes)
export default router