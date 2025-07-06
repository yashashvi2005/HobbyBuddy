import React, { useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;

const CreateChallengeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pointsPerVideo, setPointsPerVideo] = useState("");
  const [videos, setVideos] = useState([]);

  const handleVideoChange = (e) => {
    setVideos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !pointsPerVideo || videos.length === 0) {
      toast.warn("Please fill in all fields and upload at least one video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("pointsPerVideo", pointsPerVideo);

    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", videos[i]);
    }

    try {
      const res = await axios.post(`${baseUrl}/admin/add-challenge`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(" Challenge created successfully!");
      setTitle("");
      setDescription("");
      setPointsPerVideo("");
      setVideos([]);
      document.getElementById("videoInput").value = ""; 
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || " Error creating challenge");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <AdminDashboard />

      <main
        className="flex-grow-1 py-5 px-3 px-md-5"
        style={{
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
          fontFamily: "Segoe UI, sans-serif",
          marginLeft: "-47px",
        }}
      >
        <button
          className="btn btn-outline-primary mb-3 rounded-pill"
          onClick={() => window.history.back()}
          style={{
            marginTop: "-52px",
            marginLeft: "-50px",
          }}
        >
           Back
        </button>

        <div className="container d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg p-4 w-100"
            style={{
              maxWidth: "600px",
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 className="text-center fw-bold mb-4 text-primary">
               Create New Challenge
            </h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label fw-semibold">Title:</label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Challenge Title"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  style={{ borderRadius: "15px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Challenge Description"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Points Per Video:</label>
                <input
                  type="number"
                  className="form-control rounded-pill"
                  value={pointsPerVideo}
                  onChange={(e) => setPointsPerVideo(e.target.value)}
                  placeholder="Points"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Upload Videos:</label>
                <input
                  type="file"
                  id="videoInput"
                  className="form-control"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-pill"
                >
                   Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default CreateChallengeForm;
