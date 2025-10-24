import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
      const lastIndex = submissions.length - 1;
      submissions[lastIndex] = {
        ...submissions[lastIndex],
        application: { name: file.name, data: reader.result }
      };
      localStorage.setItem("submissions", JSON.stringify(submissions));
      navigate("/citizen");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="container fullscreen">
      <h3>Upload Application Form (JPG)</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth:400 }}>
        <input
          type="file"
          accept=".jpg,.jpeg"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <button type="submit" style={{marginTop:10}}>Submit</button>
      </form>
    </div>
  );
}

