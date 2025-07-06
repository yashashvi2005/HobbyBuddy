import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pointsPerVideo: '',
    videos: [],
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(`${baseUrl}/admin/fetch-all-challenges`, {
        withCredentials: true,
      });
      setChallenges(res.data.challenges);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error fetching challenges');
    } finally {
      setLoading(false);
    }
  };

  const deleteChallenge = async (challengeId) => {
    if (!window.confirm("Kya aap is challenge ko delete karna chahte ho?")) return;

    try {
      const res = await axios.delete(`${baseUrl}/admin/delete-challenge/${challengeId}`, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      fetchChallenges();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error deleting challenge');
    }
  };

  const startEditing = (challenge) => {
    setEditingChallenge(challenge._id);
    setFormData({
      title: challenge.title,
      description: challenge.description,
      pointsPerVideo: challenge.pointsPerVideo,
      videos: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    setFormData((prev) => ({ ...prev, videos: e.target.files }));
  };

  const cancelEdit = () => {
    setEditingChallenge(null);
    setFormData({ title: '', description: '', pointsPerVideo: '', videos: [] });
  };

  const updateChallenge = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('pointsPerVideo', formData.pointsPerVideo);

    for (let i = 0; i < formData.videos.length; i++) {
      payload.append('videos', formData.videos[i]);
    }

    try {
      const res = await axios.put(
        `${baseUrl}/admin/update-challenge/${editingChallenge}`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      setMessage(res.data.message);
      setEditingChallenge(null);
      fetchChallenges();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating challenge');
    }
  };

  return (
    <div className="d-flex" style={{ background: '#f0f8ff', minHeight: '100vh' }}>
      <div style={{ flexShrink: 0 }}>
        <AdminDashboard />
      </div>

      <div className="container-fluid px-4 py-4" style={{ width: '100%' }}>
        <h2 className="text-center mb-4 text-primary fw-bold"> All Challenges</h2>

        {loading && <div className="alert alert-info">Loading challenges...</div>}
        {message && <div className="alert alert-info">{message}</div>}

        <div className="mb-3">
          <button
            className="btn btn-outline-primary rounded-pill"
            onClick={() => window.history.back()}
          >
             Back
          </button>
        </div>

        {editingChallenge && (
          <div className="card mb-4 p-4 shadow" style={{ border: '2px solid #007bff', backgroundColor: '#e9f3ff' }}>
            <h4 className="text-primary mb-3">Edit Challenge</h4>
            <form onSubmit={updateChallenge} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control border-primary"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control border-primary"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Points per Video</label>
                <input
                  type="number"
                  name="pointsPerVideo"
                  className="form-control border-primary"
                  value={formData.pointsPerVideo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload New Videos</label>
                <input
                  type="file"
                  className="form-control border-primary"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                />
                <small className="text-muted">Purane videos overwrite ho jaayenge</small>
              </div>
              <button type="submit" className="btn btn-primary me-2"> Update</button>
              <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}> Cancel</button>
            </form>
          </div>
        )}

        <div className="row">
          {challenges.map((challenge) => (
            <div key={challenge._id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm" style={{ border: '2px solid #007bff', backgroundColor: '#ffffff' }}>
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{challenge.title}</h5>
                  <p className="card-text">{challenge.description}</p>
                  <p><strong>Points per Video:</strong> {challenge.pointsPerVideo}</p>

                  <strong>Videos:</strong>
                  <div className="d-flex flex-column gap-3 mt-2">
                    {challenge.videos?.map((video, index) => (
                      <div key={index} className="rounded overflow-hidden shadow-sm">
                        <video
                          className="w-100 border border-primary"
                          controls
                          style={{ height: "315px", borderRadius: "12px" }}
                        >
                          <source
                            src={`http://localhost:3000/${video.videoUrl}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                    Created At: {new Date(challenge.createdAt).toLocaleString()}
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-outline-danger" onClick={() => deleteChallenge(challenge._id)}> Delete</button>
                    <button className="btn btn-outline-primary" onClick={() => startEditing(challenge)}> Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengeList;
