import React from "react";
import {
    FiUserPlus,
    FiFileText,
    FiUpload,
    FiCreditCard,
    FiCheckCircle,
    FiArrowRight
} from "react-icons/fi";
import "./StepsToFollow.css";

const steps = [
    {
        icon: <FiUserPlus />,
        title: "Register",
        description: "Sign up with your email and phone to create your account.",
        color: "#6366f1",
    },
    {
        icon: <FiFileText />,
        title: "Fill Form",
        description: "Complete your personal and academic details in the online form.",
        color: "#8b5cf6",
    },
    {
        icon: <FiUpload />,
        title: "Upload Documents",
        description: "Upload marksheets, certificates, and your passport photo.",
        color: "#a855f7",
    },
    {
        icon: <FiCreditCard />,
        title: "Pay Fee",
        description: "Pay the application fee securely through our online portal.",
        color: "#7c3aed",
    },
    {
        icon: <FiCheckCircle />,
        title: "Get Admitted",
        description: "Admin reviews your application and confirms your enrollment.",
        color: "#6d28d9",
    },
];

const StepsToFollow = () => {
    return (
        <section className="steps-section">
            <div className="steps-container">
                <div className="steps-header">
                    <h2 className="steps-title">How to Apply</h2>
                    <p className="steps-subtitle">Follow these 5 simple steps to complete your admission</p>
                </div>

                <div className="steps-row">
                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <div className="step-item" style={{ '--step-color': step.color }}>
                                <div className="step-icon-circle" style={{ background: step.color }}>
                                    {step.icon}
                                </div>
                                <div className="step-number">Step {idx + 1}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.description}</p>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="step-arrow">
                                    <FiArrowRight />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsToFollow;
