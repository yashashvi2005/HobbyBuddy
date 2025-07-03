import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarPage from './Navbarpage.js';
import FooterPage from './FooterPage.js';
import owner from '../assets/owner.jpg';
import hobby1 from '../assets/art_craft.avif';
import hobby2 from '../assets/music.jpg';
import hobby3 from '../assets/dance1.jpg';
import hobby4 from '../assets/photography.jpg';
import hobby5 from '../assets/cookig.avif';
import hobby6 from '../assets/paint1.avif';

function DashboardPage() {
  const primary = '#a259ff';
  const secondary = '#ff66c4';

  const hobbies = [
    { image: hobby1, name: 'ART & CRAFT' },
    { image: hobby2, name: 'MUSIC' },
    { image: hobby3, name: 'DANCE' },
    { image: hobby4, name: 'PHOTOGRAPHY' },
    { image: hobby5, name: 'COOKING' },
    { image: hobby6, name: 'PAINTING' }
  ];

  return (
    <>
      <NavbarPage />

      {/* 🎥 Hero Video Section */}
      {/* <div style={{ position: 'relative', height: '640px', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }}
          src="/dashboard.mp4"
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            padding: '0 20px'
          }}
        >
          <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>Welcome to Hobby Buddy</h1>
          <p style={{ fontSize: '1.3rem', marginTop: '10px' }}>Your Interests, Your Arena 🎯</p>
        </div>
      </div> */}

      {/* 📖 About Us Section */}
      <div style={{ backgroundColor: '#f9f4ff' }}>
        <Container className="py-5 mt-4">
          <h3 className="text-center fw-bold mb-5" style={{ color: primary }}>About Us</h3>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0 text-center text-md-start">
              <h2 className="fw-bold mb-3">
                Welcome to <span style={{ color: secondary }}>Hobby Buddy</span>
              </h2>
              <p className="lead text-muted">
                A space where your passions come alive. Connect, challenge, and grow with fellow hobbyists.
                Whether you're an artist, coder, gamer, or a curious soul — there's something here for everyone.
              </p>
            </Col>
            <Col md={6}>
              <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                <img
                  src={owner}
                  alt="Founder"
                  className="rounded-circle shadow-lg border border-3"
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: 'cover',
                    borderColor: secondary,
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div>
                  <h4 className="fw-semibold mb-1">Yashashvi Jain</h4>
                  <p className="fw-medium mb-2" style={{ color: primary }}>
                    Founder, Hobby Buddy
                  </p>
                  <p className="text-muted mb-0" style={{ maxWidth: 400 }}>
                    I built this platform with the dream of uniting hobby lovers under one roof.
                    Here, you can showcase your talents, challenge your skills, and grow with a like-minded community.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 🎨 Hobbies Section */}
      <Container className="my-5 py-4 px-3 rounded" style={{ backgroundColor: '#f0e6ff' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">We Have These <span style={{ color: secondary }}>Hobbies</span></h3>
          <p className="text-muted">Tap into your passion and join communities that spark your interest.</p>
        </div>
        <Row className="justify-content-center text-center">
          {hobbies.map((hobby, i) => (
            <Col xs={6} sm={4} md={3} lg={2} className="mb-4" key={i}>
              <div
                className="shadow-sm p-2 rounded-circle bg-white mx-auto"
                style={{
                  width: 160,
                  height: 160,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = `0 4px 20px ${primary}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={hobby.image}
                  alt={hobby.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '50%'  }}
                />
              </div>
              <h6 className="mt-3 fw-semibold" style={{ color: primary }}>{hobby.name}</h6>
            </Col>
          ))}
        </Row>
      </Container>

      <FooterPage />
    </>
  );
}

export default DashboardPage;
