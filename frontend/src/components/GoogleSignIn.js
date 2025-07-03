import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch("http://localhost:3000/user/google-login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // important for cookie to be saved
  body: JSON.stringify({
    email: user.email,
    name: user.displayName,
  }),
});

      const data = await response.json();
      if (data.message === "Google Sign-in Success") {
        alert("✅ Login Successful");
        navigate("/dashboard"); // yahan apna actual home page route set karo
      } else {
        alert("❌ Login Failed");
      }
    } catch (err) {
      console.error("Google Sign-in Error:", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: "10px 20px" }}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
