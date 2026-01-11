import React, { useState } from "react";
import axios from "axios";
import "../Styles/ForgotPasssword.css";

import { AUTH_API } from "../config";
const API_URL = AUTH_API;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'

  /* STEP 1: SEND OTP */
  const sendOtp = async () => {
    try {
      if (!email) {
        setMessage("Please enter your email address");
        setMsgType("error");
        return;
      }
      await axios.post(`${API_URL}/forgot-password`, { email });
      setMessage("OTP sent to your email 📧");
      setMsgType("success");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
      setMsgType("error");
    }
  };

  /* STEP 2: VERIFY OTP */
  const verifyOtp = async () => {
    try {
      if (!otp) {
        setMessage("Please enter the OTP");
        setMsgType("error");
        return;
      }
      await axios.post(`${API_URL}/verify-otp`, { email, otp });
      setMessage("OTP verified ✅");
      setMsgType("success");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid OTP");
      setMsgType("error");
    }
  };

  /* VALIDATION HELPER */
  const validatePassword = (pwd) => {
    let errors = [];
    if (pwd.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("At least one uppercase letter (A-Z)");
    if ((pwd.match(/\d/g) || []).length < 2) errors.push("At least two numbers (0-9)");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errors.push("At least one special character (!@#...)");

    if (errors.length > 0) {
      return "Password must contain:\n• " + errors.join("\n• ");
    }
    return null;
  };

  /* STEP 3: RESET PASSWORD */
  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMsgType("error");
      return;
    }

    const error = validatePassword(password);
    if (error) {
      setMessage(error);
      setMsgType("error");
      return;
    }

    try {
      await axios.post(`${API_URL}/reset-password`, {
        email,
        password,
      });

      setMessage("Password reset successfully 🎉");
      setMsgType("success");
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Password reset failed");
      setMsgType("error");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <img
          src={new URL('../assets/logo1.webp', import.meta.url).href}
          alt="Hindusthan Logo"
          className="forgot-logo"
        />

        {step === 1 && (
          <>
            <h2>Forgot Password?</h2>
            <p className="description">
              Enter your registered email address below and we'll send you an OTP to reset your password.
            </p>
            {message && <div className={`message ${msgType}`}>{message}</div>}
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Verify OTP</h2>
            <p className="description">
              Please enter the 6-digit OTP sent to <b>{email}</b>.
            </p>
            {message && <div className={`message ${msgType}`}>{message}</div>}
            <input
              type="text"
              placeholder="Enter OTP"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
            <p style={{ marginTop: '15px', fontSize: '13px', cursor: 'pointer', color: '#627d98' }} onClick={() => setStep(1)}>Change Email</p>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Reset Password</h2>
            <p className="description">
              Create a new secure password for your account.
            </p>
            {message && <div className={`message ${msgType}`} style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{message}</div>}

            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <i className={showConfirmPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </span>
            </div>

            <button onClick={resetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
