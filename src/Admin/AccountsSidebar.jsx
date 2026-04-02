import React from "react";
import { NavLink } from "react-router-dom";
import {
    FiGrid,
    FiCreditCard,
    FiBarChart2,
    FiUser,
    FiSettings
} from "react-icons/fi";
import "../Styles/AdminPanel.css";
import logo from "../assets/HindusthanWhite.png";

const AccountsSidebar = ({ isOpen, onClose }) => {
    const institutionName = localStorage.getItem("institutionName") || "All Institutions";

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="logo-section">
                <img
                    src={logo}
                    alt="Hindusthan Logo"
                    className="sidebar-logo"
                />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '2px', marginTop: '4px', textAlign: 'center' }}>
                    ACCOUNTS PORTAL
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', fontWeight: 500, marginTop: '2px', textAlign: 'center' }}>
                    {(institutionName || "All Institutions").split(' - ')[0]}
                </p>
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/accounts-admin" end onClick={onClose}>
                        <FiGrid className="nav-icon" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/accounts-admin/payments" onClick={onClose}>
                        <FiCreditCard className="nav-icon" /> Payments
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/accounts-admin/reports" onClick={onClose}>
                        <FiBarChart2 className="nav-icon" /> Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/accounts-admin/settings" onClick={onClose}>
                        <FiSettings className="nav-icon" /> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/accounts-admin/profile" onClick={onClose}>
                        <FiUser className="nav-icon" /> Profile
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default AccountsSidebar;
