import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterPage from './FooterPage';
import NavbarPage from './Navbarpage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChallengeList = () => {
  const primary = '#a259ff';
  const secondary = '#ff66c4';

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/fetch-all-challenges", {
        withCredentials: true,
      });
      setChallenges(res.data.challenges);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.message || "Failed to load challenges");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoWatched = async (videoId, challengeId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warning("User not logged in!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/user/watch-video/${userId}`, {
        videoId,
        challengeId
      }, {
        withCredentials: true
      });

      toast.success(res.data.message || "Points updated!");
    } catch (err) {
      console.error("Video watch error:", err);
      toast.error(err.response?.data?.message || "Error updating points");
    }
  };

  return (
    <>
      <NavbarPage />
      <ToastContainer position="top-right" autoClose={2500} />
      <div style={{ backgroundColor: "#f9f4ff", minHeight: "100vh", paddingBottom: "50px" }}>
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-4" style={{ color: primary }}>
            🎯 All Challenges
          </h2>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Fetching exciting challenges...</p>
            </div>
          )}

          {!loading && challenges.length === 0 && (
            <div className="alert alert-warning text-center">No challenges found yet.</div>
          )}

          <div className="row">
            {challenges.map((challenge) => (
              <div key={challenge._id} className="col-md-6 mb-4">
                <div className="card border-0 shadow-lg h-100">
                  <div className="card-body">
                    <h4 className="fw-bold mb-2" style={{ color: secondary }}>
                      {challenge.title}
                    </h4>
                    <p className="text-muted">{challenge.description}</p>
                    <p className="fw-medium">
                      🎁 <strong>Points per Video:</strong>{' '}
                      <span style={{ color: primary }}>{challenge.pointsPerVideo}</span>
                    </p>

                    <div className="d-flex flex-column gap-3 mt-3">
                      {challenge.videos?.map((video, idx) => (
                        <video
                          key={idx}
                          controls
                          className="rounded w-100 shadow-sm"
                          style={{ height: "315px" }}
                          onEnded={() => handleVideoWatched(video._id, challenge._id)}
                        >
                          <source src={`http://localhost:3000/${video.videoUrl}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ))}
                    </div>

                    <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                      📅 Created At: {new Date(challenge.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default ChallengeList;
