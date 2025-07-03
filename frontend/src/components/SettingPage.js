import React, { useState } from "react";
import { FaBars, FaImages, FaUserEdit, FaUser } from "react-icons/fa";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import NavbarPage from "./Navbarpage";
import FooterPage from "./FooterPage";
import SettingAllPost from "./SettingAllPost";
import UserProfileForm from "./UserProfileForm";
import UserProfileDetails from "./UserProfileDetails"; // ⬅️ new component

const SettingPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedPage, setSelectedPage] = useState("posts");

  const handleToggle = () => setShowSidebar(!showSidebar);

  const renderContent = () => {
    switch (selectedPage) {
      case "posts":
        return <SettingAllPost />;
      case "profile":
        return <UserProfileForm />;
      case "myProfile":
        return <UserProfileDetails />; // ⬅️ new render
      default:
        return <h4 className="text-secondary">Welcome</h4>;
    }
  };

  const getTitle = () => {
    switch (selectedPage) {
      case "posts":
        return "All Posts";
      case "profile":
        return "Create Profile";
      case "myProfile":
        return "My Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <>
      <NavbarPage />
      <div
        style={{
          backgroundColor: "#f9f4ff",
          minHeight: "100vh",
          fontFamily: "Quicksand, sans-serif",
        }}
      >
        <Container fluid>
          <Row className="m-0">
            {showSidebar && (
              <Col
                md={3}
                className="bg-white px-3 pt-4 shadow-sm"
                style={{
                  minHeight: "100vh",
                  borderRight: "1px solid #eee",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <h5
                  className="fw-bold mb-4 text-center"
                  style={{ color: "#a259ff" }}
                >
                  My Dashboard
                </h5>
                <ListGroup variant="flush">
                  <ListGroup.Item
                    action
                    onClick={() => setSelectedPage("posts")}
                    active={selectedPage === "posts"}
                    className="d-flex align-items-center gap-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaImages />
                    <span>All Posts</span>
                  </ListGroup.Item>

                  <ListGroup.Item
                    action
                    onClick={() => setSelectedPage("profile")}
                    active={selectedPage === "profile"}
                    className="d-flex align-items-center gap-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaUserEdit />
                    <span>Create Profile</span>
                  </ListGroup.Item>

                  {/* ➕ My Profile Option */}
                  <ListGroup.Item
                    action
                    onClick={() => setSelectedPage("myProfile")}
                    active={selectedPage === "myProfile"}
                    className="d-flex align-items-center gap-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaUser />
                    <span>My Profile</span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            )}

            <Col md={showSidebar ? 9 : 12} className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Button
                  variant="outline-dark"
                  onClick={handleToggle}
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                  title="Toggle Sidebar"
                >
                  <FaBars />
                </Button>
                <h5 className="m-0 fw-semibold text-primary">{getTitle()}</h5>
              </div>

              <div
                className="p-4 rounded bg-white shadow-sm"
                style={{ minHeight: "60vh", transition: "all 0.3s ease-in-out" }}
              >
                {renderContent()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterPage />
    </>
  );
};

export default SettingPage;
