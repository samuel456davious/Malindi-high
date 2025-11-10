import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import "./StudentLogin.css";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (admissionNumber && password) {
      setToastMsg({
        type: "success",
        title: "Login Successful",
        message: "Welcome to Malindi High School Student Portal",
      });

      setTimeout(() => navigate("/student-portal"), 1500);
    } else {
      setToastMsg({
        type: "error",
        title: "Login Failed",
        message: "Please enter your admission number and password",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-wrapper">
            <div className="logo-circle">
              <GraduationCap size={48} color="#004aad" />
            </div>
          </div>
          <h1>Student Portal</h1>
          <p className="subtitle">Malindi High School</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="admission">Admission Number</label>
            <input
              id="admission"
              type="text"
              placeholder="MHS/2023/001"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot">
              <button type="button" className="link-btn">
                Forgot password?
              </button>
            </div>
          </div>

          <div className="remember">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>

          <p className="demo-text">
            Demo: Use any admission number and password
          </p>
        </form>
      </div>

      {toastMsg && (
        <div className={`toast ${toastMsg.type}`}>
          <strong>{toastMsg.title}</strong>
          <p>{toastMsg.message}</p>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
