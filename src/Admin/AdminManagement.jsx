import React, { useState, useEffect } from "react";
import { FiUserPlus, FiUsers, FiShield, FiCheckCircle, FiTrash2, FiX, FiLock, FiMail, FiUser, FiInfo } from "react-icons/fi";
import axios from "axios";
import "../Styles/AdminPanel.css";
import { ADMIN_API } from "../config";

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        role: "institution_admin",
        institution_name: ""
    });

    const institutions = [
        "HICAS - Hindusthan College of Arts and Science",
        "HISAC - Hindusthan College of Science and Commerce",
        "HICET - Hindusthan College of Engineering and Technology",
        "HICE - Hindiusthan College of Engineering",
        "HIT - Hindusthan Institute of Technology",
        "HSOA - Hindusthan School of Architecture",
        "HCE - Hindusthan College of Education",
        "HCHS - Hindusthan College of Health Science",
        "HCN - Hindusthan College of Nursing",
        "HPC - Hindusthan Polytechnic College"
    ];

    const currentAdminInstitution = localStorage.getItem("institutionName") || "All Institutions";

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ADMIN_API}/list`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAdmins(res.data);
        } catch (err) {
            console.error("Failed to fetch admins", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Reset institution if Super Admin is selected
            ...(name === "role" && value === "super_admin" ? { institution_name: "All Institutions" } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${ADMIN_API}/create`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Admin created successfully!");
            setShowModal(false);
            setFormData({
                full_name: "",
                email: "",
                password: "",
                role: "institution_admin",
                institution_name: ""
            });
            fetchAdmins();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to create admin");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id, email) => {
        if (email === "admin@hindusthan.net") {
            alert("Primary Super Admin cannot be deleted!");
            return;
        }

        if (window.confirm(`Are you sure you want to remove ${email}?`)) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${ADMIN_API}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchAdmins();
            } catch (err) {
                alert("Failed to delete admin");
            }
        }
    };

    return (
        <div className="admin-page-container">
            <div className="admin-card-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: '#e0e7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                            <FiUsers size={24} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>Staff Management</h3>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{currentAdminInstitution}</p>
                        </div>
                    </div>
                    <button
                        className="admin-btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '0.75rem' }}
                        onClick={() => setShowModal(true)}
                    >
                        <FiUserPlus /> Add Team Member
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Institution</th>
                                <th>Access Role</th>
                                <th style={{ textAlign: 'center' }}>Status</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading admins...</td>
                                </tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No admin staff found.</td>
                                </tr>
                            ) : admins.map(admin => (
                                <tr key={admin.id}>
                                    <td>
                                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{admin.full_name}</div>
                                    </td>
                                    <td>
                                        <span style={{ color: '#64748b', fontWeight: 500 }}>{admin.email}</span>
                                    </td>
                                    <td>
                                        <span style={{
                                            background: admin.institution_name === 'All Institutions' ? '#f0f9ff' : '#f8fafc',
                                            color: admin.institution_name === 'All Institutions' ? '#0369a1' : '#475569',
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}>
                                            {admin.institution_name}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: admin.role === 'super_admin' ? '#fef2f2' : '#f0fdf4',
                                            color: admin.role === 'super_admin' ? '#ef4444' : '#22c55e',
                                            padding: '0.35rem 0.85rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase'
                                        }}>
                                            <FiShield /> {admin.role.replace('_', ' ')}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`status-badge ${admin.is_active ? 'paid' : 'pending'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            {admin.is_active ? <FiCheckCircle /> : <FiInfo />}
                                            {admin.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {admin.email === 'admin@hindusthan.net' ? (
                                            <button className="status-badge" style={{ background: '#f1f5f9', color: '#94a3b8', border: 'none', cursor: 'not-allowed' }} disabled>
                                                <FiLock /> Locked
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleDelete(admin.id, admin.email)}
                                                style={{ padding: '8px', color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
                                                onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ADD ADMIN MODAL */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: 'white',
                        width: '100%',
                        maxWidth: '500px',
                        borderRadius: '1.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>Add New Team Member</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}>
                                <FiX size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <FiUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Enter full name"
                                        required
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.935rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <FiMail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="admin@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.935rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Temporary Password</label>
                                <div style={{ position: 'relative' }}>
                                    <FiLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.935rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Access Role</label>
                                    <select
                                        name="role"
                                        required
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}
                                    >
                                        <option value="institution_admin">Institution Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Institution</label>
                                    <select
                                        name="institution_name"
                                        required
                                        disabled={formData.role === 'super_admin'}
                                        value={formData.institution_name}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', background: formData.role === 'super_admin' ? '#f1f5f9' : 'white' }}
                                    >
                                        <option value="">Select Institution</option>
                                        {formData.role === 'super_admin' ? (
                                            <option value="All Institutions">All Institutions</option>
                                        ) : (
                                            institutions.map(inst => (
                                                <option key={inst} value={inst}>{inst.split(' - ')[0]}</option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: 'white', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="admin-btn-primary"
                                    style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                                >
                                    {isSubmitting ? "Creating..." : "Save Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManagement;
