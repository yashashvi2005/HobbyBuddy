import express from 'express';
import {addPost,deletePost,getAllPosts,getAllPostsNames,getAllPostsOfUser } from "../controllers/post.controller.js";
import auth from "../middleware/auth.js"
import { uploadSingleMedia } from "../middleware/multer.js"; 

const router = express.Router();


router.post("/add-post",auth,uploadSingleMedia,addPost);
router.delete("/delete-Post/:mediaId",auth ,deletePost);
router.get("/fetch-all-post",getAllPosts);
router.get("/fetch-all-posts-names",getAllPostsNames);
router.get("/fetch-user-posts", auth, getAllPostsOfUser);


export default router;
