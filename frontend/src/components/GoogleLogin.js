// src/components/GoogleLoginButton.js
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); // ✅ Firebase token

      // ✅ Send token to backend for verification
      const res = await axios.post("http://localhost:5000/api/firebase-login", {
        token,
      });

      console.log("Login success:", res.data);
      // Store user in localStorage / context if needed
    } catch (error) {
      console.error("Google Sign-In failed", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
