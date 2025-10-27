import React, { useState } from 'react';
import API from './api'; // axios instance
import { Link } from 'react-router-dom';
import './ResetAccount.css';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');

    try {
      const formData = new FormData();
      formData.append('email', email);

      const res = await API.post('/request-password-reset', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg(res.data.msg || 'If this email exists, a reset link will be sent.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error sending reset request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pwd-reset-container">
      <div className="pwd-reset-card">
        {/* Header Section */}
        <div className="pwd-reset-header">
          <div className="pwd-reset-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8V6C17 3.79 15.21 2 13 2H11C8.79 2 7 3.79 7 6V8H5C3.9 8 3 8.9 3 10V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V10C21 8.9 20.1 8 19 8H17ZM9 6C9 4.9 9.9 4 11 4H13C14.1 4 15 4.9 15 6V8H9V6ZM19 20H5V10H19V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="#3B82F6"/>
            </svg>
          </div>
          <h2 className="pwd-reset-title">Reset Your Password</h2>
          <p className="pwd-reset-subtitle">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="pwd-reset-form">
          <div className="pwd-reset-form-group">
            <label htmlFor="email" className="pwd-reset-label">Email Address</label>
            <input
              id="email"
              type="email"
              className="pwd-reset-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={`pwd-reset-button ${isLoading ? 'pwd-reset-button--loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="pwd-reset-spinner"></span>
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Message Section */}
        {msg && (
          <div className={`pwd-reset-message ${msg.includes('Error') ? 'pwd-reset-message--error' : 'pwd-reset-message--success'}`}>
            <span className="pwd-reset-message-icon">
              {msg.includes('Error') ? '⚠️' : '📩'}
            </span>
            <span className="pwd-reset-message-text">{msg}</span>
          </div>
        )}

        {/* Footer Section */}
        <div className="pwd-reset-footer">
          <p className="pwd-reset-footer-text">
            Remember your password?{' '}
            <Link to="/login" className="pwd-reset-footer-link">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}