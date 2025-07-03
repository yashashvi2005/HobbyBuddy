import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
