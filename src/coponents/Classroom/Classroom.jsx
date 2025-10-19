import React, { useState } from "react";
import "./Classroom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, FileText, Download, BookOpen, GraduationCap } from "lucide-react";

const Classroom = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [materialType, setMaterialType] = useState("note");

  const handleUpload = (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      toast.error("Please fill in all fields and select a file.");
      return;
    }

    const newMaterial = {
      id: Date.now().toString(),
      title,
      description,
      fileName: file.name,
      uploadedBy: "Teacher",
      uploadedAt: new Date().toLocaleDateString(),
      type: materialType,
    };

    setMaterials([newMaterial, ...materials]);
    setTitle("");
    setDescription("");
    setFile(null);

    toast.success(
      `${materialType === "note" ? "Note" : "Homework"} uploaded successfully!`
    );
  };

  return (
    <div className="classroom-page">
      <header className="classroom-header">
        <h1>Virtual Classroom</h1>
        <p>Share and access educational materials</p>
      </header>

      {/* === Tabs === */}
      <div className="tab-buttons">
        <button
          className={activeTab === "student" ? "active" : ""}
          onClick={() => setActiveTab("student")}
        >
          <GraduationCap className="icon" /> Student View
        </button>
        <button
          className={activeTab === "teacher" ? "active" : ""}
          onClick={() => setActiveTab("teacher")}
        >
          <BookOpen className="icon" /> Teacher View
        </button>
      </div>

      {/* === Student View === */}
      {activeTab === "student" && (
        <div className="student-view">
          <h2>Available Materials</h2>

          {materials.length === 0 ? (
            <div className="empty-card">
              <FileText className="icon-large" />
              <p>No materials available yet.</p>
              <p className="subtext">Check back later for updates.</p>
            </div>
          ) : (
            <div className="materials-grid">
              {materials.map((m) => (
                <div key={m.id} className="material-card">
                  <h3>{m.title}</h3>
                  <p className="description">{m.description}</p>
                  <p className="meta">
                    📎 {m.fileName} | 👤 {m.uploadedBy} | 📅 {m.uploadedAt}
                  </p>
                  <button className="download-btn">
                    <Download className="icon-sm" /> Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === Teacher View === */}
      {activeTab === "teacher" && (
        <div className="teacher-view">
          <form onSubmit={handleUpload} className="upload-form">
            <h2>
              <Upload className="icon" /> Upload Material
            </h2>

            <label>Material Type</label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="note">Class Notes</option>
              <option value="homework">Homework</option>
            </select>

            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 5 - Algebra"
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the material"
            ></textarea>

            <label>File</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
            <p className="note">Accepted: PDF, DOC, PPT, TXT</p>

            <button type="submit" className="upload-btn">
              Upload Material
            </button>
          </form>

          <div className="uploaded-section">
            <h2>Uploaded Materials</h2>

            {materials.length === 0 ? (
              <div className="empty-card">
                <FileText className="icon-large" />
                <p>No materials uploaded yet.</p>
              </div>
            ) : (
              <div className="materials-grid">
                {materials.map((m) => (
                  <div key={m.id} className="material-card">
                    <h3>{m.title}</h3>
                    <p className="description">{m.description}</p>
                    <p className="meta">
                      📎 {m.fileName} | 👤 {m.uploadedBy} | 📅 {m.uploadedAt}
                    </p>
                    <button className="download-btn">
                      <Download className="icon-sm" /> Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Classroom;
