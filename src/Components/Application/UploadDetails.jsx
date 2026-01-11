import React, { useState } from "react";
import axios from "axios";
import { APPLICATION_API } from "../../config";

const UploadDetails = ({ onNext, initialData }) => {
  const [files, setFiles] = useState({});

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit ❌");
      e.target.value = ""; // Reset input
      return;
    }
    setFiles({ ...files, [e.target.name]: file });
  };

  const handleUpload = async () => {
    if (!files.photo && !initialData?.photo) {
      alert("Please upload your passport size photo 📸");
      return;
    }

    const formData = new FormData();
    if (files.photo) formData.append("photo", files.photo);
    if (files.marksheet10) formData.append("marksheet10", files.marksheet10);
    if (files.marksheet12) formData.append("marksheet12", files.marksheet12);
    if (files.tc) formData.append("tc", files.tc);
    if (files.community) formData.append("community", files.community);

    try {
      await axios.post(`${APPLICATION_API}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Documents uploaded successfully ✅");
      onNext();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div>
      <div className="upload-grid">
        <div className="upload-card">
          <label>Passport Size Photo * (Max 5MB)</label>
          <input type="file" name="photo" onChange={handleChange} accept="image/*" />
          {initialData?.photo && (
            <span className="uploaded-badge">✓ Already Uploaded</span>
          )}
        </div>

        <div className="upload-card">
          <label>10th Marksheet (Max 5MB)</label>
          <input type="file" name="marksheet10" onChange={handleChange} />
          {initialData?.marksheet_10 && (
            <span className="uploaded-badge">✓ Already Uploaded</span>
          )}
        </div>

        <div className="upload-card">
          <label>12th / Diploma Marksheet (Max 5MB)</label>
          <input type="file" name="marksheet12" onChange={handleChange} />
          {initialData?.marksheet_12 && (
            <span className="uploaded-badge">✓ Already Uploaded</span>
          )}
        </div>

        <div className="upload-card">
          <label>Transfer Certificate (Max 5MB)</label>
          <input type="file" name="tc" onChange={handleChange} />
          {initialData?.transfer_certificate && (
            <span className="uploaded-badge">✓ Already Uploaded</span>
          )}
        </div>

        <div className="upload-card">
          <label>Community Certificate (Max 5MB)</label>
          <input type="file" name="community" onChange={handleChange} />
          {initialData?.community_certificate && (
            <span className="uploaded-badge">✓ Already Uploaded</span>
          )}
        </div>
      </div>

      <div className="btn-grid-right">
        <button onClick={handleUpload} className="btn-primary">
          Upload & Continue →
        </button>
      </div>
    </div>
  );
};

export default UploadDetails;
