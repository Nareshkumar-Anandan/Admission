import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSend, FiMessageSquare, FiClock, FiCheckCircle, FiPlus } from "react-icons/fi";
import "../Styles/MyQueries.css";

import { API_BASE_URL } from "../config";
const API_URL = `${API_BASE_URL}/api`;

const MyQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newQuery, setNewQuery] = useState({ subject: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });


    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_URL}/query/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQueries(res.data);
        } catch (err) {
            console.error("Failed to fetch queries", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${API_URL}/query/create`, newQuery, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ text: "Query submitted successfully!", type: "success" });
            setNewQuery({ subject: "", message: "" });
            setShowModal(false);
            fetchQueries();
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        } catch (err) {
            console.error("Failed to submit query", err);
            setMessage({ text: "Failed to submit query. Please try again.", type: "error" });
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "answered": return <FiCheckCircle className="status-icon answered" />;
            case "pending": return <FiClock className="status-icon pending" />;
            default: return <FiClock className="status-icon" />;
        }
    };

    return (
        <div className="queries-container">
            <div className="queries-header">
                <div className="header-info">
                    <h2>Support Queries</h2>
                    <p>Ask questions and get help from our administration team.</p>
                </div>
                <button className="add-query-btn" onClick={() => setShowModal(true)}>
                    <FiPlus /> New Query
                </button>
            </div>

            {message.text && (
                <div className={`alert-message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="loading-state">Loading your queries...</div>
            ) : queries.length === 0 ? (
                <div className="empty-state">
                    <FiMessageSquare size={48} />
                    <h3>No queries found</h3>
                    <p>You haven't submitted any queries yet. Click "New Query" to get started.</p>
                </div>
            ) : (
                <div className="queries-list">
                    {queries.map((q) => (
                        <div key={q.id} className={`query-card ${q.status}`}>
                            <div className="query-main">
                                <div className="query-status">
                                    {getStatusIcon(q.status)}
                                    <span className={`status-text ${q.status}`}>{q.status}</span>
                                </div>
                                <div className="query-content">
                                    <h4 className="query-subject">{q.subject}</h4>
                                    <p className="query-message">{q.message}</p>
                                    <span className="query-date">{new Date(q.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {q.reply && (
                                <div className="query-reply">
                                    <div className="reply-header">
                                        <FiMessageSquare size={14} />
                                        <span>Admin Response</span>
                                    </div>
                                    <p className="reply-text">{q.reply}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* New Query Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="query-modal">
                        <div className="modal-header">
                            <h3>Submit New Query</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    value={newQuery.subject}
                                    onChange={(e) => setNewQuery({ ...newQuery, subject: e.target.value })}
                                    placeholder="Briefly describe your question"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    value={newQuery.message}
                                    onChange={(e) => setNewQuery({ ...newQuery, message: e.target.value })}
                                    placeholder="Enter your detailed question here..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="submit-btn" disabled={submitting}>
                                    {submitting ? "Submitting..." : "Submit Query"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyQueries;
