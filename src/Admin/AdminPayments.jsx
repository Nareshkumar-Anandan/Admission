import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiCalendar, FiRefreshCcw, FiEye, FiCheckCircle, FiClock, FiCreditCard, FiFilter } from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { APPLICATION_API, PAYMENT_API } from "../config";

const AdminPayments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'descending' });
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${PAYMENT_API}/all-payments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPayments(res.data);
        } catch (err) {
            console.error("Failed to fetch payments", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleApproveEnrollment = async (userId) => {
        if (!window.confirm("Are you sure you want to approve this student's enrollment?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${APPLICATION_API}/approve-enrollment`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Enrollment Approved Successfully!");
            fetchPayments();
        } catch (err) {
            console.error("Approval failed", err);
            alert("Failed to approve enrollment.");
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedPayments = React.useMemo(() => {
        let items = [...payments];

        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            items = items.filter(p =>
                (p.full_name?.toLowerCase().includes(query)) ||
                (p.institution_name?.toLowerCase().includes(query)) ||
                (p.specialization?.toLowerCase().includes(query)) ||
                (p.payment_id?.toLowerCase().includes(query)) ||
                (p.app_id?.toLowerCase().includes(query))
            );
        }

        if (fromDate) {
            const from = new Date(fromDate);
            from.setHours(0, 0, 0, 0);
            items = items.filter(p => new Date(p.created_at) >= from);
        }
        if (toDate) {
            const to = new Date(toDate);
            to.setHours(23, 59, 59, 999);
            items = items.filter(p => new Date(p.created_at) <= to);
        }

        if (sortConfig.key) {
            items.sort((a, b) => {
                let valA = a[sortConfig.key] || "";
                let valB = b[sortConfig.key] || "";

                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [payments, sortConfig, searchTerm, fromDate, toDate]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return " ↕";
        return sortConfig.direction === 'ascending' ? " ↑" : " ↓";
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Transactions...</div>;

    return (
        <div className="admin-page-container">
            <div className="admin-card-container" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FiFilter style={{ color: '#6366f1', fontSize: '1.25rem' }} />
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Filter Payments</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={() => { setSearchTerm(""); setFromDate(""); setToDate(""); setSortConfig({ key: 'created_at', direction: 'descending' }); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#f1f5f9',
                                color: '#64748b',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            <FiRefreshCcw /> Reset
                        </button>
                        <button
                            onClick={fetchPayments}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#e0e7ff',
                                color: '#6366f1',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            <FiRefreshCcw /> Refresh
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Search</label>
                        <div style={{ position: 'relative' }}>
                            <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Txn ID, Name, College..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>From Date</label>
                        <div style={{ position: 'relative' }}>
                            <FiCalendar style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>To Date</label>
                        <div style={{ position: 'relative' }}>
                            <FiCalendar style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '0.875rem'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-card-container">
                <div style={{ overflowX: 'auto' }}>
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('app_id')} style={{ cursor: 'pointer' }}>App ID {getSortIcon('app_id')}</th>
                                <th onClick={() => handleSort('full_name')} style={{ cursor: 'pointer' }}>Name {getSortIcon('full_name')}</th>
                                <th onClick={() => handleSort('institution_name')} style={{ cursor: 'pointer' }}>Institution {getSortIcon('institution_name')}</th>
                                <th onClick={() => handleSort('specialization')} style={{ cursor: 'pointer' }}>Course {getSortIcon('specialization')}</th>
                                <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount {getSortIcon('amount')}</th>
                                <th onClick={() => handleSort('created_at')} style={{ cursor: 'pointer' }}>Date {getSortIcon('created_at')}</th>
                                <th style={{ textAlign: 'center' }}>Enrollment</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedPayments.length > 0 ? (
                                filteredAndSortedPayments.map((p, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span style={{ fontWeight: 700, color: '#6366f1' }}>{p.app_id}</span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{p.full_name}</div>
                                        </td>
                                        <td>{p.institution_name || "—"}</td>
                                        <td>
                                            <span style={{ padding: '0.25rem 0.75rem', background: '#f1f5f9', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                                                {p.specialization || "General"}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.amount.toLocaleString()}</div>
                                        </td>
                                        <td>{new Date(p.created_at).toLocaleDateString()}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className={`status-badge ${p.enrollment_status === 'ENROLLED' ? 'paid' : 'pending'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                {p.enrollment_status === 'ENROLLED' ? <FiCheckCircle /> : <FiClock />}
                                                {p.enrollment_status || 'Pending Review'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button
                                                    className="admin-btn-primary"
                                                    style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                                    onClick={() => navigate(`/admin/applications/${p.user_id}`)}
                                                >
                                                    <FiEye /> View
                                                </button>
                                                {p.enrollment_status !== 'ENROLLED' && (
                                                    <button
                                                        className="admin-btn-primary"
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            fontSize: '0.75rem',
                                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                                                        }}
                                                        onClick={() => handleApproveEnrollment(p.user_id)}
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>No matching transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPayments;
