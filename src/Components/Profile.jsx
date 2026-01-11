import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Dashboard.css";

import { USER_API } from "../config";
const API_URL = USER_API;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(res.data.user);
            } catch (err) {
                console.error("Profile load failed", err);

                // fallback to localStorage
                setUser({
                    full_name: localStorage.getItem("userName"),
                    email: localStorage.getItem("userEmail"),
                    phone: localStorage.getItem("userPhone"),
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading profile...</div>;
    }

    if (!user) {
        return <div style={{ padding: "20px" }}>No profile data available.</div>;
    }

    return (
        <div className="my-payments-container">
            <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

            <div style={{ display: "grid", gap: "20px", maxWidth: "500px" }}>
                <ProfileRow label="Full Name" value={user.full_name} />
                <ProfileRow label="Email" value={user.email} />
                <ProfileRow label="Phone" value={user.phone} />
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value }) => (
    <div>
        <label style={{ fontSize: "13px", color: "#777" }}>{label}</label>
        <p style={{ fontSize: "16px", fontWeight: "500" }}>
            {value || "-"}
        </p>
    </div>
);

export default Profile;
