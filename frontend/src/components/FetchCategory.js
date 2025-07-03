import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import { useNavigate } from 'react-router-dom';
import categoryBg from '../assets/category4.avif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FetchCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/admin/fetch-category',
        { withCredentials: true }
      );
      setCategories(res.data.categories);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        '❌ Failed to fetch categories';
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    toast.info(
      <div>
        <strong>Are you sure?</strong>
        <div className="d-flex justify-content-center gap-3 mt-2">
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              try {
                await axios.delete(
                  `http://localhost:3000/admin/delete-category/${id}`,
                  { withCredentials: true }
                );
                setCategories((prev) => prev.filter((cat) => cat._id !== id));
                toast.dismiss(); // Close confirm toast
                toast.success('🗑️ Category deleted successfully');
              } catch (err) {
                const msg =
                  err.response?.data?.message ||
                  err.response?.data?.error ||
                  '❌ Failed to delete category';
                toast.dismiss();
                toast.error(msg);
              }
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: 'top-center',
      }
    );
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '240px' }}>
        <AdminDashboard />
      </div>

      {/* Main Content with Background Image */}
      <main
        className="py-5 px-4 flex-grow-1"
        style={{
          backgroundImage: `url(${categoryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Segoe UI, sans-serif',
        }}
      >
        {/* Back Button */}
        <button
          className="btn d-flex align-items-center gap-2 px-3 py-2 mb-4"
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
          Back to Category
        </button>

        <div
          className="container-fluid px-0"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '12px',
            width: '450px',
            marginLeft: '150px',
          }}
        >
          <h2 className="text-center fw-bold mb-4" style={{ color: '#333' }}>
            📋 All Categories
          </h2>

          {categories.length === 0 ? (
            <p className="text-center text-muted">No categories found.</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {categories.map((cat) => (
                <div
                  className="card border-0 shadow-sm p-4"
                  key={cat._id}
                  style={{
                    width: '300px',
                    borderRadius: '16px',
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
                  <h5 className="fw-bold text-primary mb-2">
                    📁 {cat.categoryName}
                  </h5>
                  <p className="text-muted small mb-3">ID: {cat._id}</p>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <i className="bi bi-trash me-2"></i> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toastify Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </main>
    </div>
  );
}

export default FetchCategory;
