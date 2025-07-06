import React, { useEffect, useState } from "react";
import axios from "axios";
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
const SettingProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // token stored after login

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseUrl}/userprofile/fetch/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.profile);
      } catch (err) {
        console.error("Error:", err);
        setError(
          err.response?.data?.error || "Something went wrong while fetching profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Age:</strong> {profile.age}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "400px",
  },
};

export default SettingProfile;
