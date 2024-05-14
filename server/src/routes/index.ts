import {Router} from "express";
import postRoutes from "./Posts";
const router = Router()
router.use(postRoutes)
export default router