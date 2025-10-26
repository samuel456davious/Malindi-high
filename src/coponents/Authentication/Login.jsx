import React, { useState, useContext } from 'react';
import API from './api';
import { AuthContext } from '../Authentication/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');
    
    try {
      const res = await API.post('/login', { username, password });
      login(res.data.access_token, res.data.role);
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <div className="form-label-container">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Link to="/reset-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {msg && (
          <div className="auth-message auth-message--error">
            <span className="auth-message-icon">⚠️</span>
            {msg}
          </div>
        )}

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-footer-link">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}