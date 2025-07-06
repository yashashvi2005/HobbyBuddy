import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
const AdminProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/admin/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.role === "admin") {
          setIsAdmin(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (!isAdmin) return <Navigate to="/sign-in" />;
  return children;
};

export default AdminProtectedRoute;