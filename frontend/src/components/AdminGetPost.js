import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import postbg from "../assets/post1.avif";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LikeCommentButtons from "./LikeCommentButton"; // ✅ Added for like/comment

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/admin/fetch-all-post", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setPosts(data.data);
        } else {
          setError(data.message || "Failed to fetch posts");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("⚠️ Network error");
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const media = post.media?.toLowerCase() || "";
    const cat = post.categoryName?.toLowerCase() || "";

    if (selectedFilter === "image") return media.match(/\.(jpg|jpeg|png|webp|gif)$/);
    if (selectedFilter === "video") return media.endsWith(".mp4");
    if (selectedFilter === "event") return cat.includes("event");
    return true;
  });

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminDashboard />

      {/* Main Content */}
      <main
        className="flex-grow-1 px-4 py-4"
        style={{
          backgroundImage: `url(${postbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "Segoe UI, sans-serif",
          marginLeft: "-47px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <select
            className="form-select w-auto"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">🔄 Show All</option>
            <option value="image">🖼️ Photos</option>
            <option value="video">🎬 Videos</option>
            <option value="event">📅 Events</option>
          </select>
        </div>

        <h2
          className="text-center fw-bold mb-4"
          style={{
            color: "#fff",
            textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            fontSize: "2.2rem",
          }}
        >
          🖼️ All Posts Gallery
        </h2>

        {error && <p className="text-danger text-center">{error}</p>}

        {/* Cards Grid */}
        <div className="row g-4">
          {filteredPosts.map((post) => (
            <div key={post._id} className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div
                className="card border-0 shadow p-3"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(6px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  width: "100%",
                  maxWidth: "330px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Media */}
                {post.media?.match(/\.(jpg|jpeg|png|webp|gif)$/i) && (
                  <img
                    src={`http://localhost:3000/${post.media}`}
                    alt="media"
                    className="card-img-top mb-3"
                    style={{ height: "180px", objectFit: "cover", borderRadius: "12px" }}
                  />
                )}

                {post.media?.endsWith(".mp4") && (
                  <video className="card-img-top mb-3" height="180" controls>
                    <source src={`http://localhost:3000/${post.media}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {/* Text Content */}
                <h5 className="text-primary fw-bold">{post.title}</h5>
                <p className="text-muted" style={{ minHeight: "40px" }}>
                  {post.description}
                </p>
                <div className="text-secondary small mb-2">
                  <strong>User ID:</strong> {post.userId}
                </div>

                {/* ❤️ Like & 💬 Comment */}
                <LikeCommentButtons contentId={post._id} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllPosts;
