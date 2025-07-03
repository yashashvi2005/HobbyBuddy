import { Challenge } from "../models/challenge.model.js";
import { User } from "../models/user.model.js";
export const watchVideo = async (req, res) => {
  const userId = req.params.userId; 
  const { videoId, challengeId } = req.body;

  if (!videoId || !challengeId || !userId) {
    return res.status(400).json({ message: "User ID, Video ID, and Challenge ID are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.watchedVideos.includes(videoId)) {
      return res.status(400).json({ message: "Video already watched" });
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    const video = challenge.videos.id(videoId);
    if (!video) return res.status(404).json({ message: "Video not found in challenge" });

    user.watchedVideos.push(videoId);
    user.totalPoints += challenge.pointsPerVideo;
    await user.save();

    res.status(200).json({
      message: "Video watched successfully, points updated",
      totalPoints: user.totalPoints
    });

  } catch (error) {
    res.status(500).json({ message: "Error watching video", error: error.message });
  }
};



export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .sort({ totalPoints: -1 })
      .select("name totalPoints")  
      .limit(10); 

    res.status(200).json({ message: "Leaderboard fetched", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
  }
};
