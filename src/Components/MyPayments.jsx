import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import axios from "axios";
import { FiDownload } from "react-icons/fi";

import { PAYMENT_API, APPLICATION_API } from "../config";
const API_URL = PAYMENT_API;

const MyPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Tuition fee state
    const [tuitionAmount, setTuitionAmount] = useState("");
    const [tuitionError, setTuitionError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [feeRange, setFeeRange] = useState({ min: 10000, max: 90000 });
    const [tuitionEnabled, setTuitionEnabled] = useState(false);

    useEffect(() => {
        fetchPayments();
        fetchFeeRange();
    }, []);

    const fetchFeeRange = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API}/status`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (res.data.min_tuition_fee && res.data.max_tuition_fee) {
                setFeeRange({
                    min: Number(res.data.min_tuition_fee),
                    max: Number(res.data.max_tuition_fee)
                });
            }
            setTuitionEnabled(!!res.data.tuition_enabled);
        } catch (err) {
            console.error("Failed to fetch fee range", err);
        }
    };

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

    const handleDownloadInvoice = async (paymentId) => {
        try {
            const res = await axios.get(`${PAYMENT_API}/download-invoice/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice_${paymentId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Failed to download invoice", err);
            alert("Failed to download invoice");
        }
    };

    const handleTuitionPayment = async () => {
        const amount = parseInt(tuitionAmount, 10);
        if (isNaN(amount) || amount < feeRange.min || amount > feeRange.max) {
            setTuitionError(`Amount must be between ₹${feeRange.min.toLocaleString()} and ₹${feeRange.max.toLocaleString()}`);
            return;
        }
        setTuitionError("");
        setIsProcessing(true);

        try {
            // 1️⃣ Create order
            const { data } = await axios.post(
                `${PAYMENT_API}/create-tuition-order`,
                { amount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // 2️⃣ Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.amount,
                currency: data.currency,
                name: "Hindusthan Admission",
                description: "Tuition Fee Payment",
                order_id: data.id,

                handler: async function (response) {
                    // 3️⃣ Verify payment
                    await axios.post(
                        `${PAYMENT_API}/verify-tuition`,
                        { ...response, amount },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );

                    alert("Tuition Payment successful 🎉");
                    fetchPayments(); // Refresh list to show new payment

                    // Trigger automatic download
                    if (response.razorpay_payment_id) {
                        handleDownloadInvoice(response.razorpay_payment_id);
                    }
                },

                theme: { color: "#0d47a1" },

                modal: {
                    ondismiss: async function () {
                        // Optionally log cancel event
                        alert("Payment Cancelled.");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Tuition Payment Error:", err);
            const msg = err.response?.data?.error || err.message || "Payment init failed";
            alert(`Payment Error: ${msg}`);
        } finally {
            setIsProcessing(false);
        }
    };


    if (loading) {
        return <div style={{ padding: "20px" }}>Loading payments...</div>;
    }

    const hasPaidApp = payments.some(p => (p.fee_type === "Application Fee" || !p.fee_type) && p.status === "PAID");
    const hasPaidTuition = payments.some(p => p.fee_type === "Tuition Fee" && p.status === "PAID");

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
                            <rect x="10" y="20" width="44" height="24" rx="2" fill="#4CAF50" fillOpacity="0.2" stroke="#4CAF50" strokeWidth="2" />
                            <circle cx="32" cy="32" r="6" stroke="#4CAF50" strokeWidth="2" />
                            <path d="M16 26H20" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                            <path d="M44 26H48" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                            <path d="M16 38H20" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                            <path d="M44 38H48" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="32" cy="32" r="20" stroke="#FF5252" strokeWidth="3" fill="none" />
                            <line x1="18" y1="46" x2="46" y2="18" stroke="#FF5252" strokeWidth="3" />
                        </svg>
                    </div>
                    <p>You have not made any payment.</p>
                </div>
            </div>
        );
    }

    /* ================= PAYMENTS LIST ================= */
    return (
        <div className="my-payments-container" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

            {hasPaidApp && tuitionEnabled && !hasPaidTuition && (
                <div className="tuition-payment-section" style={{ background: "#f8fafc", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>Pay Tuition Fee</h3>
                    <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "15px" }}>
                        You can now proceed to pay your tuition fee. Please enter an amount between ₹{feeRange.min.toLocaleString()} and ₹{feeRange.max.toLocaleString()}.
                    </p>
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b", fontWeight: "bold" }}>₹</span>
                                <input
                                    type="number"
                                    value={tuitionAmount}
                                    onChange={(e) => setTuitionAmount(e.target.value)}
                                    placeholder="e.g. 50000"
                                    style={{ padding: "10px 10px 10px 25px", borderRadius: "6px", border: "1px solid #cbd5e1", width: "200px" }}
                                />
                            </div>
                            {tuitionError && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "5px" }}>{tuitionError}</span>}
                        </div>
                        <button
                            className="btn-primary"
                            onClick={handleTuitionPayment}
                            disabled={isProcessing}
                            style={{ padding: "10px 20px", borderRadius: "6px" }}
                        >
                            {isProcessing ? "Processing..." : "Pay Tuition"}
                        </button>
                    </div>
                </div>
            )}

            <div>
                <h2 style={{ marginBottom: "20px", color: "#333" }}>Payment History</h2>

                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Fee Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Paid On</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((p, index) => (
                            <tr key={index}>
                                <td style={{ fontSize: "0.85rem", color: "#64748b" }}>{p.payment_id}</td>
                                <td><span style={{ fontWeight: 600, background: "#f1f5f9", padding: "4px 8px", borderRadius: "6px", fontSize: "0.85rem" }}>{p.fee_type || "Application Fee"}</span></td>
                                <td style={{ fontWeight: "bold", color: "#0f172a" }}>₹{p.amount?.toLocaleString()}</td>
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
                                <td>
                                    <button
                                        onClick={() => handleDownloadInvoice(p.payment_id)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#3b82f6",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            fontSize: "0.85rem",
                                            fontWeight: 600
                                        }}
                                        title="Download Invoice"
                                    >
                                        <FiDownload size={16} /> Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPayments;
