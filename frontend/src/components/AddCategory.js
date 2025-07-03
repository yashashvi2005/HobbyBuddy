import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import { useNavigate } from 'react-router-dom';
import category from '../assets/category4.avif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.warn('⚠️ Please enter a category name');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/admin/add-category',
        { categoryName: categoryName.trim() },
        { withCredentials: true }
      );

      const message = response.data?.message || '✅ Category created successfully!';
      toast.success(message);
      setCategoryName('');
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        '❌ Something went wrong while adding category';
      toast.error(errMsg);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '240px' }}>
        <AdminDashboard />
      </div>

      {/* Main Content with Background Image */}
      <main
        className="flex-grow-1 py-5 px-4"
        style={{
          backgroundImage: `url(${category})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Segoe UI, sans-serif',
        }}
      >
        {/* 🔙 Back Button */}
        <button
          className="btn d-flex align-items-center gap-2 px-3 py-2 mb-3"
          style={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            border: 'none',
            borderRadius: '30px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'all 0.3s ease',
          }}
          onClick={() => navigate('/admin-dashboard/category')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d0d0d0';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e0e0';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Categories
        </button>

        <div
          className="container-fluid px-0"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <h2 className="text-center fw-bold mb-5" style={{ color: '#333' }}>
            📂 Add New Category
          </h2>

          <div className="d-flex justify-content-center">
            <div
              className="card border-0 shadow-sm p-3 position-relative"
              style={{
                width: '300px',
                borderRadius: '12px',
                backgroundColor: '#ffffffd9',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.02)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h5 className="text-primary fw-bold mb-3">➕ Create Category</h5>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />

              <button
                className="btn btn-primary w-100"
                onClick={handleAddCategory}
              >
                <i className="bi bi-plus-circle me-2"></i> Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Toastify Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </main>
    </div>
  );
}

export default AddCategory;
