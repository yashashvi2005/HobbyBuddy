import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import NavbarPage from "./Navbarpage";
import FooterPage from "./FooterPage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import config from '../Config';

const baseUrl = config.BASE_URL;

const AddPost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    categoryName: "",
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const primary = "#a259ff";
  const background = "#f7f4ff";

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
    setFileName(file?.name || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, categoryName } = post;

    if (!title || !description || !categoryName || !mediaFile) {
      toast.warn("❗ Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryName", categoryName);
    formData.append("media", mediaFile);

    try {
      const token = document.cookie.split("token=")[1];

      await axios.post(`${baseUrl}/post/add-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success(" Post created successfully!");

      setPost({
        title: "",
        description: "",
        categoryName: "",
      });
      setMediaFile(null);
      setFileName("");
      document.getElementById("mediaInput").value = "";
    } catch (error) {
      toast.error( + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <>
      <NavbarPage />
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div style={{ backgroundColor: background, minHeight: "100vh", padding: "30px 0" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="p-4 shadow-lg rounded-4 border-0">
                <h3 className="mb-4 text-center fw-bold" style={{ color: primary }}>
                  Add New Post
                </h3>

                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      name="title"
                      value={post.title}
                      onChange={handleChange}
                      required
                      className="p-2 rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      name="description"
                      value={post.description}
                      onChange={handleChange}
                      required
                      className="p-2 rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Select
                      name="categoryName"
                      value={post.categoryName}
                      onChange={handleChange}
                      required
                      className="p-2 rounded-3"
                    >
                      <option value="">Select category</option>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                      <option value="Event">Events</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Upload Media</Form.Label>
                    <Form.Control
                      id="mediaInput"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      required
                      className="p-2 rounded-3"
                    />
                    {fileName && (
                      <Form.Text className="text-muted">
                        Selected: {fileName}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 fw-bold py-2 rounded-pill"
                    style={{ backgroundColor: primary, border: "none" }}
                  >
                    Add Post
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <FooterPage />
    </>
  );
};

export default AddPost;
