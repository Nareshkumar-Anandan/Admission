import React from "react";

const AdminReports = () => {
    return (
        <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
            <h2>System Reports</h2>
            <p>Generate and view admission and payment reports.</p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>Admission Report</h3>
                    <button className="continue-btn" style={{ marginTop: '10px' }}>Download CSV</button>
                </div>
                <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>Payment Report</h3>
                    <button className="continue-btn" style={{ marginTop: '10px' }}>Download CSV</button>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
