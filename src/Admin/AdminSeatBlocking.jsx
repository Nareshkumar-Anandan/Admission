import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADMIN_API } from "../config";
import { institutionCourses } from "../Constants/courses";
import { FiLock, FiUnlock, FiSearch, FiAlertCircle } from "react-icons/fi";
import "../Styles/AdminPanel.css";

const AdminSeatBlocking = () => {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState("");
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [blockedCourses, setBlockedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const adminRole = localStorage.getItem("adminRole");
    const adminInst = localStorage.getItem("institutionName");

    // Load available institutions based on admin role
    useEffect(() => {
        const allInst = Object.keys(institutionCourses);
        if (adminRole === "institution_admin" && adminInst) {
            setInstitutions([adminInst]);
            setSelectedInstitution(adminInst);
        } else {
            setInstitutions(allInst);
            if (allInst.length > 0) setSelectedInstitution(allInst[0]);
        }
    }, [adminRole, adminInst]);

    // Load courses & blocked data when institution changes
    useEffect(() => {
        if (!selectedInstitution) return;
        setCourses(institutionCourses[selectedInstitution] || []);
        fetchBlockedCourses();
    }, [selectedInstitution]);

    const fetchBlockedCourses = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ADMIN_API}/blocked-courses`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Extract course names for the current institution
            const blocked = res.data
                .filter(b => b.institution === selectedInstitution)
                .map(b => b.course);
            setBlockedCourses(blocked);
        } catch (error) {
            console.error("Failed to fetch blocked courses", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleBlock = async (course, isBlocked) => {
        try {
            const token = localStorage.getItem("token");
            if (isBlocked) {
                // Unblock (it is currently blocked)
                await axios.post(
                    `${ADMIN_API}/unblock-course`,
                    { institution: selectedInstitution, course },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBlockedCourses(prev => prev.filter(c => c !== course));
            } else {
                // Block
                await axios.post(
                    `${ADMIN_API}/block-course`,
                    { institution: selectedInstitution, course },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBlockedCourses(prev => [...prev, course]);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Error updating course status");
            console.error(error);
        }
    };

    const filteredCourses = courses.filter(c =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="page-header">
                <div>
                    <h2>Seat Blocking Management</h2>
                    <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>
                        Block or unblock course admissions across institutions
                    </p>
                </div>
            </div>

            <div className="filters-section" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {adminRole !== "institution_admin" && (
                    <select
                        className="filter-select"
                        value={selectedInstitution}
                        onChange={(e) => setSelectedInstitution(e.target.value)}
                        style={{ flex: 1, minWidth: '300px' }}
                    >
                        {institutions.map(inst => (
                            <option key={inst} value={inst}>{inst}</option>
                        ))}
                    </select>
                )}

                <div className="search-bar" style={{ flex: 1, minWidth: '300px', display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px' }}>
                    <FiSearch style={{ color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: 'none', padding: '10px', width: '100%', outline: 'none' }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "40px" }}>Loading courses...</div>
            ) : (
                <div className="courses-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '16px'
                }}>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => {
                            const isBlocked = blockedCourses.includes(course);
                            return (
                                <div key={index} style={{
                                    background: isBlocked ? '#fef2f2' : 'white',
                                    border: `1px solid ${isBlocked ? '#fecaca' : '#e2e8f0'}`,
                                    borderRadius: '12px',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                }}>
                                    <h4 style={{ margin: 0, color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.4' }}>
                                        {course}
                                    </h4>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 'auto'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            color: isBlocked ? '#ef4444' : '#10b981'
                                        }}>
                                            {isBlocked ? <FiLock /> : <FiUnlock />}
                                            {isBlocked ? 'Admission Blocked' : 'Admission Open'}
                                        </div>

                                        <button
                                            onClick={() => toggleBlock(course, isBlocked)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: isBlocked ? '#fee2e2' : '#e0e7ff',
                                                color: isBlocked ? '#dc2626' : '#4f46e5',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            {isBlocked ? 'Unblock' : 'Block Seats'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px' }}>
                            <FiAlertCircle style={{ fontSize: '2rem', color: '#cbd5e1', marginBottom: '10px' }} />
                            <h3 style={{ color: '#475569', margin: 0 }}>No courses found</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '5px' }}>
                                Try adjusting your search term
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSeatBlocking;
