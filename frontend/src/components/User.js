import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/fetch-users');
      setUsers(res.data.users);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">👥 All Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {users.map((user) => (
          <div className="col-md-4" key={user._id}>
            <div className="card user-card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="profile-img-wrapper mb-3">
                  <img
                    src={user.profile}
                    alt="Profile"
                    className="rounded-circle border border-3 border-primary"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h5 className="card-title mb-1 fw-semibold">{user.name}</h5>
                <p className="card-text text-muted mb-1"><strong>Age:</strong> {user.age}</p>
                <p className="card-text text-muted mb-1"><strong>City:</strong> {user.city}</p>
                <p className="card-text text-muted small">
                  <strong>Hobbies:</strong> {user.hobbies?.join(', ') || 'None'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Extra Styling */}
      <style>{`
        .user-card:hover {
          transform: translateY(-5px);
          transition: 0.3s ease;
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}

export default FetchUsers;
