import { Navbar, Nav, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import logo from '../assets/hobbybuddy_logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;


function NavbarPage() {
  const primary = '#a259ff';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${baseUrl}/user/check-auth`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const res = await fetch(`${baseUrl}/user/sign-out`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Logout successful ");
        setIsLoggedIn(false); 
      } else {
        toast.error("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong ");
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{ backgroundColor: primary, fontFamily: 'Quicksand, sans-serif' }}
        className="navbar-dark shadow-sm"
      >
        <Container>
          <Navbar.Brand href="/" className="text-white fw-bold d-flex align-items-center">
            <img src={logo} alt="logo" width="40" className="me-2" />
            Hobby Buddy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              {!isLoggedIn ? (
                <>
                  <Nav.Link href="/sign-in" className="text-white">Sign In</Nav.Link>
                  <Nav.Link href="/sign-up" className="text-white">Sign Up</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleLogout} className="text-white">Sign Out</Nav.Link>
              )}

              <Nav.Link href="/leaderboard" className="text-white">Leaderboard</Nav.Link>
              <Nav.Link href="/challenge" className="text-white">Challenge</Nav.Link>
              <Nav.Link href="/explore" className="text-white">Explore</Nav.Link>
              <Nav.Link href="/upload-content" className="text-white">Upload Content</Nav.Link>
              <Nav.Link href="/add-friends" className="text-white">Add Friends</Nav.Link>
              <Nav.Link href="/history" className="text-white"> <FaUserCircle /></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default NavbarPage;

