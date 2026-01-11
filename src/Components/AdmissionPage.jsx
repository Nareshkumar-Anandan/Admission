import React from "react";
import "../Styles/AdmissionPage.css";

const AdmissionPage = () => {
  return (
    <>
      {/* 🔹 Top Navbar */}
      <div className="top-navbar">
        <div className="top-logo">
          <img src="/assets/images/logo.webp" alt="Hindusthan Logo" />
        </div>
        <div className="top-contact">
          <h2>For Admission Contact</h2>
          <h3>
            <span className="line">
              <i className="fa-solid fa-phone"></i> +91 98431 33333 &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
            <span>
              <i className="fa-solid fa-envelope"></i> info@hindusthan.net
            </span>
          </h3>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <nav className="nav-links" id="navLinks">
            <a href="#whyHindusthan" className="nav-link">Why Hindusthan</a>
            <a href="#Intitutionsandcourses" className="nav-link">Institutions & Courses</a>
            <a href="#international-collabration" className="nav-link">International Collaboration</a>
            <a href="#topRecruiters" className="nav-link">Top Recruiters</a>
            <a href="#gallerySection" className="nav-link">Gallery</a>
          </nav>
          <div className="menu-toggle" id="menuToggle">&#9776;</div>
        </div>
      </header>

      {/* 🔹 Admission Form */}
      <div className="form-background">
        <div className="form-container" id="formSection">
          <h2>ADMISSION OPEN 2026-27</h2>

          <div className="tab-container">
            <button className="tab active" id="registerTab">Register</button>
            <button className="tab" id="loginTab">Login</button>
          </div>

          {/* Register Form */}
          <form id="registerForm">
            <input type="text" placeholder="Full Name *" required />
            <input type="email" placeholder="Enter Email Address *" required />

            <div className="phone-group">
              <select className="country-code">
                <option value="+91">+91</option>
              </select>
              <input type="tel" placeholder="Enter Mobile Number *" required />
            </div>

            <div className="row">
              <select id="stateSelect" required>
                <option value="">Select State *</option>
              </select>
              <select id="citySelect" required>
                <option value="">Select City *</option>
              </select>
            </div>

            <div className="row">
              <select id="institutionSelect" required>
                <option value="">Select Institution *</option>
              </select>
              <select id="specializationSelect" required>
                <option value="">Select Specialization *</option>
              </select>
            </div>

            <div className="captcha-row">
              <div className="captcha-box">
                <div id="captcha" className="captcha-img"></div>
                <button type="button" id="refreshCaptcha" className="refresh">&#x21bb;</button>
              </div>
              <input type="text" placeholder="Enter Captcha" required />
            </div>

            <label className="checkbox-input">
              <input
                type="checkbox"
                required
                style={{ height: "25px", width: "50px", marginTop: "0px" }}
              />
              <h3>
                I agree to receive updates and information from Hindusthan Educational Institutions by signing up.*
              </h3>
            </label>

            <button type="submit" className="register-btn">REGISTER</button>
            <a href="#" className="resend">RESEND VERIFICATION EMAIL</a>
          </form>

          {/* Login Form */}
          <form id="loginForm" style={{ display: "none" }}>
            <input type="email" placeholder="Your Email *" required />
            <input type="password" placeholder="Your Password *" required />

            <button
              type="button"
              className="otp-btn"
              onClick={() => alert("OTP sent to your registered email!")}
            >
              Login via OTP
            </button>

            <label className="checkbox-input" style={{ marginTop: "30px" }}>
              <input
                type="checkbox"
                style={{ height: "25px", width: "50px", marginTop: "0px" }}
              />
              <h3>Check to remember your login details</h3>
            </label>

            <button type="submit" className="login-btn">LOGIN</button>
            <a href="#" className="forgot">FORGOT PASSWORD?</a>
          </form>
        </div>
      </div>

      {/* 🔹 Gallery Lightbox */}
      <div className="lightbox" id="lightbox">
        <span className="close-btn" id="closeBtn">&times;</span>
        <span className="nav-btn prev-btn" id="prevBtn">&#10094;</span>
        <img id="lightboxImg" alt="Expanded" />
        <span className="nav-btn next-btn" id="nextBtn">&#10095;</span>
      </div>
    </>
  );
};

export default AdmissionPage;
