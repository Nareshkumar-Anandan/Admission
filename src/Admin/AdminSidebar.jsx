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
    FiUser
} from "react-icons/fi";
import "../Styles/AdminPanel.css";

const AdminSidebar = () => {
    const adminRole = localStorage.getItem("adminRole");
    const isSuperAdmin = adminRole === "super_admin";

    return (
        <aside className="sidebar">
            <div className="logo-section">
                <img
                    src="/assets/images/logo.webp"
                    alt="Hindusthan Logo"
                    className="sidebar-logo"
                />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', marginTop: '4px' }}>
                    ADMIN PORTAL
                </p>
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/admin" end>
                        <FiGrid className="nav-icon" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/applications">
                        <FiFileText className="nav-icon" /> Applications
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/documents">
                        <FiFolder className="nav-icon" /> Documents
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/payments">
                        <FiCreditCard className="nav-icon" /> Payments
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/students">
                        <FiUsers className="nav-icon" /> Students
                    </NavLink>
                </li>
                {isSuperAdmin && (
                    <li>
                        <NavLink to="/admin/admins">
                            <FiShield className="nav-icon" /> Management
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to="/admin/reports">
                        <FiBarChart2 className="nav-icon" /> Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/settings">
                        <FiSettings className="nav-icon" /> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/profile">
                        <FiUser className="nav-icon" /> Profile
                    </NavLink>
                </li>
            </ul>

            <div style={{ marginTop: 'auto', padding: '2rem 1.25rem' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>v2.0 Beta</p>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Youthful Edition</p>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
