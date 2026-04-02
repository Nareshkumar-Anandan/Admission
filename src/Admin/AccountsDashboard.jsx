import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FiCreditCard,
    FiTrendingUp,
    FiBarChart2,
    FiDollarSign,
    FiActivity,
    FiFilter,
    FiBriefcase
} from "react-icons/fi";
import "../Styles/AdminDashboard.css";
import "../Styles/AdminPanel.css";
import { ADMIN_API } from "../config";
import { institutionCourses } from "../Constants/courses";

const AccountsDashboard = () => {
    const userName = localStorage.getItem("userName") || "Accounts Admin";
    const institutionName = localStorage.getItem("institutionName");
    const [stats, setStats] = useState({
        totalAppFees: 0,
        totalTuitionFees: 0,
        combinedTotal: 0,
        institutionBreakdown: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedCollege, setSelectedCollege] = useState("");

    const isGlobal = institutionName === 'All Institutions';
    const institutions = Object.keys(institutionCourses);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const baseUrl = ADMIN_API.endsWith('/') ? ADMIN_API.slice(0, -1) : ADMIN_API;
            let url = `${baseUrl}/accounts-stats`;
            if (selectedCollege) {
                url += `?college=${encodeURIComponent(selectedCollege)}`;
            }
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (err) {
            console.error("Failed to fetch accounts stats", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [selectedCollege]);

    return (
        <div className="admin-page-container">
            <div className="dashboard-welcome-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Financial Overview</h2>
                    <p style={{ color: '#64748b', margin: '4px 0' }}>Welcome back, <span style={{ color: '#6366f1', fontWeight: 700 }}>{userName}</span>. Here's the collection report.</p>
                </div>

                {isGlobal && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                        <FiFilter color="#6366f1" />
                        <select
                            value={selectedCollege}
                            onChange={(e) => setSelectedCollege(e.target.value)}
                            style={{ border: 'none', outline: 'none', fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', background: 'transparent', cursor: 'pointer' }}
                        >
                            <option value="">All Institutions</option>
                            {institutions.map(inst => (
                                <option key={inst} value={inst}>{inst.split(' - ')[0]}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="stats-grid">
                <div className="modern-stat-card" style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '1.5rem' }}>
                        <FiDollarSign />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>App Fees Collected</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>₹{Number(stats.totalAppFees || 0).toLocaleString()}</div>
                    </div>
                </div>

                <div className="modern-stat-card" style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '1.5rem' }}>
                        <FiCreditCard />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tuition Fees Collected</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>₹{Number(stats.totalTuitionFees || 0).toLocaleString()}</div>
                    </div>
                </div>

                <div className="modern-stat-card" style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontSize: '1.5rem' }}>
                        <FiTrendingUp />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Amount</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>₹{Number(stats.combinedTotal || 0).toLocaleString()}</div>
                    </div>
                </div>
            </div>

            {isGlobal && !selectedCollege && stats.institutionBreakdown?.length > 0 && (
                <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '1.25rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <FiBriefcase size={24} color="#6366f1" />
                        <h3 style={{ margin: 0, color: '#1e293b' }}>Institution-wise Breakdown</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left' }}>Institution Name</th>
                                    <th style={{ textAlign: 'right' }}>Application Fees</th>
                                    <th style={{ textAlign: 'right' }}>Tuition Fees</th>
                                    <th style={{ textAlign: 'right' }}>Total Collection</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(stats.institutionBreakdown || []).map((item, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{item.institution}</td>
                                        <td style={{ textAlign: 'right', color: '#6366f1', fontWeight: 700 }}>₹{Number(item.appFees || 0).toLocaleString()}</td>
                                        <td style={{ textAlign: 'right', color: '#10b981', fontWeight: 700 }}>₹{Number(item.tuitionFees || 0).toLocaleString()}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 800, color: '#1e293b' }}>₹{Number(item.total || 0).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '1.25rem', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <FiActivity size={24} color="#6366f1" />
                    <h3 style={{ margin: 0, color: '#1e293b' }}>Status</h3>
                </div>
                <p style={{ color: '#64748b' }}>
                    {selectedCollege
                        ? `Viewing detailed collections for ${selectedCollege}.`
                        : "Collections are being tracked in real-time across all registered institutions."}
                </p>
            </div>
        </div>
    );
};

export default AccountsDashboard;
