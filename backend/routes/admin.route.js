import express from "express";
import { adminSignin } from "../controllers/admin.controller.js";
import {createCategory , getAllCategories,deleteCategory} from "../controllers/category.controller.js";
import {getAllUsers} from "../controllers/admin.controller.js";
import {addPost,deletePost,getAllPosts,getAllPostsNames} from "../controllers/post.controller.js";
import {createChallenge , getAllChallenges , deleteChallenge,updateChallenge} from "../controllers/challenge.controller.js";
import {getLeaderboard } from "../controllers/leaderboard.controller.js";
import auth from "../middleware/auth.js";
import {uploadSingleMedia} from "../middleware/multer.js";
import {upload} from "../middleware/multer.js"
import adminAuth from "../middleware/adminauth.js";



const router = express.Router();

router.post("/sign-in",adminSignin);
router.get("/check-auth", adminAuth, (req, res) => 
  res.json({ role: req.user.role })
);


router.post("/add-category",adminAuth,createCategory);
router.get("/fetch-category",adminAuth,getAllCategories);
router.delete("/delete-category/:categoryId",adminAuth,deleteCategory);

router.get("/fetch-users",adminAuth,getAllUsers);

router.post("/add-post",adminAuth,uploadSingleMedia,addPost);
router.delete("/delete-Post/:mediaId",adminAuth, deletePost);
router.get("/fetch-all-post",adminAuth,getAllPosts);
router.get("/fetch-all-posts-names",adminAuth,getAllPostsNames);


router.post("/add-challenge",adminAuth,upload.array("videos"),createChallenge);
router.get("/fetch-all-challenges",adminAuth,getAllChallenges);
router.delete("/delete-challenge/:challengeId",adminAuth, deleteChallenge);
router.put("/update-challenge/:challengeId",adminAuth,upload.array("videos"), updateChallenge);

router.get("/fetch-leaderboard",adminAuth, getLeaderboard);

export default router ;  