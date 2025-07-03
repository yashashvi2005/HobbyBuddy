import express from 'express';
import { answerHobbyQuestion } from "../controllers/ai.controller.js"


const router = express.Router();

router.post('/ask', answerHobbyQuestion);

export default router;
