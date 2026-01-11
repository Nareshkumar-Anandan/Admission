import React from "react";
import "../Styles/Preloader.css";
import HindusthanLogo from "../assets/HindusthanWhite.png";

const Preloader = ({ isLoading }) => {
    return (
        <div className={`preloader-container ${!isLoading ? "fade-out" : ""}`}>
            <div className="loader-content">
                <img src={HindusthanLogo} alt="Hindusthan Logo" className="loader-logo" />
                <div className="loading-bar-container">
                    <div className="loading-bar-progress"></div>
                </div>
                <div className="loading-text">Loading Excellence</div>
            </div>
        </div>
    );
};

export default Preloader;
