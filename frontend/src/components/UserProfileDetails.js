import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Card, Row, Col, Alert, Button, Form } from "react-bootstrap";
import config from '../Config';

const baseUrl = config.BASE_URL;

const UserProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    hobbies: [],
    profilePhoto: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const hobbiesList = ["Singing", "Dancing", "Painting", "Cooking", "Photography", "Art and Craft"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseUrl}/userprofile/fetch/me`, {
          withCredentials: true,
        });

        const profile = response.data.profile;
        setProfile(profile);
        setUserDetails(response.data.userDetails);

        setFormData({
          name: profile.name || "",
          age: profile.age || "",
          gender: profile.gender || "",
          city: profile.city || "",
          hobbies: profile.hobbies || [],
          profilePhoto: null,
        });

        setPhotoPreview(`${baseUrl}${profile.profilepicture}`);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${baseUrl}/userprofile/delete`, {
        withCredentials: true,
      });

      setSuccess(response.data.message);
      setProfile(null);
      setUserDetails(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting profile. Please try again.");
    }
  };

  const handleEditToggle = () => {
    setError("");
    setSuccess("");
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const hobbies = checked
        ? [...prev.hobbies, value]
        : prev.hobbies.filter((hobby) => hobby !== value);
      return { ...prev, hobbies };
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePhoto: file }));
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("city", formData.city);
    data.append("hobbies", JSON.stringify(formData.hobbies));

    if (formData.profilePhoto) {
      data.append("media", formData.profilePhoto);
    }

    try {
      const response = await axios.put(`${baseUrl}/userprofile/update/me`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Profile updated successfully!");
      setEditMode(false);
      setProfile(response.data.updatedUser);
      setPhotoPreview(`${baseUrl}${response.data.updatedUser.profilepicture}`);
    } catch (err) {
      setError(err.response?.data?.error || "Error updating profile.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (success) {
    return <Alert variant="success">{success}</Alert>;
  }

  if (!profile || !userDetails) {
    return <Alert variant="warning">No profile data found.</Alert>;
  }

  const profileImageUrl = photoPreview || "/default-user.png";

  return (
    <Card className="shadow-sm p-4">
      <Row>
        <Col md={4} className="text-center mb-3">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <h4 className="fw-bold mb-3 text-primary">{profile.name}</h4>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Hobbies:</strong> {profile.hobbies?.join(", ")}</p>

          <div className="mt-4 d-flex gap-2">
            <Button variant="outline-primary" onClick={handleEditToggle}>
              {editMode ? "Cancel Edit" : "Edit Profile"}
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete Profile
            </Button>
          </div>
        </Col>
      </Row>

      {editMode && (
        <Form className="mt-5" onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" value={formData.city} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Select Hobbies</Form.Label>
            <Row>
              {hobbiesList.map((hobby, index) => (
                <Col xs={6} md={4} key={index}>
                  <Form.Check
                    type="checkbox"
                    label={hobby}
                    value={hobby}
                    onChange={handleCheckboxChange}
                    checked={formData.hobbies.includes(hobby)}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="success">Update Profile</Button>
          </div>
        </Form>
      )}
    </Card>
  );
};

export default UserProfileDetails;
