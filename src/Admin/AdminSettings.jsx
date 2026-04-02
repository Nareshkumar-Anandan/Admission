import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADMIN_API } from "../config";
import { FiSave, FiSettings, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const AdminSettings = () => {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null); // id of saving institution
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ADMIN_API}/institution-settings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInstitutions(res.data.institutions);
        } catch (err) {
            console.error("Failed to fetch settings", err);
            setMessage({ text: "Failed to load institution settings", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (inst) => {
        setSaving(inst.id);
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${ADMIN_API}/institution-settings/${inst.id}`, {
                min_tuition_fee: inst.min_tuition_fee,
                max_tuition_fee: inst.max_tuition_fee,
                is_active: inst.is_active
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ text: `Settings for ${inst.name} updated!`, type: "success" });
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        } catch (err) {
            console.error("Update failed", err);
            setMessage({ text: "Failed to update settings", type: "error" });
        } finally {
            setSaving(null);
        }
    };

    const handleChange = (id, field, value) => {
        setInstitutions(prev => prev.map(inst =>
            inst.id === id ? { ...inst, [field]: value } : inst
        ));
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading settings...</div>;

    return (
        <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FiSettings size={24} color="#0d47a1" />
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>System Settings</h2>
            </div>

            {message.text && (
                <div style={{
                    padding: "12px 20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: message.type === "success" ? "#f0fdf4" : "#fef2f2",
                    color: message.type === "success" ? "#166534" : "#991b1b",
                    border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}`
                }}>
                    {message.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                    {message.text}
                </div>
            )}

            <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" }}>
                <div style={{ padding: "20px", borderBottom: "1px solid #f1f5f9", backgroundColor: "#f8fafc" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#334155", margin: 0 }}>Institutionwise Tuition Fees</h3>
                    <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>Configure min/max tuition fee ranges for each institution.</p>
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", backgroundColor: "#f8fafc" }}>
                                <th style={{ padding: "16px 24px" }}>Institution Name</th>
                                <th style={{ padding: "16px 24px" }}>Min Fee (₹)</th>
                                <th style={{ padding: "16px 24px" }}>Max Fee (₹)</th>
                                <th style={{ padding: "16px 24px", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {institutions.map(inst => (
                                <tr key={inst.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "16px 24px", color: "#1e293b", fontWeight: 500 }}>{inst.name}</td>
                                    <td style={{ padding: "16px 24px" }}>
                                        <input
                                            type="number"
                                            value={inst.min_tuition_fee}
                                            onChange={(e) => handleChange(inst.id, 'min_tuition_fee', e.target.value)}
                                            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", width: "120px" }}
                                        />
                                    </td>
                                    <td style={{ padding: "16px 24px" }}>
                                        <input
                                            type="number"
                                            value={inst.max_tuition_fee}
                                            onChange={(e) => handleChange(inst.id, 'max_tuition_fee', e.target.value)}
                                            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", width: "120px" }}
                                        />
                                    </td>
                                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                                        <button
                                            onClick={() => handleUpdate(inst)}
                                            disabled={saving === inst.id}
                                            style={{
                                                padding: "8px 16px",
                                                borderRadius: "6px",
                                                backgroundColor: "#0d47a1",
                                                color: "white",
                                                border: "none",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                cursor: "pointer",
                                                fontSize: "0.875rem",
                                                opacity: saving === inst.id ? 0.7 : 1
                                            }}
                                        >
                                            <FiSave size={14} />
                                            {saving === inst.id ? "Saving..." : "Save"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
