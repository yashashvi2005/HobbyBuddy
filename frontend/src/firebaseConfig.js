import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBOGXTb1-uBmbiRxhO5zZvS0GRsp_6cKJg",
  authDomain: "hobby-buddy-902fa.firebaseapp.com",
  projectId: "hobby-buddy-902fa",
  storageBucket: "hobby-buddy-902fa.firebasestorage.app",
  messagingSenderId: "969618731914",
  appId: "1:969618731914:web:a47ff3a04b65c30eea4e73",
  measurementId: "G-44WZY6FQNW",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Setup Google Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
