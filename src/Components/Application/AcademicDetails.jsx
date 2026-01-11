import React, { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const AcademicDetails = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    tenth_board: "",
    tenth_school: "",
    tenth_year: "",
    tenth_percentage: "",
    tenth_medium: "",
    tenth_total_marks: "",
    tenth_max_marks: "",

    eleventh_institution: "",
    eleventh_board: "",
    eleventh_medium: "",
    eleventh_passing_info: "",
    eleventh_total_marks: "",
    eleventh_max_marks: "",
    eleventh_percentage: "",

    twelfth_board: "",
    twelfth_school: "",
    twelfth_year: "",
    twelfth_percentage: "",
    twelfth_reg_no: "",
    twelfth_medium: "",
    twelfth_total_marks: "",
    twelfth_max_marks: "",
    twelfth_cutoff: "",
    twelfth_marks_json: [
      { subject: "Tamil / Hindi / French / Malayalam / Others", marks: "", max: "", passing: "" },
      { subject: "English", marks: "", max: "", passing: "" },
      { subject: "", marks: "", max: "", passing: "" },
      { subject: "", marks: "", max: "", passing: "" },
      { subject: "", marks: "", max: "", passing: "" },
      { subject: "", marks: "", max: "", passing: "" },
    ],
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        twelfth_marks_json: initialData.twelfth_marks_json ? (typeof initialData.twelfth_marks_json === 'string' ? JSON.parse(initialData.twelfth_marks_json) : initialData.twelfth_marks_json) : prev.twelfth_marks_json
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Auto-calculate X percentage (Robust)
      if (name === "tenth_total_marks" || name === "tenth_max_marks") {
        const total = parseFloat(newData.tenth_total_marks) || 0;
        const max = parseFloat(newData.tenth_max_marks) || 0;
        if (max > 0) {
          newData.tenth_percentage = ((total / max) * 100).toFixed(2) + "%";
        } else {
          newData.tenth_percentage = "";
        }
      }

      // Auto-calculate XI percentage (Robust)
      if (name === "eleventh_total_marks" || name === "eleventh_max_marks") {
        const total = parseFloat(newData.eleventh_total_marks) || 0;
        const max = parseFloat(newData.eleventh_max_marks) || 0;
        if (max > 0) {
          newData.eleventh_percentage = ((total / max) * 100).toFixed(2) + "%";
        } else {
          newData.eleventh_percentage = "";
        }
      }

      return newData;
    });
  };

  const handleMarkChange = (index, field, value) => {
    const newMarks = [...formData.twelfth_marks_json];
    newMarks[index][field] = value;

    // Auto-calculate XII totals and normalized cutoff
    let totalObtained = 0;
    let totalMax = 0;
    let coreObtained = 0;
    let coreMax = 0;

    newMarks.forEach((m, i) => {
      const marks = parseFloat(m.marks) || 0;
      const max = parseFloat(m.max) || 0;

      totalObtained += marks;
      totalMax += max;

      // Index 2, 3, 4, 5 are the 4 core subjects (Excluding Language & English)
      if (i >= 2) {
        coreObtained += marks;
        coreMax += max;
      }
    });

    // Calculate Cutoff (Normalized to 400)
    let finalCutoff = "0.00";
    if (coreMax > 0) {
      finalCutoff = ((coreObtained / coreMax) * 400).toFixed(2);
    }

    setFormData({
      ...formData,
      twelfth_marks_json: newMarks,
      twelfth_total_marks: totalObtained,
      twelfth_max_marks: totalMax,
      twelfth_percentage: totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) + "%" : "",
      twelfth_cutoff: finalCutoff
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${APPLICATION_API}/academic`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Academic details saved ✅");
      onNext();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save academic details");
    }
  };

  return (
    <div className="academic-details-container">
      {/* CLASS XI SECTION */}
      <div className="form-subsection">
        <h3 className="subsection-title">Class XI Details</h3>
        <div className="form-grid">
          <div className="form-group grid-span-2">
            <label>Institution Name</label>
            <input type="text" name="eleventh_institution" value={formData.eleventh_institution} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Medium of Study</label>
            <input type="text" name="eleventh_medium" value={formData.eleventh_medium} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Month & Year of Passing</label>
            <input type="text" name="eleventh_passing_info" placeholder="e.g. March 2024" value={formData.eleventh_passing_info} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Name of the Board</label>
            <input type="text" name="eleventh_board" value={formData.eleventh_board} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Total Marks Obtained / Max Marks</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="number" name="eleventh_total_marks" value={formData.eleventh_total_marks} onChange={handleChange} style={{ width: "80px" }} />
              <span>/</span>
              <input type="number" name="eleventh_max_marks" value={formData.eleventh_max_marks} onChange={handleChange} style={{ width: "80px" }} />
            </div>
          </div>
          <div className="form-group">
            <label>Percentage of Marks</label>
            <input type="text" name="eleventh_percentage" value={formData.eleventh_percentage} readOnly style={{ backgroundColor: "#f8f9fa" }} />
          </div>
        </div>
      </div>

      {/* CLASS X SECTION */}
      <div className="form-subsection" style={{ marginTop: "30px" }}>
        <h3 className="subsection-title">Class X Details</h3>
        <div className="form-grid">
          <div className="form-group grid-span-2">
            <label>Institution Name</label>
            <input type="text" name="tenth_school" value={formData.tenth_school} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Medium of Study</label>
            <input type="text" name="tenth_medium" value={formData.tenth_medium} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Month & Year of Passing</label>
            <input type="text" name="tenth_year" placeholder="e.g. March 2023" value={formData.tenth_year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Name of the Board</label>
            <input type="text" name="tenth_board" value={formData.tenth_board} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Total Marks Obtained / Max Marks</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="number" name="tenth_total_marks" value={formData.tenth_total_marks} onChange={handleChange} style={{ width: "80px" }} />
              <span>/</span>
              <input type="number" name="tenth_max_marks" value={formData.tenth_max_marks} onChange={handleChange} style={{ width: "80px" }} />
            </div>
          </div>
          <div className="form-group">
            <label>Percentage of Marks</label>
            <input type="text" name="tenth_percentage" value={formData.tenth_percentage} readOnly style={{ backgroundColor: "#f8f9fa" }} />
          </div>
        </div>
      </div>

      {/* CLASS XII / DIPLOMA SECTION */}
      <div className="form-subsection" style={{ marginTop: "30px" }}>
        <h3 className="subsection-title">Class XII / Diploma Details</h3>
        <div className="form-grid">
          <div className="form-group grid-span-2">
            <label>Institution Name</label>
            <input type="text" name="twelfth_school" value={formData.twelfth_school} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Name of the Board</label>
            <input type="text" name="twelfth_board" value={formData.twelfth_board} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Medium of Study</label>
            <input type="text" name="twelfth_medium" value={formData.twelfth_medium} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Reg No.</label>
            <input type="text" name="twelfth_reg_no" value={formData.twelfth_reg_no} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Month & Year of Passing</label>
            <input type="text" name="twelfth_year" placeholder="e.g. March 2025" value={formData.twelfth_year} onChange={handleChange} />
          </div>
        </div>

        {/* MARKS TABLE */}
        <div style={{ marginTop: "20px", overflowX: "auto" }}>
          <h4 style={{ marginBottom: "10px", color: "var(--primary-dark)" }}>Marks Obtained in Class XII</h4>
          <table className="marks-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Subject</th>
                <th>Marks Obtained</th>
                <th>Max Marks</th>
                <th>Month & Year of Passing</th>
              </tr>
            </thead>
            <tbody>
              {formData.twelfth_marks_json.map((mark, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={mark.subject}
                      onChange={(e) => handleMarkChange(index, "subject", e.target.value)}
                      placeholder={index >= 2 ? `Subject ${index - 1}` : ""}
                    />
                  </td>
                  <td>
                    <input type="number" value={mark.marks} onChange={(e) => handleMarkChange(index, "marks", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={mark.max} onChange={(e) => handleMarkChange(index, "max", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" value={mark.passing} onChange={(e) => handleMarkChange(index, "passing", e.target.value)} placeholder="e.g. MAR 2025" />
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>Total Marks:</td>
                <td style={{ fontWeight: "bold" }}>{formData.twelfth_total_marks}</td>
                <td style={{ fontWeight: "bold" }}>{formData.twelfth_max_marks}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="form-grid" style={{ marginTop: "20px" }}>
          <div className="form-group">
            <label>Percentage of Marks</label>
            <input type="text" value={formData.twelfth_percentage} readOnly style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }} />
          </div>
          <div className="form-group">
            <label>Cut off (Excluding Language Marks)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="text" value={formData.twelfth_cutoff} readOnly style={{ backgroundColor: "#fef3c7", fontWeight: "bold", border: "1px solid #f59e0b" }} />
              <span>/ 400</span>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-grid-right" style={{ marginTop: "40px" }}>
        <button onClick={handleSubmit} className="btn-primary" style={{ padding: "12px 30px" }}>
          Save Academic Details & Continue →
        </button>
      </div>

      <style jsx>{`
        .marks-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .marks-table th {
          background: var(--primary-color, #4f46e5);
          color: white;
          padding: 12px;
          text-align: left;
          font-size: 0.9rem;
        }
        .marks-table td {
          padding: 10px;
          border-bottom: 1px solid #f1f5f9;
        }
        .marks-table input {
          width: 100%;
          border: 1px solid #e2e8f0;
          padding: 8px;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .marks-table input:focus {
          border-color: var(--primary-color);
          outline: none;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }
        .total-row {
          background: #f8fafc;
        }
        .academic-details-container input[readonly] {
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default AcademicDetails;

