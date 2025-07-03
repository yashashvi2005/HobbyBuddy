import express from "express";
import {likeContent, unlikeContent,addComment,getLikeStatus,deleteComment, getComments, getLikesCount} from "../controllers/like$comment.controller.js";
import auth from "../middleware/auth.js";
import { getCurrentUser} from "../controllers/user.controller.js";
const router = express.Router();


router.post("/like", auth,likeContent);
router.post("/unlike", auth,unlikeContent);
router.get("/like/status/:contentId", auth, getLikeStatus);
router.post("/comment",auth, addComment);
router.get("/comment/:contentId",auth, getComments);
router.delete("/comment/delete/:commentId", auth, deleteComment);
router.get("/like/count/:contentId",auth, getLikesCount);
router.get("/me", auth, getCurrentUser);

export default router;
