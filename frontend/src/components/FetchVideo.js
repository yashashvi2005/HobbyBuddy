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
const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/post/fetch-all-posts-names`, {
        withCredentials: true,
      });

      const allPosts = response.data.posts || [];

      const onlyVideos = allPosts.filter(
        (post) =>
          post.categoryName?.toLowerCase() === "video" &&
          post.media &&
          (
            post.media.endsWith(".mp4") ||
            post.media.endsWith(".mov") ||
            post.media.includes("video")
          )
      );

      setVideos(onlyVideos);
    } catch (error) {
      console.error("Error fetching videos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
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
               Back
            </Button>
          </div>

          <h2 className="text-center fw-bold mb-4" style={{ color: primary }}>
             Explore Video Gallery
          </h2>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading videos, please wait...</p>
            </div>
          ) : videos.length === 0 ? (
            <p className="text-center text-muted mt-4">No videos uploaded yet. Be the first to share!</p>
          ) : (
            <Row className="g-4">
              {videos.map((video, index) => (
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
                      <video
                        src={`http://localhost:3000${video.media.startsWith("/") ? video.media : `/${video.media}`}`}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title style={{ color: primary }}>{video.title}</Card.Title>
                      <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>
                        {video.description}
                      </Card.Text>

                      <LikeCommentButtons contentId={video._id} />
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

export default VideoGallery;
