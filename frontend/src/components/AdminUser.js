import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/fetch-users', {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      setError('🚫 Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminDashboard />

      {/* Main Content */}
      <div className="flex-grow-1 bg-body p-4 overflow-auto" style={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}>
        {/* Page Heading */}
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">👥 User Management</h1>
          <p className="text-secondary">Browse all registered users in the system</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger text-center fw-semibold mt-3">
            {error}
          </div>
        )}

        {/* User Cards */}
        {users.length === 0 && !error ? (
          <div className="text-center text-muted fs-5 mt-4">⏳ Loading users...</div>
        ) : (
          <div className="row g-4 mt-3">
            {users.map((user) => (
              <div className="col-md-4" key={user._id}>
                <div className="card user-card h-100 border-0 shadow">
                  <div className="card-body text-center">
                    <div className="profile-img-wrapper mb-3">
                      <img
                        src={user.profile}
                        alt="Profile"
                        className="rounded-circle border border-3 border-primary shadow"
                        style={{
                          width: '120px',
                          height: '120px',
                          objectFit: 'cover',
                          backgroundColor: '#fff',
                        }}
                      />
                    </div>
                    <h5 className="card-title fw-bold text-primary mb-1">{user.name}</h5>
                    <p className="card-text text-secondary mb-1"><strong>Age:</strong> {user.age}</p>
                    <p className="card-text text-secondary mb-1"><strong>City:</strong> {user.city}</p>
                    <p className="card-text text-secondary small">
                      <strong>Hobbies:</strong> {user.hobbies?.join(', ') || 'None'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom CSS */}
        <style>{`
          .user-card {
            background-color:rgba(13, 110, 253, 0.25);
            border-left: 5px solid #0d6efd;
            border-radius: 15px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .user-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(13, 110, 253, 0.25);
            border-left-color: #0056b3;
          }

          .profile-img-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          @media (max-width: 767px) {
            .user-card {
              border-left: none;
              border-top: 5px solid #0d6efd;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default UserManagement;
