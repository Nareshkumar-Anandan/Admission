import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/SetPassword.css";
import { AUTH_API } from "../config";

const SetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pwd) => {
    let errors = [];
    if (pwd.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("At least one uppercase letter (A-Z)");
    if ((pwd.match(/\d/g) || []).length < 1) errors.push("At least one numbers (0-9)");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errors.push("At least one special character (!@#...)");

    if (errors.length > 0) {
      return "Password must contain:\n• " + errors.join("\n• ");
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      setMessage(error);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${AUTH_API}/set-password`, {
        token,
        password,
      });

      setMessage("Password set successfully. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-password-container">
      <div className="set-password-card">
        <img
          src={new URL('../assets/logo1.webp', import.meta.url).href}
          alt="Hindusthan Logo"
          className="set-password-logo"
        />

        <h2>Set Your Password</h2>
        <p className="description">
          Welcome! Please create a secure password to activate your account.
        </p>

        {message && <div className="message" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="password-input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </span>
          </div>

          <div className="password-input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <i className={showConfirmPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
