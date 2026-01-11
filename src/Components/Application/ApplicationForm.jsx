import React, { useEffect, useState } from "react";
import "./ApplicationForm.css";
import axios from "axios";
import { APPLICATION_API } from "../../config";

import PersonalInfo from "./PersonalInfo";
import AcademicDetails from "./AcademicDetails";
import UploadDetails from "./UploadDetails";
import Declaration from "./Declaration";
import Payment from "./Payment";

import {
  FaUser,
  FaGraduationCap,
  FaCloudUploadAlt,
  FaFileSignature,
  FaCreditCard
} from "react-icons/fa";

// 🔹 Import College Logos
import HICAS from "../../assets/Clglogos/HICAS.png";
import HICET from "../../assets/Clglogos/HICET.png";
import HIT from "../../assets/Clglogos/HIT.png";
import HCN from "../../assets/Clglogos/HCN.png";
import HCE from "../../assets/Clglogos/HCE.png";
import HISAC from "../../assets/Clglogos/HISAC.png";
import HSOA from "../../assets/Clglogos/HSOA.png";
import HICE from "../../assets/Clglogos/HICE.png";
import HCHS from "../../assets/Clglogos/HCHS.png";

const collegeLogos = {
  HICAS, HICET, HIT, HCN, HCE, HISAC, HSOA, HICE, HCHS
};

const steps = [
  { label: "Personal Information", icon: <FaUser />, key: "personal_completed" },
  { label: "Academic Details", icon: <FaGraduationCap />, key: "academic_completed" },
  { label: "Upload Documents", icon: <FaCloudUploadAlt />, key: "upload_completed" },
  { label: "Declaration", icon: <FaFileSignature />, key: "declaration_completed" },
  { label: "Payment", icon: <FaCreditCard />, key: "payment_status" },
];

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState({});
  const [selectedCollege, setSelectedCollege] = useState("");

  /* 🔹 Fetch Data & Progress on load */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch Full Data (Draft)
        const res = await axios.get(`${APPLICATION_API}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data || {};
        setApplicationData(data);
        setSelectedCollege(data.college_name || "");

        // Derive completed steps from data
        const completed = [];

        steps.forEach((step, index) => {
          const isComplete = step.key === "payment_status"
            ? data.payment_status === "PAID"
            : data[step.key] === 1;

          if (isComplete) {
            completed.push(index);
          }
        });

        setCompletedSteps(completed);

        let nextStep = 0;
        for (let i = 0; i < steps.length; i++) {
          if (!completed.includes(i)) {
            nextStep = i;
            break;
          }
        }

        if (completed.length === steps.length) {
          nextStep = steps.length - 1;
        }

        setCurrentStep(nextStep);

      } catch (err) {
        console.error("Data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* 🔹 After completing a step */
  const markCompleted = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    setCurrentStep(currentStep + 1);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading application...</p>;
  }

  return (
    <div className="application-wrapper">
      <div className="application-container">

        {/* HEADER */}
        <div className="application-header">
          {selectedCollege && collegeLogos[selectedCollege] && (
            <div className="college-logo-container">
              <img
                src={collegeLogos[selectedCollege]}
                alt={selectedCollege}
                className="college-logo-img"
              />
            </div>
          )}
          <h1>Application Form 2026-27</h1>
          <p>Resume your application from where you left off</p>
        </div>

        {/* STEPPER */}
        <div className="stepper-container">
          <div className="stepper">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step 
                  ${index === currentStep ? "active" : ""} 
                  ${completedSteps.includes(index) ? "completed" : ""}
                `}
              >
                <div className="step-circle">
                  {completedSteps.includes(index) ? "✓" : step.icon}
                </div>
                <p className="step-title">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="form-content-card">
          <h2 className="section-title">{steps[currentStep].label}</h2>

          <div className="form-body">
            {currentStep === 0 && (
              <PersonalInfo
                onNext={markCompleted}
                onCollegeChange={setSelectedCollege}
                initialData={applicationData}
              />
            )}
            {currentStep === 1 && (
              <AcademicDetails
                onNext={markCompleted}
                initialData={applicationData}
              />
            )}
            {currentStep === 2 && (
              <UploadDetails
                onNext={markCompleted}
                initialData={applicationData}
              />
            )}
            {currentStep === 3 && (
              <Declaration onNext={markCompleted} initialData={applicationData} />
            )}
            {currentStep === 4 && <Payment />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
