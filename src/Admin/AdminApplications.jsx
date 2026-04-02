import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiCheckCircle, FiClock, FiFileText, FiSearch, FiCalendar, FiRefreshCcw, FiFilter, FiDownload } from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { APPLICATION_API, ADMIN_API } from "../config";
import { institutionCourses } from "../Constants/courses";

const AdminApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'descending' });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInstitution, setSelectedInstitution] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const institutions = Object.keys(institutionCourses);

    const availableCourses = selectedInstitution
        ? institutionCourses[selectedInstitution] || []
        : Array.from(new Set(Object.values(institutionCourses).flat())).sort();

    const fetchApplications = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedApplications = React.useMemo(() => {
        let items = [...applications];

        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            items = items.filter(app =>
                (app.full_name?.toLowerCase().includes(query)) ||
                (app.application_no?.toLowerCase().includes(query)) ||
                (app.email?.toLowerCase().includes(query)) ||
                (app.phone?.toLowerCase().includes(query))
            );
        }

        if (selectedInstitution) {
            // Check both full college name and potentially stored short name
            items = items.filter(app =>
                app.institution_name === selectedInstitution ||
                app.college_name === selectedInstitution.split(" - ")[0]
            );
        }

        if (selectedCourse) {
            items = items.filter(app => app.course_name === selectedCourse);
        }

        if (fromDate) {
            const from = new Date(fromDate);
            from.setHours(0, 0, 0, 0);
            items = items.filter(app => new Date(app.created_at) >= from);
        }
        if (toDate) {
            const to = new Date(toDate);
            to.setHours(23, 59, 59, 999);
            items = items.filter(app => new Date(app.created_at) <= to);
        }

        if (sortConfig.key) {
            items.sort((a, b) => {
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
        return items;
    }, [applications, sortConfig, searchTerm, selectedInstitution, selectedCourse, fromDate, toDate]);

    const handleExport = async () => {
        try {
            const token = localStorage.getItem("token");
            const params = new URLSearchParams();
            if (searchTerm) params.append("name", searchTerm);
            if (selectedInstitution) params.append("college", selectedInstitution);
            if (selectedCourse) params.append("course", selectedCourse);

            const response = await fetch(`${ADMIN_API}/csv/applications?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Applications_Report_${new Date().toLocaleDateString()}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("Failed to export details.");
            }
        } catch (error) {
            console.error("Export error:", error);
            alert("An error occurred during export.");
        }
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return " ↕";
        return sortConfig.direction === 'ascending' ? " ↑" : " ↓";
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Applications...</div>;

    return (
        <div className="admin-page-container">
            <div className="admin-card-container" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FiFilter style={{ color: '#6366f1', fontSize: '1.25rem' }} />
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Filter Applications</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={handleExport}
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
                            <FiDownload /> Export Excel
                        </button>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedInstitution("");
                                setSelectedCourse("");
                                setFromDate("");
                                setToDate("");
                                setSortConfig({ key: 'created_at', direction: 'descending' });
                            }}
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
                            onClick={fetchApplications}
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
                                placeholder="Search Name, App ID..."
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
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Institution</label>
                        <select
                            value={selectedInstitution}
                            onChange={(e) => setSelectedInstitution(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.875rem',
                                background: 'white'
                            }}
                        >
                            <option value="">All Institutions</option>
                            {institutions.map(inst => (
                                <option key={inst} value={inst}>{inst}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Course</label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.875rem',
                                background: 'white'
                            }}
                        >
                            <option value="">All Courses</option>
                            {selectedInstitution ? (
                                (institutionCourses[selectedInstitution] || []).map(course => (
                                    <option key={course} value={course}>{course}</option>
                                ))
                            ) : (
                                Object.entries(institutionCourses).map(([inst, courses]) => (
                                    <optgroup key={inst} label={inst}>
                                        {courses.map(course => (
                                            <option key={`${inst}-${course}`} value={course}>{course}</option>
                                        ))}
                                    </optgroup>
                                ))
                            )}
                        </select>
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
                            {filteredAndSortedApplications.length > 0 ? (
                                filteredAndSortedApplications.map((app) => (
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
