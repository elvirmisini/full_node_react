import {Router} from "express";
import postRoutes from "./Posts";
import commentsRoutes from "./Comments";
import UsersRoutes from "./Users";
import LikesRoutes from "./Likes";
const router = Router()
router.use(postRoutes)
router.use(commentsRoutes)
router.use(UsersRoutes)
router.use(LikesRoutes)
export default router