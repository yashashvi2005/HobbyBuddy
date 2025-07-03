// src/pages/AdminSignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../assets/bg3.avif'; // Adjust path if needed


function AdminSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/sign-in', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
        },credentials : "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('✅ Admin Login Successful!', {
          position: 'top-right',
          autoClose: 2500,
        });
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2600); // Wait for toast to finish
      } else {
        toast.error(data.error || '❌ Login failed', {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error. Please try again later.', {
        position: 'top-right',
      });
    }
  };
return (
  <div
    className="vh-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div
      className="card p-5 shadow-lg border-0 rounded-4"
      style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    > 
   
      <h2 className="text-center mb-4 text-primary">Admin Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="email"
            placeholder="Admin Email"
            className="form-control rounded-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            placeholder="Password"
            className="form-control rounded-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 rounded-3">
          Sign In
        </button>
      </form>
      <ToastContainer />
    </div>
  </div>
);

}

export default AdminSignIn;
