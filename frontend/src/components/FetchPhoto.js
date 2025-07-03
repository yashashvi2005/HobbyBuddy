import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import NavbarPage from "./Navbarpage";
import FooterPage from "./FooterPage";
import { useNavigate } from "react-router-dom";
import LikeCommentButtons from "./LikeCommentButton"; // ✅ Ensure it's updated too


const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/post/fetch-all-posts-names", {
        withCredentials: true // ✅ Important for cookie/token auth
      });

      const allPosts = response.data.posts || [];

      // ✅ Strictly filter only photo category + valid image extensions
      const onlyImages = allPosts.filter(
        (post) =>
          post.categoryName?.toLowerCase() === "photo" &&
          post.media &&
          (
            post.media.endsWith(".jpg") ||
            post.media.endsWith(".jpeg") ||
            post.media.endsWith(".png") ||
            post.media.includes("image")
          )
      );

      setPhotos(onlyImages);
    } catch (error) {
      console.error("Error fetching photos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const primary = "#a259ff";
  const background = "#f7f4ff";

  return (
    <>
      <NavbarPage />
      <div
        style={{
          backgroundColor: background,
          minHeight: "100vh",
          padding: "30px 0",
          fontFamily: "Quicksand, sans-serif"
        }}
      >
        <Container>
          {/* 🔙 Back Button */}
          <div className="mb-4">
            <Button
              variant="light"
              style={{
                color: primary,
                fontWeight: "bold",
                border: `1px solid ${primary}`,
                borderRadius: "30px",
                padding: "6px 20px",
                fontSize: "0.95rem"
              }}
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
          </div>

          {/* Header */}
          <h2 className="text-center fw-bold mb-4" style={{ color: primary }}>
            📸 Explore Photo Gallery
          </h2>

          {/* Loader or Content */}
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading photos, please wait...</p>
            </div>
          ) : photos.length === 0 ? (
            <p className="text-center text-muted mt-4">No photos found yet. Be the first one to upload!</p>
          ) : (
            <Row className="g-4">
              {photos.map((photo, index) => (
                <Col md={6} lg={4} key={index}>
                  <Card
                    className="shadow-sm h-100 border-0"
                    style={{
                      borderRadius: "15px",
                      transition: "transform 0.3s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <div
                      style={{
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        overflow: "hidden",
                        height: "220px"
                      }}
                    >
                      <img
                        src={`http://localhost:3000${photo.media.startsWith("/") ? photo.media : `/${photo.media}`}`}
                        alt={photo.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title style={{ color: primary }}>{photo.title}</Card.Title>
                      <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>
                        {photo.description}
                      </Card.Text>

                      {/* ❤️ Like & 💬 Comment Buttons */}
                      <LikeCommentButtons contentId={photo._id} />
                      
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
      <FooterPage />
    </>
  );
};

export default PhotoGallery;

