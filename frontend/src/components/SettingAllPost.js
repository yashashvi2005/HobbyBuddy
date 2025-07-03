import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Button } from "react-bootstrap";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/post/fetch-user-posts", {
        withCredentials: true,
      });
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (mediaId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/post/delete-post/${mediaId}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((post) => post._id !== mediaId));
    } catch (error) {
      console.error("❌ Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading posts...</p>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-wrap justify-content-start gap-4"
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      {posts.length === 0 ? (
        <p className="text-muted text-center w-100">You haven't added any posts yet.</p>
      ) : (
        posts.map((post, index) => (
          <div
            key={post._id || index}
            className="shadow-sm rounded-4 p-2"
            style={{
              width: "300px",
              backgroundColor: "#eaf2ff",
              borderRadius: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {post.mediaUrl?.endsWith(".mp4") ? (
              <video
                controls
                className="w-100 rounded"
                style={{ maxHeight: "180px", objectFit: "cover", borderRadius: "15px" }}
              >
                <source src={post.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={post.mediaUrl}
                alt="Post Media"
                className="w-100 rounded"
                style={{ maxHeight: "180px", objectFit: "cover", borderRadius: "15px" }}
              />
            )}

            <div className="mt-2 px-2">
              <h6 className="fw-bold text-primary">{post.title}</h6>
              <p className="mb-2" style={{ fontSize: "14px", color: "#333" }}>
                {post.description}
              </p>
              <p className="mb-1 text-muted" style={{ fontSize: "13px" }}>
                <strong>Uploader:</strong> You
              </p>
              <p className="mb-2 text-muted" style={{ fontSize: "13px" }}>
                <strong>User ID:</strong> {post.userId || "N/A"}
              </p>

              <Button
                variant="danger"
                size="sm"
                className="w-100"
                onClick={() => handleDelete(post._id)}
              >
                Delete Post
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllPosts;
