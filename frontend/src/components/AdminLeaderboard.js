import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/fetch-leaderboard", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      setMessage(err.response?.data?.message || "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminDashboard />

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ minHeight: '100vh', backgroundColor: "#ffffff" }}>
        {/* Heading */}
        <h2 className="text-center fw-bold text-primary mb-4">🏅 Leaderboard</h2>

        {/* Status Messages */}
        {loading && <div className="alert alert-info text-center">Loading leaderboard...</div>}
        {message && <div className="alert alert-danger text-center">{message}</div>}

        {/* Leaderboard Table */}
        <div className="table-responsive">
          <table className="table table-bordered shadow-sm text-center leaderboard-table">
            <thead style={{ backgroundColor: "#007bff", color: "#ffffff" }}>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {!loading && users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-muted">No data found</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td><span className="badge bg-primary">{index + 1}</span></td>
                    <td className="text-primary fw-semibold">{user.name}</td>
                    <td className="text-dark fw-bold">{user.totalPoints}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Custom CSS */}
        <style>{`
          .leaderboard-table {
            border-radius: 10px;
            overflow: hidden;
            background-color: #ffffff;
          }

          .leaderboard-table th,
          .leaderboard-table td {
                      background-color:rgb(228, 240, 253);
            vertical-align: middle;
          }

          .leaderboard-table tbody tr:hover {
            background-color:rgb(178, 209, 240);
            transition: background-color 0.3s ease;
          }

          .badge.bg-primary {
            font-size: 1rem;
            padding: 0.5em 0.75em;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Leaderboard;
