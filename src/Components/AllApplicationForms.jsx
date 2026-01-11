import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { APPLICATION_API } from "../config";
const API_URL = APPLICATION_API;

const AllApplicationForms = () => {
    const navigate = useNavigate();
    const [appStatus, setAppStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(`${API_URL}/status`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setAppStatus(res.data);
            } catch (err) {
                console.error("Failed to load application status", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    const handleAction = () => {
        navigate("/application-form");
    };

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading applications...</div>;
    }

    const userInstitution = localStorage.getItem("userInstitution") || "Institution";
    const isStarted = Boolean(appStatus?.started);

    return (
        <div className="all-application-forms">
            {/* ================= DYNAMIC INSTITUTION FORM ================= */}
            <div className="application-card" style={{ marginBottom: "20px" }}>
                <div className="application-left">
                    <h2>{userInstitution} Application Form</h2>

                    <div className="application-info">
                        <div>
                            <label>Application No.</label>
                            <p>{appStatus?.application_no || "-"}</p>
                        </div>

                        <div>
                            <label>Application Submitted On</label>
                            <p>{appStatus?.submitted_on || "-"}</p>
                        </div>

                        <div>
                            <label>Application Fees</label>
                            <p>₹500</p>
                        </div>
                    </div>

                    <div>
                        <label
                            style={{
                                fontSize: "13px",
                                color: "#777",
                                display: "block",
                                marginBottom: "5px",
                            }}
                        >
                            Action
                        </label>

                        <button onClick={handleAction} className="continue-btn">
                            {isStarted ? "Continue Application" : "Apply Now"}
                        </button>
                    </div>
                </div>

                {/* ================= ENROLMENT JOURNEY ================= */}
                <div className="application-right">
                    <h3>Enrolment Journey</h3>

                    <ul className="journey">
                        <li className={isStarted ? "completed" : ""}>
                            Application Initiated
                        </li>

                        <li
                            className={
                                appStatus?.payment_status === "PAID" ? "completed" : ""
                            }
                        >
                            Payment Approved
                        </li>

                        <li className={appStatus?.submitted ? "completed" : ""}>
                            Application Submitted
                        </li>
                        <li className={appStatus?.enrollment_status === 'ENROLLED' ? "completed" : ""}>
                            Enrolled
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllApplicationForms;
