import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiLogOut, FiBell, FiSearch, FiUser } from "react-icons/fi";
import AccountsSidebar from "./AccountsSidebar";
import "../Styles/AdminPanel.css";

const AccountsLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userName = localStorage.getItem("userName") || "Accounts Admin";

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");

        // Allowed roles for this layout
        const allowedRoles = ["super_admin", "accounts_admin"];

        if (!token || !allowedRoles.includes(role)) {
            navigate("/admin/login", { replace: true });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/admin/login");
    };

    const getTitle = () => {
        const path = location.pathname;
        if (path === "/accounts-admin") return "Financial Dashboard";
        if (path.includes("/payments")) return "Transaction History";
        if (path.includes("/reports")) return "Financial Reports";
        if (path.includes("/settings")) return "Account Settings";
        if (path.includes("/profile")) return "Admin Profile";
        return "Accounts Portal";
    };

    return (
        <div className="dashboard-layout">
            <div
                className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <AccountsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div className="header-left-section" style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            className="sidebar-toggle"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'block' }}
                        >
                            <FiMenu />
                        </button>
                    </div>

                    <div className="page-title-container">
                        <h1>{getTitle()}</h1>
                        <p style={{ color: '#64748b', fontWeight: 500 }}>
                            Welcome back, <span style={{ color: '#6366f1' }}>{userName}</span>
                        </p>
                    </div>

                    <div className="header-actions">
                        <div className="admin-user-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '1rem', border: '1px solid #f1f5f9' }}>
                            <div className="user-avatar" style={{ background: 'var(--admin-accent-gradient)', width: '35px', height: '35px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <FiUser />
                            </div>
                            <div className="user-text">
                                <span className="user-name" style={{ color: '#1e293b', fontWeight: 600, fontSize: '0.85rem' }}>{userName}</span>
                                <span className="user-role" style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block' }}>Accounts</span>
                            </div>
                        </div>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                            title="Sign Out"
                            style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                            <FiLogOut />
                        </button>
                    </div>
                </header>

                <div className="page-main-area" style={{ marginTop: '2rem' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AccountsLayout;
