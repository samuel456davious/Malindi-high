// Register.js
import React, { useState, useEffect } from 'react';
import API from '../Authentication/api';
import ImageEditor from './ImageEditor'; // Import the separated component
import './Register.css';

// Main Register Component
export default function Register({ user, onProfileUpdate, isEditMode = false }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePhoto: null,
    bio: '',
    phone: ''
  });
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState('');
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [originalImage, setOriginalImage] = useState('');

  // Initialize form with user data when in edit mode
  useEffect(() => {
    if (isEditMode && user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Don't pre-fill password for security
        profilePhoto: null,
        bio: user.bio || '',
        phone: user.phone || ''
      });
      setCurrentProfilePhoto(user.profilePhoto || '');
      setPreviewUrl(user.profilePhoto || '');
    }
  }, [isEditMode, user]);

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

      // Create preview and show editor
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result);
        setShowImageEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = (editedBlob) => {
    // Convert blob to file
    const file = new File([editedBlob], 'profile-photo.jpg', { type: 'image/jpeg' });
    
    setFormData(prev => ({
      ...prev,
      profilePhoto: file
    }));

    // Create preview from blob
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(editedBlob);

    setShowImageEditor(false);
  };

  const removeProfilePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null
    }));
    setPreviewUrl(currentProfilePhoto || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');

    try {
      const submitData = new FormData();
      submitData.append('username', formData.username);
      submitData.append('email', formData.email);
      
      // Only include password if it's provided (for updates) or in registration
      if (formData.password) {
        submitData.append('password', formData.password);
      }
      
      if (formData.profilePhoto) {
        submitData.append('profilePhoto', formData.profilePhoto);
      }
      
      if (formData.bio) {
        submitData.append('bio', formData.bio);
      }
      
      if (formData.phone) {
        submitData.append('phone', formData.phone);
      }

      let res;
      if (isEditMode) {
        // Update profile
        res = await API.put('/profile', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMsg(res.data.msg || 'Profile updated successfully!');
        
        // Notify parent component about profile update
        if (onProfileUpdate) {
          onProfileUpdate(res.data.user);
        }
      } else {
        // Register new user
        res = await API.post('/register', submitData, {
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
            profilePhoto: null,
            bio: '',
            phone: ''
          });
          setPreviewUrl('');
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 
        (isEditMode ? 'Profile update failed. Please try again.' : 'Registration failed. Please try again.');
      setMsg(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original user data
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '',
        profilePhoto: null,
        bio: user.bio || '',
        phone: user.phone || ''
      });
      setPreviewUrl(user.profilePhoto || '');
    }
    setMsg('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">
            {isEditMode ? 'Edit Profile' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {isEditMode ? 'Update your profile information' : 'Join us today and get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Profile Photo Upload */}
          <div className="form-group">
            <label className="form-label">
              Profile Photo {!isEditMode && '(Optional)'}
            </label>
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
                  {previewUrl ? 'Change Photo' : 'Choose Photo'}
                </span>
              </label>
              {previewUrl && (
                <button
                  type="button"
                  className="edit-photo-button"
                  onClick={() => setShowImageEditor(true)}
                >
                  Edit Photo
                </button>
              )}
            </div>
          </div>

          {/* Rest of the form fields remain the same */}
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

          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="form-input form-textarea"
              placeholder="Tell us a little about yourself"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={isLoading}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password {isEditMode ? '(Leave blank to keep current)' : '*'}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder={isEditMode ? "Enter new password (optional)" : "Create a strong password"}
              value={formData.password}
              onChange={handleInputChange}
              required={!isEditMode}
              disabled={isLoading}
              minLength="6"
            />
            <div className="password-hint">
              Password must be at least 6 characters long
            </div>
          </div>

          <div className="form-actions">
            {isEditMode && (
              <button 
                type="button"
                className="auth-button auth-button--secondary"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              className={`auth-button ${isLoading ? 'auth-button--loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="auth-button-spinner"></span>
                  {isEditMode ? 'Updating Profile...' : 'Creating Account...'}
                </>
              ) : (
                isEditMode ? 'Update Profile' : 'Create Account'
              )}
            </button>
          </div>
        </form>

        {msg && (
          <div className={`auth-message ${msg.includes('successful') ? 'auth-message--success' : 'auth-message--error'}`}>
            <span className="auth-message-icon">
              {msg.includes('successful') ? '✅' : '⚠️'}
            </span>
            {msg}
          </div>
        )}

        {!isEditMode && (
          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{' '}
              <a href="/login" className="auth-footer-link">
                Sign in here
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Image Editor Modal - Now using the separate component */}
      {showImageEditor && (
        <ImageEditor
          image={originalImage}
          onSave={handleImageSave}
          onClose={() => setShowImageEditor(false)}
        />
      )}
    </div>
  );
}