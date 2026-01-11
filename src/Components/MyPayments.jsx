import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import axios from "axios";

import { PAYMENT_API } from "../config";
const API_URL = PAYMENT_API;

const MyPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await axios.get(`${API_URL}/my-payments`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setPayments(res.data.payments || []);
        } catch (err) {
            console.error("Failed to fetch payments", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading payments...</div>;
    }

    /* ================= NO PAYMENTS ================= */
    if (payments.length === 0) {
        return (
            <div className="my-payments-container empty">
                <div className="no-payment-state">
                    <div className="no-payment-icon">
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="10"
                                y="20"
                                width="44"
                                height="24"
                                rx="2"
                                fill="#4CAF50"
                                fillOpacity="0.2"
                                stroke="#4CAF50"
                                strokeWidth="2"
                            />
                            <circle cx="32" cy="32" r="6" stroke="#4CAF50" strokeWidth="2" />
                            <path
                                d="M16 26H20"
                                stroke="#4CAF50"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M44 26H48"
                                stroke="#4CAF50"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M16 38H20"
                                stroke="#4CAF50"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M44 38H48"
                                stroke="#4CAF50"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="20"
                                stroke="#FF5252"
                                strokeWidth="3"
                                fill="none"
                            />
                            <line
                                x1="18"
                                y1="46"
                                x2="46"
                                y2="18"
                                stroke="#FF5252"
                                strokeWidth="3"
                            />
                        </svg>
                    </div>
                    <p>You have not made any payment.</p>
                </div>
            </div>
        );
    }

    /* ================= PAYMENTS LIST ================= */
    return (
        <div className="my-payments-container">
            <h2 style={{ marginBottom: "20px", color: "#333" }}>My Payments</h2>

            <table className="payments-table">
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Paid On</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((p, index) => (
                        <tr key={index}>
                            <td>{p.payment_id}</td>
                            <td style={{ fontWeight: "bold" }}>₹{p.amount}</td>
                            <td>
                                <span className={`status-badge ${p.status.toLowerCase()}`}>
                                    {p.status}
                                </span>
                            </td>
                            <td style={{ color: "#555" }}>
                                {new Date(p.paid_on).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPayments;
