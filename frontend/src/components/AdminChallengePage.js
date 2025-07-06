import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import challengeBg from '../assets/category4.avif';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
function Challenge() {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '240px' }}>
        <AdminDashboard />
      </div>

      <main
        className="flex-grow-1 py-5 px-4"
        style={{
          backgroundImage: `url(${challengeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Segoe UI, sans-serif',
        }}
      >
        <h2
          className="text-center fw-bold mb-5"
          style={{
            color: '#fff',
            textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
            fontSize: '2rem',
          }}
        >
           Challenge Management
        </h2>

        <div className="d-flex justify-content-center flex-wrap gap-4">
          <div
            className="card border-0 shadow-sm p-4"
            style={{
              width: '300px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(6px)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h5 className="text-primary fw-bold mb-3"> Create Challenge</h5>
            <p className="text-muted mb-4">Add a new challenge to the system.</p>
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => navigate('/admin-dashboard/challenge/create')}
            >
              <i className="bi bi-plus-circle me-2"></i> Create Challenge
            </button>
          </div>

          <div
            className="card border-0 shadow-sm p-4"
            style={{
              width: '300px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(6px)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h5 className="text-success fw-bold mb-3"> View Challenges</h5>
            <p className="text-muted mb-4">Browse all challenges in the system.</p>
            <button
              className="btn btn-outline-success w-100"
              onClick={() => navigate('/admin-dashboard/challenge/fetch')}
            >
              <i className="bi bi-collection me-2"></i> View Challenges
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Challenge;
