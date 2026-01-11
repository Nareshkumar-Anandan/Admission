import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiActivity, FiUser, FiCreditCard, FiClock } from "react-icons/fi";
import { APPLICATION_API } from "../config";

const RealTimeMonitoring = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActivity = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${APPLICATION_API}/recent-activity`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setActivities(res.data);
        } catch (err) {
            console.error("Failed to fetch live activity", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivity();
        const interval = setInterval(fetchActivity, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const formatTime = (ts) => {
        const date = new Date(ts);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="monitoring-section" style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="pulse-indicator" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)' }}></div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>Live Admission Activity</h3>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiClock /> Live Updates Every 10s
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Syncing live feed...</div>
            ) : (
                <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {activities.length > 0 ? activities.map((item, idx) => (
                        <div key={idx} className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.75rem', background: '#f8fafc', transition: 'transform 0.2s' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: item.type === 'REGISTRATION' ? '#eff6ff' : '#ecfdf5',
                                color: item.type === 'REGISTRATION' ? '#3b82f6' : '#10b981'
                            }}>
                                {item.type === 'REGISTRATION' ? <FiUser /> : <FiCreditCard />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.925rem', fontWeight: 600, color: '#1e293b' }}>
                                    {item.type === 'REGISTRATION' ? 'New Registration' : 'Payment Received'}
                                </div>
                                <div style={{ fontSize: '0.825rem', color: '#64748b' }}>
                                    {item.user_name} {item.type === 'PAYMENT' && `• ₹${item.details}`}
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8' }}>
                                {formatTime(item.timestamp)}
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No recent activity to show.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RealTimeMonitoring;
