import { Challenge } from "../models/challenge.model.js";
export const createChallenge = async (req, res) => {
  try {
    const { title, description, pointsPerVideo } = req.body;

    const videoPaths = req.files.map(file => ({
      videoUrl: file.path
    }));

    const newChallenge = new Challenge({
      title,
      description,
      pointsPerVideo,
      videos: videoPaths
    });

    await newChallenge.save();

    res.status(201).json({ message: "Challenge created successfully" });
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).json({ message: "Error creating challenge", error });
  }
};

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().select("-__v");
    res.status(200).json({ challenges });
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ message: "Error fetching challenges", error: error.message });
  }
};


export const deleteChallenge = async (req, res) => {
  const { challengeId } = req.params; 
  if (!challengeId) {
    return res.status(400).json({ message: "Challenge ID is required" });
  }

  try {
    const deletedChallenge = await Challenge.findByIdAndDelete(challengeId);

    if (!deletedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json({ message: "Challenge deleted successfully", deletedChallenge });
  } catch (error) {
    res.status(500).json({ message: "Error deleting challenge", error: error.message });
  }
};

export const updateChallenge = async (req, res) => {
  const { challengeId } = req.params;
  const { title, description, pointsPerVideo, videos } = req.body;

  if (!challengeId) {
    return res.status(400).json({ message: "Challenge ID is required" });
  }

  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(pointsPerVideo && { pointsPerVideo }),
        ...(videos && Array.isArray(videos) && { videos }),
      },
      { new: true } 
    );

    if (!updatedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json({ message: "Challenge updated successfully", updatedChallenge });
  } catch (error) {
    res.status(500).json({ message: "Error updating challenge", error: error.message });
  }
};

