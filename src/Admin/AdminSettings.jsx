import React from "react";

const AdminSettings = () => {
    return (
        <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
            <h2>Settings</h2>
            <p>Configure system-wide settings.</p>

            <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <input type="checkbox" defaultChecked /> Enable New Registrations
                </label>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <input type="checkbox" defaultChecked /> Enable Email Notifications
                </label>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <input type="checkbox" /> Maintenance Mode
                </label>

                <button className="continue-btn" style={{ marginTop: '20px' }}>Save Changes</button>
            </div>
        </div>
    );
};

export default AdminSettings;
