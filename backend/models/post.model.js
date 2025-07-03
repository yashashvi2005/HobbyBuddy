import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  media: {
    type: String, 
    required: true
  },
  categoryName: {
    type: String,
    required: true
  }
},
 { _id: true }); 

const contentSchema = new mongoose.Schema({
  post: [postSchema], 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  uploaderType: {
    type: String,
    enum: ["user", "admin"],
    required: false 
  }
});

export const Content = mongoose.model("Content", contentSchema);

