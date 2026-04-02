import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APPLICATION_API } from '../config';
import { FiX, FiActivity } from 'react-icons/fi';

const DailyTrendGraph = ({ onClose }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${APPLICATION_API}/daily-stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
            } catch (err) {
                console.error("Failed to fetch daily trend", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to calculate SVG points
    const getSvgPoints = () => {
        if (!data.length) return "";
        const max = Math.max(...data.map(d => d.count)) || 5; // Default max to 5 to avoid div by zero
        const height = 200;
        const width = 600;
        const padding = 30; // Increased padding slightly

        if (data.length === 1) {
            // If only one point, draw it in center
            const x = width / 2;
            const y = height - ((data[0].count / max) * (height - 2 * padding)) - padding;
            return `${x},${y}`;
        }

        return data.map((d, i) => {
            const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
            const y = height - ((d.count / max) * (height - 2 * padding)) - padding;
            return `${x},${y}`;
        }).join(" ");
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }} onClick={onClose}>
            <div style={{
                background: 'white', padding: '2rem', borderRadius: '1.5rem', width: '90%', maxWidth: '700px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '0.75rem', background: '#e0e7ff', borderRadius: '0.75rem', color: '#6366f1' }}>
                            <FiActivity size={24} />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Daily Application Trends</h3>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <FiX size={24} />
                    </button>
                </div>

                {loading ? (
                    <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        Loading Trend Data...
                    </div>
                ) : (
                    <div style={{ position: 'relative', height: '220px', width: '100%', marginBottom: '1rem' }}>
                        {data.length === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#94a3b8' }}>
                                No data available for the last 7 days.
                            </div>
                        ) : (
                            <svg viewBox="0 0 600 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                {/* Axes */}
                                <line x1="30" y1="200" x2="570" y2="200" stroke="#cbd5e1" strokeWidth="1" />

                                {/* Line Path */}
                                <polyline
                                    points={getSvgPoints()}
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Points and Labels */}
                                {data.map((d, i) => {
                                    const max = Math.max(...data.map(d => d.count)) || 5;
                                    const height = 200;
                                    const width = 600;
                                    const padding = 30;

                                    let x;
                                    if (data.length === 1) {
                                        x = width / 2;
                                    } else {
                                        x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
                                    }

                                    const y = height - ((d.count / max) * (height - 2 * padding)) - padding;

                                    return (
                                        <g key={i}>
                                            <circle cx={x} cy={y} r="6" fill="white" stroke="#6366f1" strokeWidth="2" />

                                            {/* Count Label (Above) */}
                                            <text x={x} y={y - 12} textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="14">{d.count}</text>

                                            {/* Date Label (Below) */}
                                            <text x={x} y={220} textAnchor="middle" fill="#64748b" fontSize="12">{d.date}</text>
                                        </g>
                                    )
                                })}
                            </svg>
                        )}
                    </div>
                )}

                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                    Shows the number of new application forms created daily (Last 7 Days)
                </p>
            </div>
        </div>
    );
};

export default DailyTrendGraph;
