import {Router} from "express";
import postRoutes from "./Posts";
import commentsRoutes from "./Comments";
import UsersRoutes from "./Users";
const router = Router()
router.use(postRoutes)
router.use(commentsRoutes)
router.use(UsersRoutes)
export default router