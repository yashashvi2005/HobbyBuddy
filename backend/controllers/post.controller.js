import { Content } from "../models/post.model.js";
import mongoose from "mongoose";

export const addPost = async (req, res) => {
  const userId = req.userId;
  const { title, description, categoryName } = req.body;
  const mediaFile = req.file;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - Please login" });
  }

  if (!title || !description || !categoryName || !mediaFile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const mediaPath = mediaFile.path.replace(/\\/g, "/");

    const newPost = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      media: mediaPath,
      categoryName,
    };

    const contentDoc = await Content.findOneAndUpdate(
      { userId },
      { $push: { post: newPost } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: " Post created successfully!",
      content: contentDoc,
    });
  } catch (error) {
    console.error(" Create Post Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
export const deletePost = async (req, res) => {
  const mediaId = req.params.mediaId;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - Please login" });
  }

  if (!mongoose.Types.ObjectId.isValid(mediaId)) {
    return res.status(400).json({ message: "Invalid media ID" });
  }

  try {
    const updatedContent = await Content.findOneAndUpdate(
      { userId },
      { $pull: { post: { _id: mediaId } } },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: "Post not found or already deleted" });
    }

    res.status(200).json({
      message: " Post deleted successfully",
      updatedData: updatedContent,
    });
  } catch (error) {
    console.error(" Delete Post Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Content.find({}, { post: 1, uploaderType: 1, userId: 1 });

    const flatPosts = allPosts.flatMap(content =>
      content.post.map(post => ({
        ...post.toObject(),
        userId: content.userId,
        uploaderType: content.uploaderType
      }))
    );
    res.status(200).json({
      message: "All posts fetched successfully",
      data: flatPosts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
};

export const getAllPostsNames = async (req, res) => {
  try {
    const { categoryName, title, contentType } = req.query;

    const allContents = await Content.find({}, { post: 1, uploaderType: 1, userId: 1 });

    let flatPosts = allContents.flatMap(content =>
      content.post.map(post => ({
        ...post.toObject(),
        userId: content.userId,
        uploaderType: content.uploaderType,
        mediaUrl: `${req.protocol}://${req.get("host")}/${post.media}`
      }))
    );

    if (categoryName) {
      flatPosts = flatPosts.filter(post =>
        post.categoryName?.toLowerCase() === categoryName.toLowerCase()
      );
    }

    if (title) {
      flatPosts = flatPosts.filter(post =>
        post.title?.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (contentType) {
      flatPosts = flatPosts.filter(post =>
        post.contentType?.toLowerCase() === contentType.toLowerCase()
      );
    }

    res.status(200).json({ posts: flatPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};
export const getAllPostsOfUser = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - Please login" });
  }

  try {
    const userContent = await Content.findOne({ userId });

    if (!userContent || !userContent.post || userContent.post.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    const fullPosts = userContent.post.map((post) => ({
      ...post._doc,
      mediaUrl: `http://localhost:3000/${post.media}`,
    }));

    res.status(200).json({
      message: " All posts fetched successfully!",
      posts: fullPosts,
    });

  } catch (error) {
    console.error(" Get All Posts Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
