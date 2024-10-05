import express from "express"
import { getAllBlogs, createBlogController, updateBlogController, deleteBlogController, singleBlogController, userBlogController } from "../controllers/blogController.js"


const router = express.Router()

router.get("/all-blogs", getAllBlogs)
router.post("/create-blog", createBlogController)
router.put("/update-blog/:id", updateBlogController)
router.delete("/delete-blog/:id", deleteBlogController)
router.get("/single-blog/:id", singleBlogController)
router.get("/user-blog/:id", userBlogController)


export default router