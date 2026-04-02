import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AdminLogin.css";
import logo from "../assets/Hindusthanwhite.png";
import { AUTH_API } from "../config";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(`${AUTH_API}/admin-login`, {
                email,
                password
            });

            const userRole = response.data.user.role;
            const allowedRoles = ["super_admin", "institution_admin", "admin", "accounts_admin"];

            if (allowedRoles.includes(userRole)) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userName", response.data.user.full_name);
                localStorage.setItem("userRole", userRole);
                localStorage.setItem("adminRole", userRole);
                localStorage.setItem("institutionName", response.data.user.institution_name || "All Institutions");

                // Intelligent Redirection
                if (userRole === "accounts_admin") {
                    navigate("/accounts-admin");
                } else {
                    navigate("/admin");
                }
            } else {
                setError("Access denied. Admin privileges required.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <img src={logo} alt="Hindusthan Logo" className="admin-login-logo" />
                    <h2>Admin Portal</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>

                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="admin@hindusthan.net"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <i
                                className={`fas ${showPassword ? "fa-unlock" : "fa-lock"}`}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <a href="/">← Back to Student Portal</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
