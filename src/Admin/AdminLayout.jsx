import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../Styles/AdminPanel.css"; // Global Youthful Design System

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState("Admin");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        const adminRole = localStorage.getItem("adminRole");
        const name = localStorage.getItem("userName");

        // Check if user is an admin (either super_admin or institution_admin)
        if (!token || (role !== "super_admin" && role !== "institution_admin")) {
            navigate("/admin/login", { replace: true });
        } else {
            if (name) setUserName(name);

            // Redirect institution_admin away from management page
            if (adminRole === "institution_admin" && location.pathname === "/admin/admins") {
                navigate("/admin", { replace: true });
            }
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("institutionName");
        localStorage.removeItem("userPhone");
        navigate("/admin/login");
    };

    const getTitle = () => {
        switch (location.pathname) {
            case "/admin":
                return "Dashboard";
            case "/admin/applications":
                return "Applications";
            case "/admin/documents":
                return "Documents";
            case "/admin/payments":
                return "Payments";
            case "/admin/students":
                return "Student Directory";
            case "/admin/profile":
                return "My Profile";
            default:
                return "Admin Portal";
        }
    };

    return (
        <div className="dashboard-layout">
            <AdminSidebar />

            <main className="dashboard-content">
                <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>{getTitle()}</h1>
                        <p style={{ color: '#64748b', fontWeight: 500 }}>
                            How's your day, <span style={{ color: '#6366f1' }}>{userName}</span>?
                        </p>
                    </div>

                    <div className="header-actions" style={{ position: "relative", display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div
                            className="user-avatar"
                            onClick={() => setShowDropdown(!showDropdown)}
                            style={{
                                cursor: "pointer",
                                background: "var(--admin-accent-gradient)",
                                width: '45px',
                                height: '45px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                            }}
                        >
                            AD
                        </div>

                        {showDropdown && (
                            <div className="profile-dropdown" style={{
                                position: 'absolute',
                                top: '60px',
                                right: 0,
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-lg)',
                                border: '1px solid #f1f5f9',
                                width: '180px',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                <div
                                    className="dropdown-item"
                                    onClick={() => { setShowDropdown(false); navigate("/admin/profile"); }}
                                    style={{ padding: '12px 16px', cursor: 'pointer', transition: 'background 0.2s' }}
                                >
                                    My Profile
                                </div>
                                <div
                                    className="dropdown-item logout"
                                    onClick={handleLogout}
                                    style={{ padding: '12px 16px', cursor: 'pointer', color: 'var(--admin-danger)', borderTop: '1px solid #f1f5f9' }}
                                >
                                    Sign Out
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="page-main-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
