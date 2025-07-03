import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarPage from './Navbarpage';
import FooterPage from './FooterPage';
import axios from 'axios';

const UserProfileForm = () => {
  const primary = '#a259ff';
  const secondary = '#ff66c4';

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    city: '',
    hobbies: [],
    profilePhoto: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const hobbiesList = ['Singing', 'Dancing', 'Painting', 'Cooking', 'Photography', 'Art and Craft'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, hobbies: [...prev.hobbies, value] };
      } else {
        return { ...prev, hobbies: prev.hobbies.filter(hobby => hobby !== value) };
      }
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profilePhoto: null }));
    } else {
      setFormData(prev => ({ ...prev, profilePhoto: null }));
      setPhotoPreview(null);
      setErrors(prev => ({ ...prev, profilePhoto: 'Only image files are allowed (jpg, png).' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';
    const age = parseInt(formData.age);
    if (!age || age < 5 || age > 120) newErrors.age = 'Age must be between 5 and 120.';
    if (!formData.gender) newErrors.gender = 'Please select a gender.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (formData.hobbies.length === 0) newErrors.hobbies = 'Select at least one hobby.';
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Upload profile photo.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fix validation errors.");
    return;
  }

  const data = new FormData();
  data.append('name', formData.name.trim());
  data.append('age', formData.age);
  data.append('gender', formData.gender);
  data.append('city', formData.city);
  formData.hobbies.forEach(hobby => data.append('hobbies', hobby));
  data.append('media', formData.profilePhoto);

  try {
    const response = await axios.post('http://localhost:3000/userprofile/create', data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201 || response.status === 200) {
      setSubmitted(true);
      toast.success('Profile created!');
      localStorage.setItem("profileCreated", "true"); // ✅ Flag for Navbar
    }
  } catch (err) {
    console.error("❌ Error submitting profile:", err);
    toast.error(err.response?.data?.error || 'Something went wrong.');
  }
};


  return (
    <>
      {/* <NavbarPage /> */}
      <div style={{ backgroundColor: '#f9f4ff', minHeight: '100vh', fontFamily: 'Quicksand, sans-serif' }}>
        <Container className="py-5">
          <div className="mx-auto" style={{ maxWidth: '600px', backgroundColor: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
            <h4 className="text-center fw-bold mb-4" style={{ color: primary }}>
              Create Your Profile
            </h4>

            {submitted && (
              <Alert variant="success" className="text-center">
                Profile created successfully!
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  isInvalid={!!errors.age}
                />
                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  isInvalid={!!errors.profilePhoto}
                />
                <Form.Control.Feedback type="invalid">{errors.profilePhoto}</Form.Control.Feedback>

                {photoPreview && (
                  <div className="mt-3 text-center">
                    <Image src={photoPreview} roundedCircle width={100} height={100} alt="Preview" />
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Select Your Hobbies</Form.Label>
                <Row>
                  {hobbiesList.map((hobby, index) => (
                    <Col xs={6} md={4} key={index} className="mb-2">
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
                {errors.hobbies && <div className="text-danger mt-2">{errors.hobbies}</div>}
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: secondary,
                    border: 'none',
                    padding: '10px 30px',
                    borderRadius: '30px',
                    fontWeight: 'bold'
                  }}
                >
                  Create Profile
                </Button>
              </div>
            </Form>
          </div>
        </Container>
        {/* <FooterPage /> */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default UserProfileForm;
