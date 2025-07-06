import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); 

      const res = await axios.post(`${baseUrl}/api/firebase-login`, {
        token,
      });

      console.log("Login success:", res.data);
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
