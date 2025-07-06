import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import category from "../assets/category4.avif";
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
function Category() {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '240px', zIndex: 2 }}>
        <AdminDashboard />
      </div>

      <main
        className="flex-grow-1 py-5 px-3 px-md-5"
        style={{
          backgroundImage: `url(${category})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Segoe UI, sans-serif',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div
          className="container-fluid px-0"
          style={{
            marginTop: '100px',
          }}
        >
          <h2
            className="text-center fw-bold mb-5"
            style={{
              color: '#fff',
              textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
              fontSize: '2.2rem',
            }}
          >
             Category Management
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
              <h5 className="text-primary fw-bold mb-2">Add Category</h5>
              <p className="text-muted mb-4">Create and manage new category entries easily.</p>
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => navigate('/admin-dashboard/category/add')}
              >
                <i className="bi bi-plus-circle me-2"></i> Add Category
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
              <h5 className="text-success fw-bold mb-2"> View Categories</h5>
              <p className="text-muted mb-4">Browse and manage existing categories in the system.</p>
              <button
                className="btn btn-outline-success w-100"
                onClick={() => navigate('/admin-dashboard/category/fetch')}
              >
                <i className="bi bi-folder2-open me-2"></i> View Categories
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Category;
