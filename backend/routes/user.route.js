import express from "express";
import { signInAction, signUpAction , logoutAction, verifyOtp, checkAuth ,googleSignInAction,forgotPasswordRequest,verifyForgotOtp,resetPassword} from "../controllers/user.controller.js";
import { body } from "express-validator";
import {getAllChallenges} from "../controllers/challenge.controller.js";
import { getAllUsersExpertItself} from "../controllers/user.controller.js";
import { watchVideo, getLeaderboard} from "../controllers/leaderboard.controller.js";
import auth from "../middleware/auth.js"
const router = express.Router();

    router.post("/sign-up",
    body("name","name is required").notEmpty(),
    body("email","email is required").notEmpty(),
    body("password","password is required").notEmpty(),
    body("password","only numbers").isLength({ min: 6 }),signUpAction);
    router.post('/verify-otp', verifyOtp); 
    router.post("/sign-in",signInAction);
    router.get("/sign-out",auth,logoutAction);
    router.get("/check-auth", checkAuth)


    router.get("/fetch-users",auth, getAllUsersExpertItself);

    router.get("/fetch-all-challenges",getAllChallenges);

    router.post("/watch-video/:userId",auth, watchVideo);
    router.get("/fetch-leaderboard", getLeaderboard);


router.post("/google-login", googleSignInAction);
router.post("/forgot-password",forgotPasswordRequest);
router.post("/verify-forgot-otp",verifyForgotOtp);
router.post("/reset-password" ,resetPassword);


export default router ;  