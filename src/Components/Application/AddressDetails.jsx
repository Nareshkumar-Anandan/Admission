// components/ApplicationForm/AddressDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const AddressDetails = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    country: "India",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        address: initialData.address || prev.address,
        city: initialData.city || prev.city,
        state: initialData.state || prev.state,
        pincode: initialData.pincode || prev.pincode,
      }));
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        `${APPLICATION_API}/address`,
        {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Address details saved ✅");
      onNext();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save address details");
    }
  };

  return (
    <div>
      <div className="form-grid">
        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label>Permanent Address *</label>
          <textarea
            rows="3"
            placeholder="Enter full address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Pincode *</label>
          <input
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            placeholder="India"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
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

export default AddressDetails;
