import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentBox = ({ contentId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/likecomment/me", {
        withCredentials: true,
      });
      setCurrentUserId(res.data.user._id);
    } catch (err) {
      console.error("❌ Error fetching current user:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/likecomment/comment/${contentId}`, {
        withCredentials: true,
      });
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchComments();
  }, [contentId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(
        "http://localhost:3000/likecomment/comment",
        { contentId, text },
        { withCredentials: true }
      );
      setText("");
      fetchComments();
    } catch (err) {
      console.error("❌ Error adding comment:", err);
    }
  };

  return (
    <div className="mt-3">
      {/* ✏️ Add comment input */}
      <div className="d-flex gap-2 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Post
        </button>
      </div>

      {/* 🗒️ Comment list */}
      {comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        comments.map((c, i) => (
          <div
            key={i}
            className="bg-light p-2 rounded mb-2"
          >
            <strong>{c.userId?.name || "Anonymous"}:</strong> {c.text}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentBox;
