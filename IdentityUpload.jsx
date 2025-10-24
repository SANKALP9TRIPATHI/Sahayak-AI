import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdentityUpload() {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [type, setType] = useState("License Renewal");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!frontFile || !backFile) return;

    const readerFront = new FileReader();
    const readerBack = new FileReader();

    readerFront.onload = () => {
      readerBack.onload = () => {
        // Extracted mock data from license (simulate OCR)
        const identityData = {
          Name: "John Doe",
          DOB: "01-01-1990",
          Gender: "Male",
          Aadhaar_Number: "1234-5678-9012",
          Address: "123, Sample Street, City",
          Photo_Path: readerFront.result
        };

        const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
        submissions.push({
          type,
          identity: identityData,
          frontFile: { name: frontFile.name, data: readerFront.result },
          backFile: { name: backFile.name, data: readerBack.result },
          status: "Pending"
        });
        localStorage.setItem("submissions", JSON.stringify(submissions));
        navigate("/citizen");
      };
      readerBack.readAsDataURL(backFile);
    };
    readerFront.readAsDataURL(frontFile);
  }

  return (
    <div className="container fullscreen">
      <h3>Upload Identity Proof (Front & Back JPG)</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth:400 }}>
        <select value={type} onChange={e=>setType(e.target.value)} required>
          <option>License Renewal</option>
          <option>Loan</option>
          <option>Other</option>
        </select>
        <input type="file" accept=".jpg,.jpeg" onChange={e=>setFrontFile(e.target.files[0])} required />
        <input type="file" accept=".jpg,.jpeg" onChange={e=>setBackFile(e.target.files[0])} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

