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


const router = express.Router();

router.post("/sign-in",adminSignin);

router.post("/add-category",createCategory);
router.get("/fetch-category",getAllCategories);
router.delete("/delete-category/:categoryId",deleteCategory);

router.get("/fetch-users",getAllUsers);

router.post("/add-post",auth,uploadSingleMedia,addPost);
router.delete("/delete-Post/:mediaId", deletePost);
router.get("/fetch-all-post",getAllPosts);
router.get("/fetch-all-posts-names",getAllPostsNames);


router.post("/add-challenge",auth,upload.array("videos"),createChallenge);
router.get("/fetch-all-challenges",getAllChallenges);
router.delete("/delete-challenge/:challengeId",auth, deleteChallenge);
router.put("/update-challenge/:challengeId",auth,upload.array("videos"), updateChallenge);


router.get("/fetch-leaderboard", getLeaderboard);

export default router ;  