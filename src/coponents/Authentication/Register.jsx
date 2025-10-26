import React, { useState } from 'react';
import API from '../Authentication/api';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePhoto: null
  });
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMsg('Please select an image file');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMsg('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null
    }));
    setPreviewUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');

    try {
      const submitData = new FormData();
      submitData.append('username', formData.username);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      if (formData.profilePhoto) {
        submitData.append('profilePhoto', formData.profilePhoto);
      }

      const res = await API.post('/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg(res.data.msg || 'Registration successful! You can now login.');
      
      // Reset form on success
      if (res.status === 201) {
        setFormData({
          username: '',
          email: '',
          password: '',
          profilePhoto: null
        });
        setPreviewUrl('');
      }
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Profile Photo Upload */}
          <div className="form-group">
            <label className="form-label">Profile Photo (Optional)</label>
            <div className="profile-photo-upload">
              <div className="profile-photo-preview">
                {previewUrl ? (
                  <div className="profile-photo-container">
                    <img 
                      src={previewUrl} 
                      alt="Profile preview" 
                      className="profile-photo-image"
                    />
                    <button
                      type="button"
                      className="profile-photo-remove"
                      onClick={removeProfilePhoto}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="profile-photo-placeholder">
                    <svg className="profile-photo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="file-upload-label">
                <input
                  type="file"
                  className="file-upload-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <span className="file-upload-button">
                  Choose Photo
                </span>
              </label>
            </div>
          </div>

          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              minLength="6"
            />
            <div className="password-hint">
              Password must be at least 6 characters long
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${isLoading ? 'auth-button--loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="auth-button-spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {msg && (
          <div className={`auth-message ${msg.includes('successful') ? 'auth-message--success' : 'auth-message--error'}`}>
            <span className="auth-message-icon">
              {msg.includes('successful') ? '✅' : '⚠️'}
            </span>
            {msg}
          </div>
        )}

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account?{' '}
            <a href="/login" className="auth-footer-link">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}