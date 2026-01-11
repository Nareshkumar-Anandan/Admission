import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FiArrowLeft,
    FiUser,
    FiUsers,
    FiMapPin,
    FiBookOpen,
    FiFile,
    FiDownload,
    FiCheckCircle,
    FiClock,
    FiPrinter,
    FiX
} from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import ApplicationPDF from '../Components/Application/ApplicationPDF';
import { APPLICATION_API, UPLOADS_URL } from "../config";

const AdminApplicationDetail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPdfPreview, setShowPdfPreview] = useState(false);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Application_${userId || 'Form'}`,
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${APPLICATION_API}/admin/details/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
            } catch (err) {
                console.error("Failed to fetch application details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [userId]);

    const renderFileCard = (label, filename) => {
        if (!filename) return null;
        return (
            <div style={{
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: '1rem',
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.5rem', background: 'white', borderRadius: '0.5rem', color: '#6366f1' }}>
                        <FiFile />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{label}</span>
                </div>
                <a
                    href={`${UPLOADS_URL}/${filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#6366f1',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: 'white',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <FiDownload /> VIEW
                </a>
            </div>
        );
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading Application Details...</div>;
    if (!data) return <div style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}>Application not found.</div>;

    return (
        <div className="admin-page-container">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0.75rem 1.25rem",
                        background: "white",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                >
                    <FiArrowLeft /> Back to List
                </button>

                <button
                    onClick={() => setShowPdfPreview(true)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0.75rem 1.25rem",
                        background: "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        fontWeight: 600,
                        boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.2)",
                        transition: 'all 0.2s'
                    }}
                >
                    <FiPrinter /> Print Application PDF
                </button>

                {/* PDF Preview Modal */}
                {showPdfPreview && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '1rem',
                            width: '95%',
                            maxWidth: '1000px',
                            height: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}>
                            {/* Modal Header */}
                            <div style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid #e2e8f0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Application PDF Preview</h3>
                                <button
                                    onClick={() => setShowPdfPreview(false)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#64748b',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '1.25rem'
                                    }}
                                >
                                    <FiX />
                                </button>
                            </div>

                            {/* Modal Body - Scrollable PDF */}
                            <div style={{
                                flex: 1,
                                overflow: 'auto',
                                padding: '2rem',
                                background: '#f1f5f9',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <div ref={componentRef} style={{ background: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                    <ApplicationPDF data={data} />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div style={{
                                padding: '1.5rem',
                                borderTop: '1px solid #e2e8f0',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                                background: 'white',
                                borderRadius: '0 0 1rem 1rem'
                            }}>
                                <button
                                    onClick={() => setShowPdfPreview(false)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'white',
                                        color: '#64748b',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePrint}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "0.75rem 1.5rem",
                                        background: "#6366f1",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                >
                                    <FiPrinter /> Print Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="admin-card-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{data.full_name}</h2>
                        <p style={{ color: '#64748b', margin: '4px 0' }}>Application ID: <span style={{ fontWeight: 700, color: '#6366f1' }}>{data.application_no || 'Pending'}</span></p>
                    </div>
                    <div className={`status-badge ${data.payment_status === 'PAID' ? 'paid' : 'pending'}`} style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        {data.payment_status === 'PAID' ? <FiCheckCircle style={{ marginRight: '6px' }} /> : <FiClock style={{ marginRight: '6px' }} />}
                        {data.payment_status || "PENDING"}
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
                    {/* PERSONAL & FAMILY */}
                    <div>
                        <section style={{ marginBottom: "2.5rem" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '32px', height: '32px', background: '#e0e7ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                                    <FiUser />
                                </div>
                                <h4 style={{ margin: 0, fontWeight: 700, color: '#334155' }}>Personal Profile</h4>
                            </div>
                            <div style={{ paddingLeft: '2.75rem' }}>
                                <div className="detail-item"><strong>Email:</strong> {data.email}</div>
                                <div className="detail-item"><strong>Phone:</strong> {data.phone}</div>
                                <div className="detail-item"><strong>DOB:</strong> {data.dob ? new Date(data.dob).toLocaleDateString() : "-"}</div>
                                <div className="detail-item"><strong>Gender:</strong> {data.gender}</div>
                            </div>
                        </section>

                        <section style={{ marginBottom: "2.5rem" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '32px', height: '32px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                    <FiUsers />
                                </div>
                                <h4 style={{ margin: 0, fontWeight: 700, color: '#334155' }}>Family Details</h4>
                            </div>
                            <div style={{ paddingLeft: '2.75rem' }}>
                                <div className="detail-item"><strong>Father:</strong> {data.father_name}</div>
                                <div className="detail-item"><strong>Mother:</strong> {data.mother_name}</div>
                                <div className="detail-item"><strong>Parent Phone:</strong> {data.parent_phone}</div>
                            </div>
                        </section>

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '32px', height: '32px', background: '#f5f3ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                                    <FiMapPin />
                                </div>
                                <h4 style={{ margin: 0, fontWeight: 700, color: '#334155' }}>Communication Address</h4>
                            </div>
                            <div style={{ paddingLeft: '2.75rem' }}>
                                <p style={{ lineHeight: "1.6", color: "#64748b", fontSize: '0.935rem' }}>
                                    {data.address && `${data.address}, `}
                                    {data.city && `${data.city}, `}
                                    {data.state && `${data.state} - `}
                                    {data.pincode}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* ACADEMIC & DOCUMENTS */}
                    <div>
                        <section style={{ marginBottom: "2.5rem" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '32px', height: '32px', background: '#f5f3ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                                    <FiBookOpen />
                                </div>
                                <h4 style={{ margin: 0, fontWeight: 700, color: '#334155' }}>Academic Records</h4>
                            </div>
                            <div style={{ paddingLeft: '2.75rem' }}>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                    {/* Class XII */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <h5 style={{ margin: 0, color: '#6366f1', fontSize: '1rem', fontWeight: 700 }}>Higher Secondary (12th)</h5>
                                            <div style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                                                {data.twelfth_percentage}
                                            </div>
                                        </div>
                                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#475569' }}>
                                            <strong>{data.twelfth_school}</strong> ({data.twelfth_year}) | Reg No: {data.twelfth_reg_no} | Medium: {data.twelfth_medium}
                                        </p>

                                        {data.twelfth_marks_json && (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.815rem', background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                                                <thead>
                                                    <tr style={{ background: '#f8fafc', color: '#64748b', textAlign: 'left' }}>
                                                        <th style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>Subject</th>
                                                        <th style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>Marks</th>
                                                        <th style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>Max</th>
                                                        <th style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>Passing</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(typeof data.twelfth_marks_json === 'string' ? JSON.parse(data.twelfth_marks_json) : data.twelfth_marks_json).map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>{item.subject}</td>
                                                            <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', fontWeight: 600 }}>{item.marks}</td>
                                                            <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>{item.max}</td>
                                                            <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>{item.passing}</td>
                                                        </tr>
                                                    ))}
                                                    <tr style={{ background: '#fffbeb' }}>
                                                        <td style={{ padding: '8px 12px', fontWeight: 700, color: '#92400e' }}>TOTAL / CUTOFF</td>
                                                        <td style={{ padding: '8px 12px', fontWeight: 700, color: '#92400e' }}>{data.twelfth_total_marks} / {data.twelfth_max_marks}</td>
                                                        <td colSpan="2" style={{ padding: '8px 12px', fontWeight: 800, color: '#b45309', textAlign: 'right' }}>{data.twelfth_cutoff} / 400.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )}
                                    </div>

                                    <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px dashed #cbd5e1' }} />

                                    {/* Class XI */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                            <h5 style={{ margin: 0, color: '#6366f1', fontSize: '0.945rem', fontWeight: 700 }}>Class XI</h5>
                                            <div style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>
                                                {data.eleventh_percentage}
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.815rem', color: '#64748b' }}>
                                            <strong>{data.eleventh_institution}</strong> ({data.eleventh_passing_info})<br />
                                            Board: {data.eleventh_board} | Medium: {data.eleventh_medium} | Marks: {data.eleventh_total_marks}/{data.eleventh_max_marks}
                                        </p>
                                    </div>

                                    <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px dashed #cbd5e1' }} />

                                    {/* Class X */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                            <h5 style={{ margin: 0, color: '#6366f1', fontSize: '0.945rem', fontWeight: 700 }}>Secondary (10th)</h5>
                                            <div style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>
                                                {data.tenth_percentage}
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.815rem', color: '#64748b' }}>
                                            <strong>{data.tenth_school}</strong> ({data.tenth_year})<br />
                                            Board: {data.tenth_board} | Medium: {data.tenth_medium} | Marks: {data.tenth_total_marks}/{data.tenth_max_marks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '32px', height: '32px', background: '#fef2f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                                    <FiFile />
                                </div>
                                <h4 style={{ margin: 0, fontWeight: 700, color: '#334155' }}>Document Verification</h4>
                            </div>
                            <div style={{ paddingLeft: '2.75rem' }}>
                                {renderFileCard("Profile Photo", data.photo)}
                                {renderFileCard("12th Marksheet", data.marksheet_12)}
                                {renderFileCard("10th Marksheet", data.marksheet_10)}
                                {renderFileCard("Transfer Certificate", data.transfer_certificate)}
                                {renderFileCard("Community Certificate", data.community_certificate)}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <style>{`
                .detail-item {
                    margin-bottom: 12px;
                    font-size: 0.935rem;
                    color: #475569;
                    display: flex;
                    gap: 1rem;
                }
                .detail-item strong {
                    color: #94a3b8;
                    width: 120px;
                    font-weight: 500;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.025em;
                }
            `}</style>
        </div>
    );
};

export default AdminApplicationDetail;
