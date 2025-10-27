import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from './api';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg('');

    if (password !== confirmPassword) {
      setMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('password', password);

      const res = await API.post(`/reset-password/${token}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg(res.data.msg || 'Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Reset failed. Link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pwd-reset-confirm-container">
      <div className="pwd-reset-confirm-card">
        {/* Header Section */}
        <div className="pwd-reset-confirm-header">
          <div className="pwd-reset-confirm-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9C7.9 7 7 7.9 7 9V14C7 15.1 7.9 16 9 16H15V17H9C6.79 17 5 15.21 5 13V9C5 6.79 6.79 5 9 5H15V3L21 5V7H19C17.9 7 17 7.9 17 9V14C17 15.1 17.9 16 19 16H21V18H19C16.79 18 15 16.21 15 14V9H21Z" fill="#10B981"/>
            </svg>
          </div>
          <h2 className="pwd-reset-confirm-title">Create New Password</h2>
          <p className="pwd-reset-confirm-subtitle">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleReset} className="pwd-reset-confirm-form">
          <div className="pwd-reset-confirm-form-group">
            <label htmlFor="password" className="pwd-reset-confirm-label">
              New Password
              <span className="pwd-reset-confirm-requirement"> (min. 6 characters)</span>
            </label>
            <input
              id="password"
              type="password"
              className="pwd-reset-confirm-input"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength="6"
            />
          </div>

          <div className="pwd-reset-confirm-form-group">
            <label htmlFor="confirmPassword" className="pwd-reset-confirm-label">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="pwd-reset-confirm-input"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength="6"
            />
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="pwd-reset-confirm-strength">
              <div className={`pwd-reset-confirm-strength-bar ${password.length >= 6 ? 'pwd-reset-confirm-strength-bar--strong' : 'pwd-reset-confirm-strength-bar--weak'}`}>
                <div 
                  className="pwd-reset-confirm-strength-fill"
                  style={{ width: `${Math.min((password.length / 8) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="pwd-reset-confirm-strength-text">
                {password.length >= 6 ? 'Strong password' : 'Weak password'}
              </span>
            </div>
          )}

          <button
            type="submit"
            className={`pwd-reset-confirm-button ${isLoading ? 'pwd-reset-confirm-button--loading' : ''}`}
            disabled={isLoading || password.length < 6}
          >
            {isLoading ? (
              <>
                <span className="pwd-reset-confirm-spinner"></span>
                Updating Password...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Message Section */}
        {msg && (
          <div className={`pwd-reset-confirm-message ${
            msg.includes('success') ? 'pwd-reset-confirm-message--success' : 
            msg.includes('match') || msg.includes('expired') || msg.includes('failed') ? 'pwd-reset-confirm-message--error' : 
            'pwd-reset-confirm-message--warning'
          }`}>
            <span className="pwd-reset-confirm-message-icon">
              {msg.includes('success') ? '✅' : 
               msg.includes('match') || msg.includes('expired') || msg.includes('failed') ? '⚠️' : 'ℹ️'}
            </span>
            <div className="pwd-reset-confirm-message-content">
              <span className="pwd-reset-confirm-message-text">{msg}</span>
              {msg.includes('success') && (
                <div className="pwd-reset-confirm-redirect">
                  Redirecting to login in 3 seconds...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="pwd-reset-confirm-footer">
          <p className="pwd-reset-confirm-footer-text">
            Remember your password?{' '}
            <Link to="/login" className="pwd-reset-confirm-footer-link">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}