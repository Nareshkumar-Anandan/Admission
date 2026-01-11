import React, { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const BasicDetails = ({ onNext, initialData }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: initialData?.full_name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    dob: initialData?.dob || "",
    gender: initialData?.gender || "",
    nationality: initialData?.nationality || "Indian",
  });

  // Update if initialData arrives late (async safety)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        full_name: initialData.full_name || prev.full_name,
        email: initialData.email || prev.email,
        phone: initialData.phone || prev.phone,
        dob: initialData.dob || prev.dob,
        gender: initialData.gender || prev.gender,
        nationality: initialData.nationality || prev.nationality,
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
    // Basic validation
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.dob ||
      !formData.gender
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${APPLICATION_API}/basic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Basic Details Saved ✅");
      onNext(); // move to next step

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save basic details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter mobile number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="btn-grid-right">
        <button
          onClick={handleSubmit}
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save & Continue →"}
        </button>
      </div>
    </div>
  );
};

export default BasicDetails;
