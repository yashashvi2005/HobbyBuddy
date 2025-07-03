import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterPage from "./FooterPage";
import NavbarPage from "./Navbarpage";

function AddFriendsPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [requestsSent, setRequestsSent] = useState([]);

  const getUserIdFromCookie = () => {
    const match = document.cookie.match(/(?:^|;\s*)userId=([^;]+)/);
    return match ? match[1] : null;
  };

  const currentUserId = getUserIdFromCookie();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/fetch-users', {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sendFriendRequest = async (receiverId) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/send-request',
        { receiverId },
        { withCredentials: true }
      );
      setRequestsSent((prev) => [...prev, receiverId]);
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("❌ Something went wrong while sending the friend request.");
      }
    }
  };

  return (
    <>
      <NavbarPage />

      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold text-primary display-5">Find New Friends</h2>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {users.map((user) => (
            <div className="col-lg-4 col-md-6 col-sm-10" key={user._id}>
              <div className="user-card p-4 shadow rounded-4 text-center">
                <div className="profile-img-wrapper mb-3">
                  <img
                    src={user.profile || "/default-profile.jpg"}
                    alt="Profile"
                    className="rounded-circle border border-4"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderColor: '#0d6efd'
                    }}
                  />
                </div>

                <h5 className="fw-bold text-dark">{user.name}</h5>
                <p className="text-secondary mb-1"><i className="bi bi-calendar-heart"></i> Age: {user.age}</p>
                <p className="text-secondary mb-1"><i className="bi bi-geo-alt"></i> City: {user.city}</p>
                <p className="text-muted small">
                  <i className="bi bi-stars"></i> <strong>Hobbies:</strong> {user.hobbies?.join(', ') || 'None'}
                </p>

                {user._id !== currentUserId && (
                  <button
                    className={`btn mt-3 fw-semibold px-4 py-2 ${
                      requestsSent.includes(user._id) ? 'btn-success' : 'btn-outline-primary'
                    }`}
                    onClick={() => sendFriendRequest(user._id)}
                    disabled={requestsSent.includes(user._id)}
                  >
                    {requestsSent.includes(user._id)
                      ? "Request Sent ✅"
                      : "Send Friend Request"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterPage />

      {/* 🎨 Styling */}
      <style>{`
        .user-card {
          background: linear-gradient(to bottom right, #e7f3ff, #f3f9ff);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .user-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .profile-img-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export default AddFriendsPage;
