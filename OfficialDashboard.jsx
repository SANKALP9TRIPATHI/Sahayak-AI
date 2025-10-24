import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";

export default function OfficialDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("submissions") || "[]");
    setSubmissions(data);
  }, []);

  const handleStatus = (index, status) => {
    const newSubs = [...submissions];
    newSubs[index].status = status;
    if (status === "Approved" || status === "Pending") {
      newSubs[index].eta = Math.floor(Math.random() * 5 + 1); // ETA 1–5 days
    } else {
      newSubs[index].eta = "";
    }
    setSubmissions(newSubs);
    localStorage.setItem("submissions", JSON.stringify(newSubs));
  };

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  const getColor = (status) => {
    if (status === "Approved") return "#d4edda";
    if (status === "Pending") return "#fff3cd";
    if (status === "Rejected") return "#f8d7da";
    return "#f5f3f0";
  };

  return (
    <div className="container fullscreen">
      <div className="header">
        <h2>Official Dashboard</h2>
        <div>
          <Link to="/about"><button>About</button></Link>
          <Link to="/contact"><button style={{marginLeft:8}}>Contact Us</button></Link>
          <Link to="/"><button style={{marginLeft:8}}>Logout</button></Link>
        </div>
      </div>

      {submissions.length === 0 && <p>No submissions yet.</p>}

      {submissions.map((s, i) => (
        <div key={i} style={{
          background: getColor(s.status),
          padding: 15,
          marginTop: 12,
          borderRadius: 8,
          border: "1px solid #8b5e3c"
        }}>
          <p><b>Type:</b> {s.type || "N/A"}</p>
          <p><b>Name:</b> {s.identity?.Name || "N/A"}</p>
          <p><b>DOB:</b> {s.identity?.DOB || "N/A"}</p>
          <p><b>Gender:</b> {s.identity?.Gender || "N/A"}</p>
          <p><b>Aadhaar:</b> {s.identity?.Aadhaar_Number || "N/A"}</p>
          <p><b>Address:</b> {s.identity?.Address || "N/A"}</p>

          {s.frontFile && <button onClick={() => downloadFile(s.frontFile)}>View Front</button>}
          {s.backFile && <button onClick={() => downloadFile(s.backFile)}>View Back</button>}
          {s.application && <button onClick={() => downloadFile(s.application)}>View Application</button>}

          <p><b>Status:</b> {s.status || "Pending"}</p>
          {s.eta && <p><b>ETA:</b> {s.eta} days</p>}

          <div className="stack" style={{flexDirection:"row", gap:10, marginTop:5}}>
            <button onClick={() => handleStatus(i, "Approved")}>Approve</button>
            <button onClick={() => handleStatus(i, "Pending")}>Pending</button>
            <button onClick={() => handleStatus(i, "Rejected")}>Reject</button>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}

