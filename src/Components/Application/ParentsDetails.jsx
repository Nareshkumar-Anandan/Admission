import React, { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const ParentsDetails = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    father_name: initialData?.father_name || "",
    father_occupation: initialData?.father_occupation || "",
    mother_name: initialData?.mother_name || "",
    parent_phone: initialData?.parent_phone || "",
    guardian_name: initialData?.guardian_name || "",
    annual_income: initialData?.annual_income || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        father_name: initialData.father_name || prev.father_name,
        father_occupation: initialData.father_occupation || prev.father_occupation,
        mother_name: initialData.mother_name || prev.mother_name,
        parent_phone: initialData.parent_phone || prev.parent_phone,
        guardian_name: initialData.guardian_name || prev.guardian_name,
        annual_income: initialData.annual_income || prev.annual_income,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${APPLICATION_API}/parents`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Parent details saved successfully ✅");
      onNext(); // move to Address Details
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save parent details");
    }
  };

  return (
    <div>
      <div className="form-grid">

        <div className="form-group">
          <label>Father's Name</label>
          <input
            type="text"
            name="father_name"
            placeholder="Enter father's name"
            value={formData.father_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Father's Occupation</label>
          <input
            type="text"
            name="father_occupation"
            placeholder="Occupation"
            value={formData.father_occupation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mother's Name</label>
          <input
            type="text"
            name="mother_name"
            placeholder="Enter mother's name"
            value={formData.mother_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Parent's Contact Number</label>
          <input
            type="tel"
            name="parent_phone"
            placeholder="Contact number"
            value={formData.parent_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Guardian Name (if any)</label>
          <input
            type="text"
            name="guardian_name"
            placeholder="Guardian Name"
            value={formData.guardian_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Annual Income</label>
          <input
            type="number"
            name="annual_income"
            placeholder="Annual Income"
            value={formData.annual_income}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="btn-grid-right">
        <button onClick={handleSubmit} className="btn-primary">
          Save & Continue →
        </button>
      </div>
    </div>
  );
};

export default ParentsDetails;
