import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiCheckCircle, FiClock, FiAlertCircle, FiFileText } from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { APPLICATION_API } from "../config";

const AdminApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'descending' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${APPLICATION_API}/all-applications`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(res.data);
            } catch (err) {
                console.error("Failed to fetch applications", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedApplications = React.useMemo(() => {
        let sortableItems = [...applications];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                let valA = a[sortConfig.key] || "";
                let valB = b[sortConfig.key] || "";

                if (['tenth_percentage', 'twelfth_percentage'].includes(sortConfig.key)) {
                    valA = parseFloat(valA) || 0;
                    valB = parseFloat(valB) || 0;
                }

                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [applications, sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return " ↕";
        return sortConfig.direction === 'ascending' ? " ↑" : " ↓";
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Applications...</div>;

    return (
        <div className="admin-page-container">
            <div className="admin-card-container">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                    <FiFileText style={{ color: '#6366f1', fontSize: '1.5rem' }} />
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Student Applications</h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('application_no')} style={{ cursor: 'pointer' }}>App ID {getSortIcon('application_no')}</th>
                                <th onClick={() => handleSort('full_name')} style={{ cursor: 'pointer' }}>Name {getSortIcon('full_name')}</th>
                                <th onClick={() => handleSort('course_name')} style={{ cursor: 'pointer' }}>Course {getSortIcon('course_name')}</th>
                                <th onClick={() => handleSort('created_at')} style={{ cursor: 'pointer' }}>Date {getSortIcon('created_at')}</th>
                                <th onClick={() => handleSort('tenth_percentage')} style={{ cursor: 'pointer' }}>10th % {getSortIcon('tenth_percentage')}</th>
                                <th style={{ textAlign: 'center' }}>Status</th>
                                <th style={{ textAlign: 'center' }}>Payment</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedApplications.length > 0 ? (
                                sortedApplications.map((app) => (
                                    <tr key={app.id}>
                                        <td>
                                            <span style={{ fontWeight: 700, color: '#6366f1' }}>{app.application_no}</span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{app.full_name}</div>
                                        </td>
                                        <td>
                                            <span style={{ color: '#64748b' }}>{app.course_name || "N/A"}</span>
                                        </td>
                                        <td>{new Date(app.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <span style={{ fontWeight: 600, color: '#475569' }}>{app.tenth_percentage ? `${app.tenth_percentage}` : "-"}</span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {app.declaration_completed ? (
                                                <span className="status-badge paid" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <FiCheckCircle /> Submitted
                                                </span>
                                            ) : (
                                                <span className="status-badge pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <FiClock /> Draft
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className={`status-badge ${app.payment_status === 'PAID' ? 'paid' : (app.payment_status === 'FAILED' ? 'failed' : 'pending')}`}>
                                                {app.payment_status || "PENDING"}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className="admin-btn-primary"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                                onClick={() => navigate(`/admin/applications/${app.user_id}`)}
                                            >
                                                <FiEye /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>No applications found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;
