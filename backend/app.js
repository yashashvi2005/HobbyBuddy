import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from "./routes/user.route.js";
import AdminRouter from "./routes/admin.route.js";
import userProfileRoute from "./routes/userprofile.route.js";
import postRouter from "./routes/post.route.js"
import aiRoute from "./routes/ai.route.js";
import LikeComment from "./routes/like$comment.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL2)
.then(()=>{
   
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({extended:true,limit: '50mb'}));
    app.use('/uploads', express.static('uploads'));

    app.use("/user",UserRouter);
    app.use("/admin",AdminRouter);
    app.use("/userprofile",userProfileRoute);
    app.use("/post",postRouter);
    app.use("/ai",aiRoute);
    app.use("/likecomment", LikeComment);

    app.listen(process.env.PORT,()=>{
    console.log("database connected...");
    console.log("sever started...."+process.env.PORT);
})
})
.catch(err=>{
    console.log(err);
    console.log("database not connected")
});