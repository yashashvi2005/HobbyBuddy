// src/pages/Post.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import postbg from '../assets/post1.avif';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
function Post() {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminDashboard />

      <main
        className="flex-grow-1 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${postbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Segoe UI, sans-serif',
          marginLeft: '-47px',
        }}
      >
        <div className="text-center">
          <h2
            className="fw-bold mb-5"
            style={{
              color: '#fff',
              textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
              fontSize: '2.2rem',
            }}
          >
             Post Management
          </h2>

          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <div
              className="card border-0 shadow p-4"
              style={{
                width: '300px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(6px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h5 className="text-primary fw-bold mb-2"> Add Post</h5>
              <p className="text-muted mb-4">Create a new post for users to explore and interact with.</p>
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => navigate('/admin/add-post')}
              >
                <i className="bi bi-pencil-square me-2"></i> Add Post
              </button>
            </div>

            <div
              className="card border-0 shadow p-4"
              style={{
                width: '300px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(6px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h5 className="text-success fw-bold mb-2"> View Posts</h5>
              <p className="text-muted mb-4">See and manage all posts published by users or admins.</p>
              <button
                className="btn btn-outline-success w-100"
                onClick={() => navigate('/admin/fetch-posts')}
              >
                <i className="bi bi-journal-text me-2"></i> View Posts
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Post;
