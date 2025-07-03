import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterPage from "./FooterPage";
import NavbarPage from "./Navbarpage";
import { Spinner } from "react-bootstrap";

const Leaderboard = () => {
  const primary = '#a259ff';
  const secondary = '#ff66c4';

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/fetch-leaderboard", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      setMessage(err.response?.data?.message || "Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarPage />
      <div style={{ backgroundColor: "#f9f4ff", minHeight: "100vh", paddingBottom: "50px" }}>
        <div className="container pt-5">
          <h2 className="text-center fw-bold mb-4" style={{ color: primary }}>
            🏆 Leaderboard
          </h2>

          {loading && (
            <div className="text-center my-4">
              <Spinner animation="border" style={{ color: secondary }} />
              <p className="mt-2 text-muted">Fetching champions...</p>
            </div>
          )}

          {message && (
            <div className="alert alert-danger text-center">{message}</div>
          )}

          {!loading && users.length === 0 && (
            <div className="alert alert-warning text-center">No data found.</div>
          )}

          {!loading && users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle shadow rounded" style={{ backgroundColor: "#fff" }}>
                <thead style={{ backgroundColor: primary, color: "white" }}>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      style={{
                        backgroundColor:
                          index === 0 ? "#fff8e1" : index === 1 ? "#f3e5f5" : index === 2 ? "#e3f2fd" : "#fff",
                      }}
                    >
                      <td>
                        <span style={{ fontWeight: "bold", color: secondary }}>
                          #{index + 1}
                        </span>
                      </td>
                      <td>{user.name}</td>
                      <td>
                        <span className="badge bg-success fs-6">
                          {user.totalPoints} pts
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default Leaderboard;
