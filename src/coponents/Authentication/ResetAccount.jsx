import React, { useState } from 'react';
import API from '../Authentication/api';
import './ResetAccount.css';

export default function ResetAccount() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');

    try {
      const res = await API.post('/reset', { email });
      setMsg(res.data.msg || 'If this email exists, a reset link has been sent.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Failed to send reset request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Reset Account</h2>
          <p className="auth-subtitle">
            Enter your email to reset your password or recover your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'auth-button--loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="auth-button-spinner"></span>
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {msg && (
          <div
            className={`auth-message ${
              msg.toLowerCase().includes('sent') ? 'auth-message--success' : 'auth-message--error'
            }`}
          >
            <span className="auth-message-icon">
              {msg.toLowerCase().includes('sent') ? '✅' : '⚠️'}
            </span>
            {msg}
          </div>
        )}

        <div className="auth-footer">
          <p className="auth-footer-text">
            Remembered your password?{' '}
            <a href="/login" className="auth-footer-link">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
