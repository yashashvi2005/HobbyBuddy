import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import hobby1 from "../assets/video_kiphoto.jpg";
import hobby2 from "../assets/photooo.jpg";
import hobby3 from "../assets/event_workshop.avif";
import hobby4 from "../assets/ai.avif"
import NavbarPage from './Navbarpage';
import FooterPage from './FooterPage';
import { useNavigate } from 'react-router-dom';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
const ExplorePage = () => {
  const primary = '#a259ff';
  const secondary = '#ff66c4';
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Videos',
      description: 'Explore inspiring videos uploaded by hobby enthusiasts.',
      image: hobby1,
      buttonText: 'Watch Now',
      path: '/videos'
    },
    {
      title: 'Photos',
      description: 'Browse a gallery of photos related to different hobbies.',
      image: hobby2,
      buttonText: 'View Gallery',
      path: '/photos'
    },
    {
      title: 'Events',
      description: 'Find and attend hobby-related events near you and attend with your friends.',
      image: hobby3,
      buttonText: 'Explore Events',
      path: '/events'
    },
    {
      title: 'AI',
      description: 'Find answers to hobby-related questions with the help of AI.',
      image: hobby4,
      buttonText: 'Explore with AI',
      path: '/ask-ai'
    }
  ];

  return (
    <>
      <NavbarPage />
      <div style={{ backgroundColor: '#f9f4ff', minHeight: '100vh', fontFamily: 'Quicksand, sans-serif', paddingTop: '60px', paddingBottom: '60px' }}>
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ color: primary }}> Explore Content</h2>
          <Row className="g-4">
            {sections.map((section, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
                <Card
                  className="h-100 shadow-sm"
                  style={{
                    borderRadius: '20px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${primary}33`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={section.image}
                    alt={section.title}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '20px',
                      borderTopRightRadius: '20px'
                    }}
                  />
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title style={{ color: secondary, fontWeight: 'bold' }}>{section.title}</Card.Title>
                      <Card.Text className="text-muted">{section.description}</Card.Text>
                    </div>
                    <Button
                      style={{
                        backgroundColor: primary,
                        border: 'none',
                        borderRadius: '25px',
                        marginTop: '15px',
                        padding: '10px 20px',
                        fontWeight: '500'
                      }}
                      onClick={() => navigate(section.path)}
                    >
                      {section.buttonText}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <FooterPage />
      </div>
    </>
  );
};

export default ExplorePage;
