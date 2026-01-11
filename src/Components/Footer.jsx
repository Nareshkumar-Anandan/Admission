import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Info Section */}
      <div className="footer-top">
        <div className="footer-item">
          <FaMapMarkerAlt className="footer-icon" />
          <h4>Address</h4>
          <p>
            Hindusthan Educational Institutions,<br />
            Valley Campus,<br />
            Coimbatore – 641 032
          </p>
        </div>

        <div className="footer-divider" />

        <div className="footer-item">
          <FaPhoneAlt className="footer-icon" />
          <h4>Admission Hotline</h4>
          <p>+91 422 444 0555</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-item">
          <FaEnvelope className="footer-icon" />
          <h4>Email Address</h4>
          <p><a href="mailto:admission@hindusthan.net" target="_blank">admission@hindusthan.net</a></p>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        <a href="https://www.linkedin.com/company/hindusthanedu/" target="_blank"><FaLinkedin /></a>
        <a href="https://www.facebook.com/hindusthancolleges" target="_blank"><FaFacebookF /></a>
        <a href="https://youtube.com/@hindusthaneducationalinsti5809?si=tfOY4Z_NGENFFFar" target="_blank"><FaYoutube /></a>
        <a href="https://x.com/Hindusthanhce?t=cH1BisxThpHw8G_iyNXYDA&s=09 " target="_blank"><FaTwitter /></a>
        <a href="https://www.instagram.com/hindusthancolleges?igsh=MWRoN285dTNqNHh2NA==" target="_blank"><FaInstagram /></a>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Hindusthan Educational Institutions. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
