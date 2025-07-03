import express from "express";
import {saveUserDetails, updateUserDetails,getUserProfile,deleteUserProfile} from "../controllers/userprofile.controller.js";
import auth from "../middleware/auth.js";
import { uploadSingleMedia } from "../middleware/multer.js"; 

const router = express.Router();

router.post("/create", auth, uploadSingleMedia, saveUserDetails);
router.put("/update/me", auth,uploadSingleMedia, updateUserDetails);
router.get("/fetch/me",auth,getUserProfile)
router.delete("/delete", auth, deleteUserProfile);

export default router;
