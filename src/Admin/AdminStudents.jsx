import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiCalendar, FiRefreshCcw, FiEye, FiFilter } from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { USER_API } from "../config";

const AdminStudents = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'descending' });
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(USER_API, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setStudents(data.users);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedStudents = React.useMemo(() => {
        let items = [...students];

        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            items = items.filter(s =>
                (s.full_name?.toLowerCase().includes(query)) ||
                (s.institution_name?.toLowerCase().includes(query)) ||
                (s.specialization?.toLowerCase().includes(query)) ||
                (s.email?.toLowerCase().includes(query))
            );
        }

        if (fromDate) {
            const from = new Date(fromDate);
            from.setHours(0, 0, 0, 0);
            items = items.filter(s => new Date(s.created_at) >= from);
        }
        if (toDate) {
            const to = new Date(toDate);
            to.setHours(23, 59, 59, 999);
            items = items.filter(s => new Date(s.created_at) <= to);
        }

        if (sortConfig.key) {
            items.sort((a, b) => {
                let valA = a[sortConfig.key] || "";
                let valB = b[sortConfig.key] || "";

                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return items;
    }, [students, sortConfig, searchTerm, fromDate, toDate]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return " ↕";
        return sortConfig.direction === 'ascending' ? " ↑" : " ↓";
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Student Directory...</div>;

    return (
        <div className="admin-page-container">
            <div className="admin-card-container" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FiFilter style={{ color: '#6366f1', fontSize: '1.25rem' }} />
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Filter Students</h3>
                    </div>
                    <button
                        onClick={() => { setSearchTerm(""); setFromDate(""); setToDate(""); setSortConfig({ key: 'created_at', direction: 'descending' }); }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#fee2e2',
                            color: '#ef4444',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <FiRefreshCcw /> Reset
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Search</label>
                        <div style={{ position: 'relative' }}>
                            <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Name, Institution..."
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
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID {getSortIcon('id')}</th>
                                <th onClick={() => handleSort('full_name')} style={{ cursor: 'pointer' }}>Name {getSortIcon('full_name')}</th>
                                <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>Email {getSortIcon('email')}</th>
                                <th onClick={() => handleSort('phone')} style={{ cursor: 'pointer' }}>Phone {getSortIcon('phone')}</th>
                                <th onClick={() => handleSort('specialization')} style={{ cursor: 'pointer' }}>Course {getSortIcon('specialization')}</th>
                                <th onClick={() => handleSort('institution_name')} style={{ cursor: 'pointer' }}>Institution {getSortIcon('institution_name')}</th>
                                <th onClick={() => handleSort('created_at')} style={{ cursor: 'pointer' }}>Date {getSortIcon('created_at')}</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>
                                        <span style={{ fontWeight: 700, color: '#6366f1' }}>#{student.id}</span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{student.full_name}</div>
                                    </td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            background: '#f1f5f9',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: '#475569'
                                        }}>
                                            {student.specialization || "General"}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{student.institution_name || "—"}</span>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                            {new Date(student.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            className="admin-btn-primary"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                            onClick={() => navigate(`/admin/applications/${student.id}`)}
                                        >
                                            <FiEye /> View Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredAndSortedStudents.length === 0 && (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center", padding: '80px', color: '#94a3b8' }}>
                                        No students found matching the criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminStudents;
