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
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const topNavbarHeight = document.querySelector('.top-navbar').offsetHeight;
            const totalNavHeight = navbarHeight + topNavbarHeight;
            const targetPosition = section.offsetTop - totalNavHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false);
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
                            Gallery
                        </a>
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