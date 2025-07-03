import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true 
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  watchedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge" 
    }
  ]  
});

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
