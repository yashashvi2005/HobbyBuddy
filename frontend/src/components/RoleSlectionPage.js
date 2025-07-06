import { useNavigate } from 'react-router-dom';
import logo from '../assets/hobbybuddy_logo.png'; // 📝 Place your logo here
import bg from '../assets/landing.avif';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
function RoleSelectionPage() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'admin') {
      navigate('/admin-login');
    } else {
      navigate('/dashboard');
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(6px)',
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: '-1',
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div style={backgroundStyle}></div>
      <div
        className="text-center p-4 rounded-4 shadow-lg"
        style={{
          maxWidth: '420px',
          width: '100%',
          backgroundColor: '#fff',
          border: '2px solid #6C4AB6',
          zIndex: '1',
        }}
      >
        <img
          src={logo}
          alt="Hobby Buddy Logo"
          className="mb-3"
          style={{ width: '100px', borderRadius: '50%' }}
        />
        <h2 className="fw-bold mb-1" style={{ color: '#6C4AB6' }}>
          Hobby Buddy
        </h2>
        <p className="mb-4" style={{ color: '#3A3A3A', fontStyle: 'italic' }}>
          Your Interests. Your Arena.
        </p>

        <h5 className="mb-4 text-dark">Who are you?</h5>

        <div className="d-grid gap-3">
          <button
            className="btn fw-semibold py-2 rounded-pill"
            onClick={() => handleRoleSelect('admin')}
            style={{
              backgroundColor: '#7EC8E3',
              color: 'white',
              border: 'none',
            }}
          >
            I am an Admin
          </button>
          <button
            className="btn fw-semibold py-2 rounded-pill"
            onClick={() => handleRoleSelect('user')}
            style={{
              backgroundColor: '#C197D2',
              color: 'white',
              border: 'none',
            }}
          >
            I am a User
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionPage;
