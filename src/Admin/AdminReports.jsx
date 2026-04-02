import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDownload, FiFileText, FiLoader, FiSearch, FiRefreshCcw } from "react-icons/fi";
import "../Styles/AdminPanel.css";
import { ADMIN_API } from "../config";

const AdminReports = () => {
    const [downloading, setDownloading] = useState({
        applications: false
    });
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
                responseType: 'blob', // Important for file download
            });

            // Create a blob URL
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${reportType}_report.xlsx`);
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

    const filteredData = reportData.filter(item =>
        item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.application_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { header: 'APP ID', key: 'application_no', width: '150px' },
        { header: 'STUDENT NAME', key: 'full_name', width: '200px' },
        { header: 'EMAIL', key: 'email', width: '250px' },
        { header: 'PHONE', key: 'phone', width: '130px' },
        { header: 'DOB', key: 'dob', width: '110px' },
        { header: 'GENDER', key: 'gender', width: '100px' },
        { header: 'COLLEGE', key: 'college', width: '300px' },
        { header: 'COURSE', key: 'programme_applied', width: '200px' },
        { header: 'FATHER NAME', key: 'father_name', width: '200px' },
        { header: 'MOTHER NAME', key: 'mother_name', width: '200px' },
        { header: 'PARENT PHONE', key: 'parent_phone', width: '130px' },
        { header: 'ADDRESS', key: 'address', width: '300px' },
        { header: 'CITY', key: 'city', width: '120px' },
        { header: 'STATE', key: 'state', width: '120px' },
        { header: 'PINCODE', key: 'pincode', width: '100px' },

        // Academic
        { header: '10th SCHOOL', key: 'tenth_school', width: '250px' },
        { header: '10th YEAR', key: 'tenth_year', width: '100px' },
        { header: '10th MARKS', key: 'tenth_total_marks', width: '100px' },
        { header: '10th MAX', key: 'tenth_max_marks', width: '100px' },
        { header: '10th %', key: 'tenth_percentage', width: '80px' },

        { header: '11th INST', key: 'eleventh_institution', width: '250px' },
        { header: '11th MARKS', key: 'eleventh_total_marks', width: '100px' },
        { header: '11th MAX', key: 'eleventh_max_marks', width: '100px' },
        { header: '11th %', key: 'eleventh_percentage', width: '80px' },

        { header: '12th SCHOOL', key: 'twelfth_school', width: '250px' },
        { header: '12th YEAR', key: 'twelfth_year', width: '100px' },
        { header: '12th REG NO', key: 'twelfth_reg_no', width: '150px' },
        { header: '12th MEDIUM', key: 'twelfth_medium', width: '120px' },
        { header: '12th MARKS', key: 'twelfth_total_marks', width: '100px' },
        { header: '12th MAX', key: 'twelfth_max_marks', width: '100px' },
        { header: '12th %', key: 'twelfth_percentage', width: '80px' },
        { header: '12th CUTOFF', key: 'twelfth_cutoff', width: '110px' },

        // Extra
        { header: 'SCHOLARSHIP', key: 'scholarship_category', width: '150px' },
        { header: 'SOURCE', key: 'source_info', width: '150px' },
        { header: 'SUBMITTED', key: 'submitted', width: '120px' },

        // Payment
        { header: 'APP FEE', key: 'app_fee_paid', width: '100px' },
        { header: 'APP TXN ID', key: 'app_txn_id', width: '200px' },
        { header: 'TUITION FEE', key: 'tuition_fee_paid', width: '120px' },
        { header: 'TUITION TXN ID', key: 'tuition_txn_id', width: '200px' },
        { header: 'APP DATE', key: 'created_at', width: '120px' },
    ];

    return (
        <div className="admin-page-container">
            <div className="admin-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.4rem', letterSpacing: '-0.025em' }}>Administrative Reports</h2>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Comprehensive real-time view of all student applications and payments.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={fetchReportData} className="admin-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#6366f1', border: '1px solid #e2e8f0' }}>
                        <FiRefreshCcw className={loading ? "spin" : ""} /> Refresh Data
                    </button>
                    <button
                        onClick={() => handleDownload('applications')}
                        disabled={downloading.applications}
                        className="admin-btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        {downloading.applications ? <FiLoader className="spin" /> : <FiDownload />}
                        Export to Excel
                    </button>
                </div>
            </div>

            <div className="admin-card-container" style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                        <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search by name, ID, email or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.925rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                background: '#f8fafc'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>
                        Showing {filteredData.length} records
                    </div>
                </div>

                <div style={{
                    overflowX: 'auto',
                    maxHeight: 'calc(100vh - 350px)',
                    border: '1px solid #f1f5f9',
                    borderRadius: '1rem',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
                }}>
                    <table className="modern-table" style={{ minWidth: '5500px', borderSpacing: 0 }}>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f8fafc' }}>
                            <tr style={{ background: '#f8fafc' }}>
                                {columns.map((col, idx) => (
                                    <th key={idx} style={{
                                        width: col.width,
                                        padding: '1.25rem 1rem',
                                        fontSize: '0.8rem',
                                        borderBottom: '2px solid #e2e8f0',
                                        background: '#f8fafc'
                                    }}>
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading && reportData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} style={{ padding: '6rem 0', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                            <FiLoader className="spin" size={40} color="#6366f1" />
                                            <span style={{ color: '#64748b', fontWeight: 500 }}>Fetching comprehensive report data...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredData.length > 0 ? (
                                filteredData.map((row, idx) => (
                                    <tr key={idx} style={{ transition: 'background 0.2s' }}>
                                        {columns.map((col, cIdx) => (
                                            <td key={cIdx} style={{
                                                padding: '1rem',
                                                fontSize: '0.85rem',
                                                color: '#334155',
                                                borderBottom: '1px solid #f1f5f9'
                                            }}>
                                                {col.key === 'created_at'
                                                    ? new Date(row[col.key]).toLocaleDateString()
                                                    : row[col.key] || "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} style={{ padding: '6rem 0', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '50%', color: '#94a3b8' }}>
                                                <FiSearch size={32} />
                                            </div>
                                            <span style={{ color: '#64748b', fontWeight: 500, marginTop: '0.5rem' }}>No matching records found</span>
                                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Try adjusting your search terms</span>
                                        </div>
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

export default AdminReports;
