import Like from "../models/like.model.js";
import Comment from "../models/comment.model.js";
import { User } from "../models/user.model.js";


export const likeContent = async (req, res) => {
  const { contentId } = req.body;
  const userId = req.userId;

  try {
    const like = await Like.create({ userId, contentId });
    res.status(201).json({ success: true, message: "Content liked!", like });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "You already liked this content." });
    }
    res.status(500).json({ success: false, message: "Error liking content", error });
  }
};


export const unlikeContent = async (req, res) => {
  const { contentId } = req.body;
  const userId = req.userId;

  try {
    await Like.findOneAndDelete({ userId, contentId });
    res.status(200).json({ success: true, message: "Content unliked." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error unliking content", error });
  }
};

export const addComment = async (req, res) => {
  const { contentId, text } = req.body;
  const userId = req.userId;

  try {
    const comment = await Comment.create({ userId, contentId, text });
    res.status(201).json({ success: true, message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding comment", error });
  }
};


export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.userId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting comment", error });
  }
};

export const getComments = async (req, res) => {
  const { contentId } = req.params;

  try {
    const comments = await Comment.find({ contentId }).populate("userId", "name");
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(" Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Error getting comments",
      error: error.message
    });
  }
};



export const getLikesCount = async (req, res) => {
  const { contentId } = req.params;
  try {
    const count = await Like.countDocuments({ contentId });
    res.status(200).json({ success: true, likes: count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting like count", error });
  }
};

export const getLikeStatus = async (req, res) => {
  const userId = req.userId;
  const contentId = req.params.contentId;

  try {
    const liked = await Like.findOne({ userId, contentId });
    const likeCount = await Like.countDocuments({ contentId });

    res.status(200).json({ liked: !!liked, likeCount });
  } catch (err) {
    res.status(500).json({ error: "Error fetching like status" });
  }
};
