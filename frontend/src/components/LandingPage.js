import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/hobbybuddy_logo.png';
import bg from '../assets/background.avif';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/select-role');
  };

  const backgroundStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(6px)',
    height: '100vh',
    width: '100%',
    position: 'absolute',
    zIndex: '-1',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
  };

  return (
    <div className="position-relative vh-100 d-flex justify-content-center align-items-center">
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div className="text-center text-white z-1">
        <img src={logo} alt="Logo" className="mb-4" style={{ width: '200px' }} />
        <h1 className="fw-bold mb-3">Your Interests. Your Arena.</h1>
        <button
          className="btn btn-light px-4 py-2 fw-semibold rounded-pill"
          onClick={handleStart}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
