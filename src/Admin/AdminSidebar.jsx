import React from "react";
import { NavLink } from "react-router-dom";
import {
    FiGrid,
    FiFileText,
    FiFolder,
    FiCreditCard,
    FiUsers,
    FiShield,
    FiBarChart2,
    FiSettings,
    FiUser,
    FiMessageSquare
} from "react-icons/fi";
import "../Styles/AdminPanel.css";
import logo from "../assets/HindusthanWhite.png";
const AdminSidebar = ({ isOpen, onClose }) => {
    const adminRole = localStorage.getItem("adminRole");
    const isSuperAdmin = adminRole === "super_admin";

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="logo-section">
                <img
                    src={logo}
                    alt="Hindusthan Logo"
                    className="sidebar-logo"
                />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', marginTop: '4px' }}>
                    ADMIN PORTAL
                </p>
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/admin" end onClick={onClose}>
                        <FiGrid className="nav-icon" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/students" onClick={onClose}>
                        <FiUsers className="nav-icon" /> Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/applications" onClick={onClose}>
                        <FiFileText className="nav-icon" /> Applications
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/documents" onClick={onClose}>
                        <FiFolder className="nav-icon" /> Documents
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/payments" onClick={onClose}>
                        <FiCreditCard className="nav-icon" /> Payments
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/seat-blocking" onClick={onClose}>
                        <FiShield className="nav-icon" /> Seat Blocking
                    </NavLink>
                </li>
                {isSuperAdmin && (
                    <li>
                        <NavLink to="/admin/admins" onClick={onClose}>
                            <FiShield className="nav-icon" /> Management
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to="/admin/reports" onClick={onClose}>
                        <FiBarChart2 className="nav-icon" /> Reports
                    </NavLink>
                </li>
                {isSuperAdmin && (
                    <>
                        <li>
                            <NavLink to="/admin/queries" onClick={onClose}>
                                <FiMessageSquare className="nav-icon" /> Queries
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/settings" onClick={onClose}>
                                <FiSettings className="nav-icon" /> Settings
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/admin/profile" onClick={onClose}>
                        <FiUser className="nav-icon" /> Profile
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default AdminSidebar;
