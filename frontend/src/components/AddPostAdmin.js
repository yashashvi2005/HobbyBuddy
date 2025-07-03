import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { useNavigate } from "react-router-dom";
import postbg from "../assets/post1.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddPostForm = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    categoryName: "",
  });
  const [mediaFile, setMediaFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setPost({ ...post, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, categoryName } = post;

    if (!title || !description || !categoryName || !mediaFile) {
      toast.warn("❗ Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryName", categoryName);
    formData.append("media", mediaFile);

    try {
      const res = await axios.post("http://localhost:3000/admin/add-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message || "✅ Post added successfully!");
      setPost({ title: "", description: "", categoryName: "" });
      setMediaFile(null);
      document.getElementById("mediaInput").value = "";
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "❌ Failed to add post.";
      toast.error(msg);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminDashboard />

      {/* Main Content */}
      <main
        className="flex-grow-1 d-flex align-items-center justify-content-center px-4 py-5"
        style={{
          backgroundImage: `url(${postbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "Segoe UI, sans-serif",
          marginLeft: "-47px", // match AllPosts sidebar layout
        }}
      >
         {/* 🔙 Back Button */}
            <button
              className="btn btn-outline-primary mb-3 rounded-pill"
              onClick={() => window.history.back()}
              style={{marginTop:"-520px",
                marginLeft:"-50px"
              }}
            >
              ⬅️ Back
            </button>
        <div
          className="card p-4 shadow-lg w-100"
          style={{
            maxWidth: "600px",
            backgroundColor: "rgba(255,255,255,0.85)",
            borderRadius: "20px",
            backdropFilter: "blur(5px)",
          }}
        >
          <h2 className="text-center text-primary fw-bold mb-4">📝 Add New Post</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={post.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter description"
                value={post.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Media File</label>
              <input
                type="file"
                className="form-control"
                id="mediaInput"
                accept="image/*,video/*"
                onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Category</label>
              <select
                className="form-select"
                value={post.categoryName}
                onChange={(e) => handleChange("categoryName", e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="art">Photo</option>
                <option value="sports">Video</option>
                <option value="coding">Events</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold">
              🚀 Submit Post
            </button>
          </form>
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddPostForm;