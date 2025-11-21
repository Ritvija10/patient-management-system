import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./app.css"; // styles for the non-tailwind version

function AddPatient() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    weight: "",
    height: "",
    disease: "",
  });

  const api = "http://localhost:8001/api/patients";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add patient");

      alert("Patient added successfully!");

      setFormData({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        weight: "",
        height: "",
        disease: "",
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="page dark-blue">
      {/* horizontal and vertical white strips */}
      <div className="strip horizontal" />
      <div className="strip vertical" />

      <div className="card form-card" role="form">
        <h2 className="title">Add Patient</h2>

        <form onSubmit={handleSubmit} className="form">
          {[
            ["name", "Enter Patient Name"],
            ["age", "Enter Age"],
            ["gender", "Enter Gender"],
            ["bloodGroup", "Enter Blood Group"],
            ["weight", "Enter Weight (kg)"],
            ["height", "Enter Height (cm)"],
            ["disease", "Enter Disease"],
          ].map(([key, label]) => (
            <div key={key} className="form-row">
              <label className="label">{label}</label>
              <input
                name={key}
                type="text"
                required
                value={formData[key]}
                onChange={handleChange}
                className="input"
              />
            </div>
          ))}

          <button type="submit" className="btn primary">Submit</button>
        </form>
      </div>
    </div>
  );
}


function ViewPatients() {
  const [patients, setPatients] = useState([]);

  const api = "http://localhost:8001/api/patients";

 
  const loadPatients = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Failed to load patients", err);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${api}/${id}`, { method: "DELETE" });

      if (!res.ok) {
        alert("Failed to delete patient");
        return;
      }

      alert("Patient deleted successfully!");
      loadPatients();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting patient");
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="page dark-blue padded">
      <div className="strip horizontal" />
      <div className="strip vertical" />

      <div className="content-wrapper">
        <h1 className="title white">Patient Records</h1>

        <div className="list">
          {patients.length === 0 && <p className="white">No patient records found.</p>}

          {patients.map((p) => (
            <div key={p._id} className="card record-card">
              <h3 className="record-name">{p.name}</h3>
              <p><strong>ID:</strong> {p.patientID}</p>
              <p><strong>Age:</strong> {p.age}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
              <p><strong>Blood Group:</strong> {p.bloodGroup}</p>
              <p><strong>Weight:</strong> {p.weight}</p>
              <p><strong>Height:</strong> {p.height}</p>
              <p><strong>Disease:</strong> {p.disease}</p>

              <button
                className="btn delete-btn"
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <header className="nav">
        <nav className="nav-inner">
          <Link to="/add" className="nav-link">Add Patient</Link>
          <Link to="/view" className="nav-link">View Patients</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/add" replace />} />
        <Route path="/add" element={<AddPatient />} />
        <Route path="/view" element={<ViewPatients />} />
      </Routes>
    </Router>
  );
}
