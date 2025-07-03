import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  }
});

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pointsPerVideo: {
    type: Number,
    required: true
  },
  videos: [videoSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Challenge = mongoose.model("Challenge", challengeSchema);
