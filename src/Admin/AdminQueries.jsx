import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMessageSquare, FiSend, FiCheckCircle, FiClock, FiSearch, FiFilter, FiUser } from "react-icons/fi";
import { ADMIN_API } from "../config";
import "../Styles/AdminQueries.css";

const AdminQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const QUERY_API = `${ADMIN_API.replace('admin', 'query')}/admin`;

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${QUERY_API}/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQueries(res.data);
        } catch (err) {
            console.error("Failed to fetch queries", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${QUERY_API}/reply/${selectedQuery.id}`, { reply: replyText }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ text: "Reply sent successfully!", type: "success" });
            setReplyText("");
            setSelectedQuery(null);
            fetchQueries();
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        } catch (err) {
            console.error("Failed to send reply", err);
            setMessage({ text: "Failed to send reply", type: "error" });
        } finally {
            setSubmitting(false);
        }
    };

    const filteredQueries = queries.filter(q => {
        const matchesSearch =
            q.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.student_email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || q.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading queries...</div>;

    return (
        <div className="admin-queries-container">
            <div className="admin-queries-header">
                <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Student Queries</h2>
                    <p style={{ color: "#64748b", marginTop: "4px" }}>Manage and respond to student help requests.</p>
                </div>
            </div>

            <div className="admin-queries-tools">
                <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by student name, email, or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-box">
                    <FiFilter className="filter-icon" />
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="answered">Answered</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            {message.text && (
                <div className={`admin-alert ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="queries-grid">
                <div className="queries-list-pane">
                    {filteredQueries.length === 0 ? (
                        <div className="admin-empty-state">No queries matching your criteria.</div>
                    ) : (
                        filteredQueries.map(q => (
                            <div
                                key={q.id}
                                className={`admin-query-card ${selectedQuery?.id === q.id ? 'active' : ''} ${q.status}`}
                                onClick={() => setSelectedQuery(q)}
                            >
                                <div className="card-header">
                                    <span className={`admin-status-badge ${q.status}`}>{q.status}</span>
                                    <span className="card-date">{new Date(q.created_at).toLocaleDateString()}</span>
                                </div>
                                <h4 className="card-subject">{q.subject}</h4>
                                <div className="card-student">
                                    <FiUser size={12} />
                                    <span>{q.student_name}</span>
                                </div>
                                <p className="card-message-snippet">{q.message}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="query-detail-pane">
                    {selectedQuery ? (
                        <div className="detail-content">
                            <div className="detail-header">
                                <div className="detail-student-info">
                                    <h3>{selectedQuery.subject}</h3>
                                    <p>From: <strong>{selectedQuery.student_name}</strong> ({selectedQuery.student_email})</p>
                                    <p>Phone: {selectedQuery.student_phone}</p>
                                    <p>Institution: {selectedQuery.institution_name}</p>
                                </div>
                                <span className={`admin-status-badge large ${selectedQuery.status}`}>{selectedQuery.status}</span>
                            </div>

                            <div className="message-bubble student">
                                <span className="bubble-label">Student Message</span>
                                <p>{selectedQuery.message}</p>
                                <span className="bubble-time">{new Date(selectedQuery.created_at).toLocaleString()}</span>
                            </div>

                            {selectedQuery.reply && (
                                <div className="message-bubble admin">
                                    <span className="bubble-label">Your Response</span>
                                    <p>{selectedQuery.reply}</p>
                                    <span className="bubble-time">{new Date(selectedQuery.updated_at).toLocaleString()}</span>
                                </div>
                            )}

                            <div className="reply-section">
                                <h4>{selectedQuery.reply ? "Update Response" : "Send Response"}</h4>
                                <form onSubmit={handleReply}>
                                    <textarea
                                        placeholder="Type your response to the student here..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows="6"
                                        required
                                    ></textarea>
                                    <button type="submit" disabled={submitting} className="admin-reply-btn">
                                        <FiSend /> {submitting ? "Sending..." : "Submit Reply"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="detail-placeholder">
                            <FiMessageSquare size={48} />
                            <p>Select a query from the list to view details and respond.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminQueries;
