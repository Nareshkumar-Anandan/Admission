// components/Navbar.jsx
import React, { useState } from 'react';
import '../Styles/Navbar.css';
import logo from '../assets/HindusthanWhite.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    React.useEffect(() => {
        setVisible(true);
    }, []);

    const handleScroll = (sectionId) => {
        setIsMenuOpen(false); // Close menu first to ensure heights are correct

        // Use a small delay to allow menu closing animation if any, 
        // though immediate calculation is usually fine if we use absolute positions
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                const isMobile = window.innerWidth <= 768;
                // On mobile, the sticky header is just the top-navbar (70px)
                // On desktop, it's roughly 110px total
                const offset = isMobile ? 80 : 110;

                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = section.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 10);
    };

    return (
        <>
            <div className="top-navbar">
                <div className="top-logo">
                    <img src={logo} alt="Hindusthan Logo" />
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
                <div className="top-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </div>
            </div>

            <header className={`navbar ${visible ? 'visible' : ''}`}>
                <div className="nav-container">
                    <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a href="#whyHindusthan" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('whyHindusthan'); }}>
                            Why Hindusthan
                        </a>
                        <a href="#international-collaboration" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('international-collaboration'); }}>
                            International Collaboration
                        </a>
                        <a href="#Intitutionsandcourses" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('Intitutionsandcourses'); }}>
                            Institutions & Courses
                        </a>
                        <a href="#topRecruiters" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('topRecruiters'); }}>
                            Top Recruiters
                        </a>
                        <a href="#gallerySection" className="nav-link" onClick={(e) => { e.preventDefault(); handleScroll('gallerySection'); }}>
                            Infrastructure
                        </a>
                        <div className="mobile-contact-info">
                            <h2>For Admission Contact</h2>
                            <p><i className="fa-solid fa-phone"></i> +91 98431 33333</p>
                            <p><i className="fa-solid fa-envelope"></i> info@hindusthan.net</p>
                        </div>
                    </nav>
                    <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        &#9776;
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;