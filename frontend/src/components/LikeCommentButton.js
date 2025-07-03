import { useEffect, useState } from "react";
import axios from "axios";
import CommentBox from "./CommentBox"; // ✅ Import your CommentBox

const LikeCommentButtons = ({ contentId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false); // 👈 For toggle

  useEffect(() => {
    // 🧡 Get like status + count
    axios
      .get(`http://localhost:3000/likecomment/like/status/${contentId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLiked(res.data.liked);
        setLikeCount(res.data.likeCount || 0);
      })
      .catch((err) => {
        console.error("❌ Failed to get like status", err);
      });

    // 💬 Get comment count
    axios
      .get(`http://localhost:3000/likecomment/comment/${contentId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCommentCount(res.data.comments?.length || 0);
      })
      .catch((err) => {
        console.error("❌ Failed to get comment count", err);
      });
  }, [contentId]);

  const handleLike = async () => {
    try {
      const route = liked ? "unlike" : "like";
      await axios.post(
        `http://localhost:3000/likecomment/${route}`,
        { contentId },
        { withCredentials: true }
      );
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("❌ Like/unlike error:", err);
    }
  };

  return (
    <div className="mt-3">
      {/* 👍 Like & 💬 Comment Buttons */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-danger btn-sm" onClick={handleLike}>
          {liked ? "💔 Unlike" : "❤️ Like"} ({likeCount})
        </button>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setShowComments((prev) => !prev)}
        >
          💬 Comment ({commentCount})
        </button>
      </div>

      {/* 🗨️ Toggle CommentBox */}
      {showComments && <CommentBox contentId={contentId} />}
    </div>
  );
};

export default LikeCommentButtons;
