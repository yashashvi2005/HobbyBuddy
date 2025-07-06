import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import NavbarPage from "./Navbarpage";
import FooterPage from "./FooterPage";
import { useNavigate } from "react-router-dom";
import LikeCommentButtons from "./LikeCommentButton"; 
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
const EventGallery = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/post/fetch-all-posts-names`);
      const allPosts = res.data.posts || [];

      const onlyEvents = allPosts.filter(
        (post) =>
          post.categoryName?.toLowerCase() === "event" ||
          post.contentType?.toLowerCase() === "event"
      );

      setEvents(onlyEvents);
    } catch (err) {
      console.error("Error fetching events →", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const primary = "#a259ff";
  const background = "#f7f4ff";

  return (
    <>
      <NavbarPage />

      <div style={{ backgroundColor: background, minHeight: "100vh", padding: "30px 0", fontFamily: "Quicksand, sans-serif" }}>
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold" style={{ color: primary }}> Explore Events</h2>
            <Button
              variant="light"
              onClick={() => navigate(-1)}
              style={{
                color: primary,
                border: `1px solid ${primary}`,
                borderRadius: "30px",
                fontWeight: "bold",
                padding: "6px 20px"
              }}
            >
              ← Back
            </Button>
          </div>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p className="text-muted mt-2">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-muted">No events found.</p>
          ) : (
            <Row>
              {events.map((ev, idx) => {
                const mediaUrl = ev.media
                  ? `http://localhost:3000${ev.media.startsWith("/") ? ev.media : `/${ev.media}`}`
                  : null;

                return (
                  <Col md={6} lg={4} className="mb-4" key={idx}>
                    <Card
                      className="shadow-sm h-100 border-0"
                      style={{ transition: "transform 0.3s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                      
                      {mediaUrl ? (
                        mediaUrl.endsWith(".mp4") ? (
                          <video
                            controls
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px"
                            }}>
                            <source src={mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Card.Img
                            variant="top"
                            src={mediaUrl}
                            alt={ev.title}
                            style={{
                              height: "200px",
                              objectFit: "cover",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px"
                            }}
                          />
                        )
                      ) : null}

                      <Card.Body>
                        <Card.Title className="fw-semibold" style={{ color: primary }}>
                          {ev.title}
                        </Card.Title>
                        <Card.Text className="text-muted">{ev.description}</Card.Text>

                        <LikeCommentButtons contentId={ev._id} />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </div>

      <FooterPage />
    </>
  );
};

export default EventGallery;
