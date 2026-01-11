import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FiUsers,
    FiFileText,
    FiCreditCard,
    FiSettings,
    FiPieChart,
    FiUserCheck,
    FiActivity,
    FiTrendingUp
} from "react-icons/fi";
import RealTimeMonitoring from "./RealTimeMonitoring";
import "../Styles/AdminDashboard.css";
import "../Styles/AdminPanel.css";
import { APPLICATION_API } from "../config";

const AdminDashboard = () => {
    const adminRole = localStorage.getItem("adminRole");
    const userName = localStorage.getItem("userName") || "Admin";

    const [stats, setStats] = useState({
        totalApps: 0,
        pendingReview: 0,
        totalPayments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${APPLICATION_API}/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Dashboard Portal...</div>;

    return (
        <div className="admin-page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Performance Overview</h2>
                    <p style={{ color: '#64748b', margin: '4px 0' }}>Welcome back, <span style={{ color: '#6366f1', fontWeight: 700 }}>{userName}</span>. Here's what's happening today.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ padding: '0.75rem 1.25rem', background: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiActivity style={{ color: '#6366f1' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Real-time Monitoring</span>
                    </div>
                </div>
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="modern-stat-card" style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '1.5rem' }}>
                        <FiFileText />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registrations</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>{stats.totalApps}</div>
                    </div>
                </div>

                <div className="modern-stat-card" style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', fontSize: '1.5rem' }}>
                        <FiTrendingUp />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Review</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>{stats.pendingReview}</div>
                    </div>
                </div>

                <div className="modern-stat-card" style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '1.5rem' }}>
                        <FiCreditCard />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Fee Revenue</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>₹{stats.totalPayments.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <RealTimeMonitoring />

            <div className="quick-actions-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <FiSettings style={{ color: '#6366f1', fontSize: '1.25rem' }} />
                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>Management Console</h3>
                </div>
                <div className="actions-grid">
                    <div className="action-card" style={{ cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => window.location.href = '/admin/students'}>
                        <FiUsers className="action-icon" />
                        <h4>Student Directory</h4>
                        <p>Access full profiles and academic histories.</p>
                    </div>

                    {adminRole === "super_admin" && (
                        <div className="action-card" style={{ cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => window.location.href = '/admin/admins'}>
                            <FiUserCheck className="action-icon" />
                            <h4>Staff Control</h4>
                            <p>Manage administrative roles and permissions.</p>
                        </div>
                    )}

                    <div className="action-card" style={{ cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => window.location.href = '/admin/reports'}>
                        <FiPieChart className="action-icon" />
                        <h4>Data Analytics</h4>
                        <p>Generate detailed admission performance insights.</p>
                    </div>

                    <div className="action-card" style={{ cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => window.location.href = '/admin/settings'}>
                        <FiSettings className="action-icon" />
                        <h4>Portal Preferences</h4>
                        <p>Configure global system settings and branding.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
