import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApplicationPDF from "./Application/ApplicationPDF";

import { APPLICATION_API } from "../config";
const API_URL = APPLICATION_API;

const DashboardHome = () => {
    const [activeTab, setActiveTab] = useState("in-progress");
    const [appStatus, setAppStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fullDetails, setFullDetails] = useState(null);

    const navigate = useNavigate();
    const userInstitution = localStorage.getItem("userInstitution") || "Institution";

    useEffect(() => {
        fetchApplicationStatus();
    }, []);

    const fetchApplicationStatus = async () => {
        try {
            const res = await axios.get(`${API_URL}/status`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setAppStatus(res.data);

            // Auto switch tab
            if (res.data?.submitted) {
                setActiveTab("completed");
            } else {
                setActiveTab("in-progress");
            }
        } catch (err) {
            console.error("Failed to load dashboard status", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            // Fetch full details if not already fetched
            let data = fullDetails;
            if (!data) {
                const res = await axios.get(`${API_URL}/details`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                data = res.data;
                setFullDetails(data);
            }

            // Small delay to ensure state is set (if we rely on re-render)
            // But since we have data locally now, we can just trigger print
            setTimeout(() => {
                window.print();
            }, 500);

        } catch (err) {
            console.error("Failed to fetch application details for download", err);
            alert("Failed to generate application form");
        }
    };

    const handleContinue = async () => {
        try {
            const res = await axios.get(`${API_URL}/next-step`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const step = res.data.nextStep;

            // Navigate to application form (it already handles step)
            navigate("/application-form", {
                state: { startStep: step },
            });
        } catch (err) {
            console.error("Failed to fetch next step", err);
            navigate("/application-form");
        }
    };

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading dashboard...</div>;
    }

    const inProgressCount = appStatus?.started && !appStatus?.submitted ? 1 : 0;
    const completedCount = appStatus?.submitted ? 1 : 0;

    return (
        <>
            <div className="no-print-content">
                {/* ================= STATUS BAR ================= */}
                <div className="status-bar">
                    <div
                        className={`status-card ${activeTab === "in-progress" ? "active" : ""}`}
                        onClick={() => setActiveTab("in-progress")}
                    >
                        <span className="count">
                            {inProgressCount.toString().padStart(2, "0")}
                        </span>
                        <span>Application(s) In-Progress</span>
                    </div>

                    <div
                        className={`status-card ${activeTab === "completed" ? "active" : ""}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        <span className="count">
                            {completedCount === 0 ? "No" : completedCount}
                        </span>
                        <span>Application(s) Completed</span>
                    </div>

                    <div
                        className="apply-new"
                        onClick={() => navigate("application-forms")}
                    >
                        Apply New Application →
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                {activeTab === "in-progress" ? (
                    inProgressCount === 0 ? (
                        <div className="no-payment-state">
                            <p>No Applications In Progress</p>
                        </div>
                    ) : (
                        <div className="application-card">
                            <div className="application-left">
                                <h2>{userInstitution} Application Form</h2>

                                <div className="application-info">
                                    <div>
                                        <label>Application No.</label>
                                        <p>{appStatus.application_no}</p>
                                    </div>

                                    <div>
                                        <label>Application Submitted On</label>
                                        <p>-</p>
                                    </div>

                                    <div>
                                        <label>Application Fees</label>
                                        <p>₹500</p>
                                    </div>
                                </div>

                                <button className="continue-btn" onClick={handleContinue}>
                                    Continue
                                </button>
                            </div>

                            <div className="application-right">
                                <h3>Enrolment Journey</h3>

                                <ul className="journey">
                                    <li className="completed">Application Initiated</li>
                                    <li
                                        className={
                                            appStatus.payment_status === "PAID" ? "completed" : ""
                                        }
                                    >
                                        Payment Approved
                                    </li>
                                    <li className={appStatus.submitted ? "completed" : ""}>Application Completed</li>
                                    <li className={appStatus.enrollment_status === "ENROLLED" ? "completed" : ""}>Enrolled</li>
                                </ul>
                            </div>
                        </div>
                    )
                ) : (
                    /* ================= COMPLETED ================= */
                    completedCount === 0 ? (
                        <div className="my-payments-container">
                            <div className="no-payment-state">
                                <p>No Applications Completed.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="application-card">
                            <div className="application-left">
                                <h2>{userInstitution} Application Form</h2>

                                <div className="application-info">
                                    <div>
                                        <label>Application No.</label>
                                        <p>{appStatus.application_no}</p>
                                    </div>

                                    <div>
                                        <label>Application Submitted On</label>
                                        <p>{new Date(appStatus.submitted_on).toLocaleDateString()}</p>
                                    </div>

                                    <div>
                                        <label>Application Fees</label>
                                        <p>₹500</p>
                                    </div>
                                </div>

                                <div className="application-actions" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                    <div className="btn-submitted">
                                        Submitted ✓
                                    </div>
                                    <button className="btn-download" onClick={handleDownload}>
                                        Download Form ↓
                                    </button>
                                </div>
                            </div>

                            <div className="application-right">
                                <h3>Enrolment Journey</h3>
                                <ul className="journey">
                                    <li className="completed">Application Initiated</li>
                                    <li className="completed">Payment Approved</li>
                                    <li className="completed">Application Completed</li>
                                    <li className={appStatus.enrollment_status === "ENROLLED" ? "completed" : ""}>Enrolled</li>
                                </ul>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Render printable version (visible) */}
            <div>
                {fullDetails && <ApplicationPDF data={fullDetails} />}
            </div>
        </>
    );
};

export default DashboardHome;
