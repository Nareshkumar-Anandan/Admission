import React, { useState } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const Declaration = ({ onNext, initialData }) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sources, setSources] = useState(initialData?.source_info ? initialData.source_info.split(", ") : []);
  const [scholarships, setScholarships] = useState(initialData?.scholarship_category ? initialData.scholarship_category.split(", ") : []);

  const sourceOptions = [
    "Parents", "Students", "Alumni", "Print Media",
    "Social Media", "Friends & Relatives", "Education Fair"
  ];

  const scholarshipOptions = [
    "Academic Meritorious", "Sports Meritorious", "Ward of Military / Para-Military",
    "NCC / NSS", "Single Parent", "Orphan / Foster Child", "Physically Challenged",
    "Girl Child", "Sibling Quota", "Ward of Employee", "Alumni"
  ];

  const toggleOption = (list, setList, option) => {
    if (list.includes(option)) {
      setList(list.filter(item => item !== option));
    } else {
      setList([...list, option]);
    }
  };

  const handleSubmit = async () => {
    if (!agreed) {
      alert("Please agree to the declaration");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${APPLICATION_API}/declaration`,
        {
          agreed: true,
          source_info: sources.join(", "),
          scholarship_category: scholarships.join(", ")
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Declaration saved successfully ✅");
      onNext(); // Move to Payment

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Declaration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="declaration-container">
      {/* SOURCE OF INFORMATION SECTION */}
      <div className="form-subsection" style={{ marginBottom: "30px" }}>
        <h3 className="subsection-title" style={{ background: "var(--primary-color)", color: "white", padding: "10px 15px", borderRadius: "8px", textAlign: "center", textTransform: "uppercase", letterSpacing: "1px", fontSize: "1rem" }}>
          Source of Information About Hindusthan
        </h3>
        <div className="options-grid">
          {sourceOptions.map(option => (
            <div key={option} className={`option-card ${sources.includes(option) ? 'active' : ''}`} onClick={() => toggleOption(sources, setSources, option)}>
              <span className="checkbox-custom">{sources.includes(option) ? '✓' : ''}</span>
              <span className="option-label">{option}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SCHOLARSHIP SECTION */}
      <div className="form-subsection" style={{ marginBottom: "30px" }}>
        <h3 className="subsection-title" style={{ background: "var(--primary-color)", color: "white", padding: "10px 15px", borderRadius: "8px", textAlign: "center", textTransform: "uppercase", letterSpacing: "1px", fontSize: "1rem" }}>
          Scholarship Category
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "20px", padding: "0 10px", fontStyle: "italic" }}>
          Note: Applying for and / or qualifying HSC Examination does not entitle the Student for Scholarship.
        </p>
        <div className="options-grid scholarship-grid">
          {scholarshipOptions.map(option => (
            <div key={option} className={`option-card ${scholarships.includes(option) ? 'active' : ''}`} onClick={() => toggleOption(scholarships, setScholarships, option)}>
              <span className="checkbox-custom">{scholarships.includes(option) ? '✓' : ''}</span>
              <span className="option-label">{option}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL DECLARATION */}
      <div className="form-subsection" style={{ background: "rgba(99, 102, 241, 0.04)", border: "1px dashed var(--primary-color)" }}>
        <h3 className="subsection-title">Declaration</h3>
        <p style={{ lineHeight: "1.8", color: "var(--text-main)", fontSize: "0.95rem" }}>
          I hereby declare that the information provided by me in this
          application form is true and correct to the best of my knowledge
          and belief. I understand that any false information may result in
          cancellation of my admission.
        </p>
      </div>

      <div className="declaration-check">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agree">
          I agree to the terms and conditions
        </label>
      </div>

      <div className="btn-grid-right">
        <button
          onClick={handleSubmit}
          className="btn-primary"
          disabled={loading}
          style={{ padding: "14px 40px", fontSize: "1.1rem" }}
        >
          {loading ? "Saving..." : "Proceed to Payment →"}
        </button>
      </div>

      <style jsx>{`
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
          padding: 10px;
        }
        .scholarship-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .option-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 15px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
        }
        .option-card:hover {
          border-color: var(--primary-color);
          background: rgba(99, 102, 241, 0.02);
          transform: translateY(-2px);
        }
        .option-card.active {
          border-color: var(--primary-color);
          background: rgba(99, 102, 241, 0.08);
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.1);
        }
        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #cbd5e1;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: var(--primary-color);
          background: white;
          font-size: 14px;
        }
        .option-card.active .checkbox-custom {
          border-color: var(--primary-color);
          background: var(--primary-color);
          color: white;
        }
        .option-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: #475569;
        }
        .option-card.active .option-label {
          color: var(--primary-dark);
        }
        .declaration-check {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 10px;
          margin-bottom: 25px;
        }
        .declaration-check input {
          width: 22px;
          height: 22px;
          cursor: pointer;
          accent-color: var(--primary-color);
        }
        .declaration-check label {
          cursor: pointer;
          font-weight: 600;
          color: var(--text-main);
        }
        @media (max-width: 640px) {
          .options-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Declaration;
