import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDownload, FiFileText, FiLoader, FiSearch, FiRefreshCcw } from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { ADMIN_API } from "../config";

const AccountsReports = () => {
    const [downloading, setDownloading] = useState({ payments: false });
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchReportData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ADMIN_API}/reports/applications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReportData(res.data);
        } catch (err) {
            console.error("Failed to fetch report data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    const handleDownload = async (reportType) => {
        setDownloading(prev => ({ ...prev, [reportType]: true }));
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${ADMIN_API}/csv/${reportType}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Accounts_${reportType}_report.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download report.");
        } finally {
            setDownloading(prev => ({ ...prev, [reportType]: false }));
        }
    };

    const filteredData = (reportData || []).filter(item =>
        (item.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.application_no || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.payment_id || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page-container">
            <div className="admin-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>Financial Reports</h2>
                    <p style={{ color: '#64748b' }}>Export detailed collection and transaction logs.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => handleDownload('payments')}
                        disabled={downloading.payments}
                        className="admin-btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        {downloading.payments ? <FiLoader className="spin" /> : <FiDownload />}
                        Export Collections
                    </button>
                    <button
                        onClick={() => handleDownload('applications')}
                        className="admin-btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#6366f1', border: '1px solid #e2e8f0' }}
                    >
                        <FiFileText /> Export Apps
                    </button>
                </div>
            </div>

            <div className="admin-card-container">
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Student search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
                    <table className="modern-table">
                        <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#f8fafc' }}>
                            <tr>
                                <th>Student</th>
                                <th>App ID</th>
                                <th>College</th>
                                <th>App Fee</th>
                                <th>App Txn</th>
                                <th>Tuition Fee</th>
                                <th>Tuition Txn</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '3rem' }}><FiLoader className="spin" size={24} /></td></tr>
                            ) : filteredData.map((row, idx) => (
                                <tr key={idx}>
                                    <td><div style={{ fontWeight: 600 }}>{row.full_name}</div></td>
                                    <td><span style={{ fontWeight: 700, color: '#6366f1' }}>{row.application_no}</span></td>
                                    <td><span style={{ fontSize: '0.75rem' }}>{row.college?.split(' - ')[0]}</span></td>
                                    <td>₹500</td>
                                    <td><span style={{ fontSize: '0.7rem', color: '#64748b' }}>{row.app_txn_id}</span></td>
                                    <td><span style={{ color: '#10b981', fontWeight: 700 }}>{row.tuition_fee_paid ? `₹${Number(row.tuition_fee_paid).toLocaleString()}` : '-'}</span></td>
                                    <td><span style={{ fontSize: '0.7rem', color: '#64748b' }}>{row.tuition_txn_id || '-'}</span></td>
                                    <td>{row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountsReports;
