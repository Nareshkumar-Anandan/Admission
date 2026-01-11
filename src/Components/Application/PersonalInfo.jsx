import React, { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const PersonalInfo = ({ onNext, initialData, onCollegeChange }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        programme_applied: initialData?.programme_applied || "",
        full_name: initialData?.full_name || "",
        dob: initialData?.dob || "",
        gender: initialData?.gender || "",
        aadhaar_no: initialData?.aadhaar_no || "",
        nationality: initialData?.nationality || "Indian",
        religion: initialData?.religion || "",
        community: initialData?.community || "",
        caste: initialData?.caste || "",
        mother_tongue: initialData?.mother_tongue || "",
        blood_group: initialData?.blood_group || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        father_name: initialData?.father_name || "",
        mother_name: initialData?.mother_name || "",
        father_occupation: initialData?.father_occupation || "",
        mother_occupation: initialData?.mother_occupation || "",
        parent_phone: initialData?.parent_phone || "",
        annual_income: initialData?.annual_income || "",
        address: initialData?.address || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        pincode: initialData?.pincode || "",
        college_name: initialData?.college_name || "",
        guardian_name: initialData?.guardian_name || "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                // Ensure date is formatted correctly for input type="date"
                dob: initialData.dob ? new Date(initialData.dob).toISOString().split('T')[0] : prev.dob,
            }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Notify parent if college changes
        if (name === "college_name" && onCollegeChange) {
            onCollegeChange(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for critical fields
        if (!formData.full_name || !formData.email || !formData.phone || !formData.dob || !formData.gender || !formData.college_name) {
            alert("Please fill all required fields marked with *");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            await axios.post(
                `${APPLICATION_API}/personal`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Personal Information Saved ✅");
            onNext();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Failed to save personal information");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 🔹 NOTES FROM IMAGE */}
            <div className="application-notes">
                <strong>Note :</strong>
                <ul>
                    <li>Use separate application for each Programme.</li>
                    <li>Tick (✓) the relevant box wherever provided.</li>
                    <li>No column should be left blank. Write N.A against a column if the same does not apply.</li>
                    <li>Application incomplete in any respect is liable to be rejected.</li>
                </ul>
            </div>

            {/* 🔹 BASIC DETAILS SECTION */}
            <div className="form-subsection">
                <h3 className="subsection-title">Student Basic Details</h3>
                <div className="form-grid">
                    <div className="form-group grid-span-2">
                        <label>Selected College (From Registration)</label>
                        <select
                            name="college_name"
                            value={formData.college_name}
                            onChange={handleChange}
                            required
                            disabled
                            style={{ backgroundColor: "rgba(0,0,0,0.05)", cursor: "not-allowed" }}
                        >
                            <option value="">No college selected</option>
                            <option value="HICAS">Hindusthan College of Arts & Science</option>
                            <option value="HICET">Hindusthan College of Engineering and Technology</option>
                            <option value="HIT">Hindusthan Institute of Technology</option>
                            <option value="HCN">Hindusthan College of Nursing</option>
                            <option value="HCE">Hindusthan College of Education</option>
                            <option value="HISAC">Hindusthan International School and College</option>
                            <option value="HSOA">Hindusthan School of Architecture</option>
                            <option value="HICE">Hindusthan Institute of Creative Education</option>
                            <option value="HCHS">Hindusthan College of Health Sciences</option>
                        </select>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
                            * This field is fixed based on your registration details.
                        </span>
                    </div>

                    <div className="form-group grid-span-2">
                        <label>Programme Applied For</label>
                        <input
                            type="text"
                            name="programme_applied"
                            placeholder="Enter the programme name"
                            value={formData.programme_applied}
                            onChange={handleChange}
                            required
                            disabled
                            style={{ backgroundColor: "rgba(0,0,0,0.05)", cursor: "not-allowed" }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Full Name (In Block Letters) *</label>
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Enter full name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth *</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender *</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Aadhaar No.</label>
                        <input
                            type="text"
                            name="aadhaar_no"
                            placeholder="12-digit Aadhaar number"
                            value={formData.aadhaar_no}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nationality *</label>
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Religion</label>
                        <input
                            type="text"
                            name="religion"
                            placeholder="Religion"
                            value={formData.religion}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Community</label>
                        <select name="community" value={formData.community} onChange={handleChange}>
                            <option value="">Select Community</option>
                            <option value="OC">OC</option>
                            <option value="BCM">BCM</option>
                            <option value="BC">BC</option>
                            <option value="MBC/DNC">MBC / DNC</option>
                            <option value="SCA">SCA</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Caste</label>
                        <input
                            type="text"
                            name="caste"
                            placeholder="Caste"
                            value={formData.caste}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mother Tongue</label>
                        <input
                            type="text"
                            name="mother_tongue"
                            placeholder="Mother Tongue"
                            value={formData.mother_tongue}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Blood Group</label>
                        <input
                            type="text"
                            name="blood_group"
                            placeholder="e.g. O+ve"
                            value={formData.blood_group}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Mobile number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 🔹 PARENT DETAILS SECTION */}
            <div className="form-subsection">
                <h3 className="subsection-title">Parent Details</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Father's Name</label>
                        <input
                            type="text"
                            name="father_name"
                            placeholder="Father's name"
                            value={formData.father_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Father's Occupation</label>
                        <input
                            type="text"
                            name="father_occupation"
                            placeholder="Father's occupation"
                            value={formData.father_occupation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mother's Name</label>
                        <input
                            type="text"
                            name="mother_name"
                            placeholder="Mother's name"
                            value={formData.mother_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mother's Occupation</label>
                        <input
                            type="text"
                            name="mother_occupation"
                            placeholder="Mother's occupation"
                            value={formData.mother_occupation}
                            onChange={handleChange}
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
                        />
                    </div>

                    <div className="form-group">
                        <label>Guardian Name (If applicable)</label>
                        <input
                            type="text"
                            name="guardian_name"
                            placeholder="Guardian name"
                            value={formData.guardian_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Family Annual Income</label>
                        <input
                            type="number"
                            name="annual_income"
                            placeholder="Annual income"
                            value={formData.annual_income}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* 🔹 ADDRESS SECTION */}
            <div className="form-subsection">
                <h3 className="subsection-title">Address for Communication</h3>
                <div className="form-grid">
                    <div className="form-group grid-span-2">
                        <label>Full Address with Pincode *</label>
                        <textarea
                            name="address"
                            rows="3"
                            placeholder="Flat No, Street, Landmark, Pincode"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>City *</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>State *</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Pincode *</label>
                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="btn-grid-right">
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save & Continue →"}
                </button>
            </div>
        </form>
    );
};

export default PersonalInfo;
