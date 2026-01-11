import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Dashboard.css";
import hindusthanLogo from "../assets/Hindusthanwhite.png";
import prospectus from "../assets/Documents/Admission-Brouchure-25-26 (1).pdf";
const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

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
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src={hindusthanLogo} alt="Hindusthan Logo" />
        </div>

        <ul className="menu">
          <li>
            <NavLink to="/dashboard" end>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/application-forms">Application Form</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-payments">My Payments</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-queries">My Queries</NavLink>
          </li>
          <li>
            <a
              href={prospectus}   // put correct PDF path
              target="_blank"
              rel="noopener noreferrer"
              className="prospectus-link"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              Prospectus <FaExternalLinkAlt />
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>{getTitle()}</h1>
            <p>
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
