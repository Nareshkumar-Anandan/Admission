import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaBars } from "react-icons/fa";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Dashboard.css";
import hindusthanLogo from "../assets/Hindusthanwhite.png";
import hindusthanLogoBlack from "../assets/Hindusthan.svg";
import prospectus from "../assets/Documents/Admission-Brouchure-25-26 (1).pdf";
const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/application-forms":
        return "Application Form";
      case "/dashboard/my-payments":
        return "My Payments";
      case "/dashboard/my-queries":
        return "My Queries";
      case "/dashboard/prospectus":
        return "Prospectus";
      case "/dashboard/profile":
        return "My Profile";
      default:
        return "Dashboard";
    }
  };

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-section">
          <img src={hindusthanLogo} alt="Hindusthan Logo" />
        </div>

        <ul className="menu">
          <li>
            <NavLink to="/dashboard" end onClick={() => setIsSidebarOpen(false)}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/application-forms" onClick={() => setIsSidebarOpen(false)}>Application Form</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-payments" onClick={() => setIsSidebarOpen(false)}>My Payments</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-queries" onClick={() => setIsSidebarOpen(false)}>My Queries</NavLink>
          </li>
          <li>
            <a
              href={prospectus}   // put correct PDF path
              target="_blank"
              rel="noopener noreferrer"
              className="prospectus-link"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => setIsSidebarOpen(false)}
            >
              Prospectus <FaExternalLinkAlt />
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-left-section">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>

            <div className="mobile-branding">
              <img src={hindusthanLogoBlack} alt="Hindusthan" className="mobile-logo-img" />
              <div className="mobile-separator"></div>
            </div>
          </div>

          <div className="page-title-container">
            <h1>{getTitle()}</h1>
            <p className="welcome-text">
              Welcome <strong>{userName}</strong>
            </p>
          </div>

          <div className="header-actions" style={{ position: "relative" }}>
            <button className="help-btn">?</button>
            <div
              className="user-avatar"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: "pointer" }}
            >
              {getInitials(userName)}
            </div>

            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => {
                  setShowDropdown(false);
                  navigate("/dashboard/profile")
                }}>
                  Profile
                </div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
