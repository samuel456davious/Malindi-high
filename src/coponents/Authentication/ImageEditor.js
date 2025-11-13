// ImageEditor.js
import React, { useState, useEffect, useRef } from 'react';
import './ImageEditor.css';

const ImageEditor = ({ image, onSave, onClose, avatarMode = false, theme = 'light' }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState('#f8fafc');
  const [avatarShape, setAvatarShape] = useState('circle');
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0
  });
  const [activeTab, setActiveTab] = useState('adjust'); // 'adjust', 'filters', 'background'

  useEffect(() => {
    if (image && canvasRef.current) {
      drawImage();
    }
  }, [image, scale, rotation, position, backgroundColor, avatarShape, filters, currentTheme]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size
      const size = avatarMode ? 320 : 400;
      canvas.width = size;
      canvas.height = size;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = backgroundColor;
      if (avatarMode) {
        if (avatarShape === 'circle') {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (avatarShape === 'rounded') {
          const radius = 24;
          ctx.beginPath();
          ctx.moveTo(radius, 0);
          ctx.lineTo(size - radius, 0);
          ctx.quadraticCurveTo(size, 0, size, radius);
          ctx.lineTo(size, size - radius);
          ctx.quadraticCurveTo(size, size, size - radius, size);
          ctx.lineTo(radius, size);
          ctx.quadraticCurveTo(0, size, 0, size - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // square
          ctx.fillRect(0, 0, size, size);
        }
      } else {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Save context for clipping if in avatar mode
      if (avatarMode) {
        ctx.save();
        if (avatarShape === 'circle') {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.clip();
        } else if (avatarShape === 'rounded') {
          const radius = 24;
          ctx.beginPath();
          ctx.moveTo(radius, 0);
          ctx.lineTo(size - radius, 0);
          ctx.quadraticCurveTo(size, 0, size, radius);
          ctx.lineTo(size, size - radius);
          ctx.quadraticCurveTo(size, size, size - radius, size);
          ctx.lineTo(radius, size);
          ctx.quadraticCurveTo(0, size, 0, size - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
          ctx.closePath();
          ctx.clip();
        }
        // For square, no clipping needed
      }
      
      // Save context for transformations
      ctx.save();
      
      // Move to center of canvas
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Apply scale and position
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      // Apply filters
      ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        blur(${filters.blur}px)
      `;
      
      // Draw image
      ctx.drawImage(
        img,
        position.x - scaledWidth / 2,
        position.y - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );
      
      // Restore context
      ctx.restore();
      
      // Restore context for avatar mode clipping
      if (avatarMode) {
        ctx.restore();
      }
    };
    
    img.src = image;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const rotateLeft = () => {
    setRotation(prev => prev - 90);
  };

  const rotateRight = () => {
    setRotation(prev => prev + 90);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const reset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setBackgroundColor('#f8fafc');
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0
    });
    if (avatarMode) {
      setAvatarShape('circle');
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      onSave(blob);
    }, 'image/jpeg', 0.95);
  };

  const applyPresetFilter = (preset) => {
    switch (preset) {
      case 'vintage':
        setFilters({
          brightness: 110,
          contrast: 90,
          saturation: 85,
          blur: 0.5
        });
        break;
      case 'blackWhite':
        setFilters({
          brightness: 100,
          contrast: 120,
          saturation: 0,
          blur: 0
        });
        break;
      case 'warm':
        setFilters({
          brightness: 105,
          contrast: 95,
          saturation: 120,
          blur: 0
        });
        break;
      case 'cool':
        setFilters({
          brightness: 95,
          contrast: 110,
          saturation: 80,
          blur: 0.3
        });
        break;
      case 'dramatic':
        setFilters({
          brightness: 80,
          contrast: 130,
          saturation: 110,
          blur: 0
        });
        break;
      default:
        setFilters({
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0
        });
    }
  };

  const applyTheme = (themeName) => {
    setCurrentTheme(themeName);
    // Apply theme-specific settings
    switch (themeName) {
      case 'dark':
        setBackgroundColor('#1e293b');
        break;
      case 'professional':
        setBackgroundColor('#334155');
        setFilters({
          brightness: 95,
          contrast: 110,
          saturation: 90,
          blur: 0
        });
        break;
      case 'vibrant':
        setBackgroundColor('#2563eb');
        setFilters({
          brightness: 110,
          contrast: 105,
          saturation: 120,
          blur: 0
        });
        break;
      case 'minimal':
        setBackgroundColor('#ffffff');
        setFilters({
          brightness: 105,
          contrast: 100,
          saturation: 95,
          blur: 0
        });
        break;
      default:
        setBackgroundColor('#f8fafc');
        setFilters({
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0
        });
    }
  };

  // Predefined background colors
  const backgroundColors = [
    '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
    '#ffffff', '#0f172a', '#475569', '#1e293b'
  ];

  // Theme options
  const themes = [
    { id: 'light', name: 'Light', color: '#f8fafc', icon: '☀️' },
    { id: 'dark', name: 'Dark', color: '#1e293b', icon: '🌙' },
    { id: 'professional', name: 'Pro', color: '#334155', icon: '⚡' },
    { id: 'vibrant', name: 'Vibrant', color: '#2563eb', icon: '🎨' },
    { id: 'minimal', name: 'Minimal', color: '#ffffff', icon: '⬜' }
  ];

  // Filter presets
  const filterPresets = [
    { id: 'normal', name: 'Original', icon: '🔄' },
    { id: 'vintage', name: 'Vintage', icon: '📻' },
    { id: 'blackWhite', name: 'Monochrome', icon: '⚫' },
    { id: 'warm', name: 'Warm', icon: '🔥' },
    { id: 'cool', name: 'Cool', icon: '❄️' },
    { id: 'dramatic', name: 'Dramatic', icon: '🎭' }
  ];

  const tabs = [
    { id: 'adjust', name: 'Adjust', icon: '⚙️' },
    { id: 'filters', name: 'Filters', icon: '🎨' },
    { id: 'background', name: 'Background', icon: '🖼️' }
  ];

  return (
    <div className={`image-editor-overlay image-editor--${currentTheme}`}>
      <div className="image-editor-modal">
        <div className="image-editor-header">
          <div className="header-content">
            <div className="header-title">
              <h3>{avatarMode ? 'Avatar Editor' : 'Image Editor'}</h3>
              <p className="header-subtitle">Edit your {avatarMode ? 'avatar' : 'profile photo'} with professional tools</p>
            </div>
            <button className="close-button" onClick={onClose}>
              <span>×</span>
            </button>
          </div>
        </div>
        
        <div className="image-editor-main">
          <div className="preview-section">
            <div className="preview-container">
              <div className="preview-header">
                <span className="preview-label">Preview</span>
                <div className="preview-actions">
                  <button 
                    className="preview-action-btn"
                    onClick={reset}
                    title="Reset all changes"
                  >
                    ↺ Reset
                  </button>
                </div>
              </div>
              <div className="canvas-container">
                <canvas
                  ref={canvasRef}
                  className={`image-canvas ${avatarMode ? 'image-canvas--avatar' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                <div className="canvas-overlay">
                  <div className="drag-hint">Drag to reposition image</div>
                </div>
              </div>
            </div>
          </div>

          <div className="controls-section">
            <div className="controls-header">
              <div className="tabs-container">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'tab-button--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-name">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="controls-content">
              {/* Theme Selector - Always visible */}
              <div className="control-section">
                <div className="section-header">
                  <span className="section-title">Workspace Theme</span>
                </div>
                <div className="theme-controls">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      className={`theme-button ${currentTheme === theme.id ? 'theme-button--active' : ''}`}
                      onClick={() => applyTheme(theme.id)}
                      title={theme.name}
                    >
                      <span className="theme-icon">{theme.icon}</span>
                      <div 
                        className="theme-swatch" 
                        style={{ backgroundColor: theme.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Adjust Tab */}
              {activeTab === 'adjust' && (
                <div className="control-section">
                  <div className="section-header">
                    <span className="section-title">Basic Adjustments</span>
                  </div>
                  
                  <div className="adjustment-controls">
                    <div className="adjustment-group">
                      <label className="adjustment-label">
                        <span>Zoom</span>
                        <span className="value-display">{Math.round(scale * 100)}%</span>
                      </label>
                      <div className="zoom-controls">
                        <button onClick={zoomOut} className="control-btn control-btn--secondary">
                          <span className="control-icon">−</span>
                        </button>
                        <input
                          type="range"
                          min="50"
                          max="300"
                          value={scale * 100}
                          onChange={(e) => setScale(parseInt(e.target.value) / 100)}
                          className="range-slider"
                        />
                        <button onClick={zoomIn} className="control-btn control-btn--secondary">
                          <span className="control-icon">+</span>
                        </button>
                      </div>
                    </div>

                    <div className="adjustment-group">
                      <label className="adjustment-label">
                        <span>Rotation</span>
                        <span className="value-display">{rotation}°</span>
                      </label>
                      <div className="rotation-controls">
                        <button onClick={rotateLeft} className="control-btn control-btn--secondary">
                          <span className="control-icon">↶</span>
                        </button>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={rotation}
                          onChange={(e) => setRotation(parseInt(e.target.value))}
                          className="range-slider"
                        />
                        <button onClick={rotateRight} className="control-btn control-btn--secondary">
                          <span className="control-icon">↷</span>
                        </button>
                      </div>
                    </div>

                    {/* Avatar Shape Selector */}
                    {avatarMode && (
                      <div className="adjustment-group">
                        <label className="adjustment-label">Avatar Shape</label>
                        <div className="shape-controls">
                          <button 
                            className={`shape-option ${avatarShape === 'circle' ? 'shape-option--active' : ''}`}
                            onClick={() => setAvatarShape('circle')}
                            title="Circle"
                          >
                            <div className="shape-preview shape-preview--circle"></div>
                            <span className="shape-label">Circle</span>
                          </button>
                          <button 
                            className={`shape-option ${avatarShape === 'rounded' ? 'shape-option--active' : ''}`}
                            onClick={() => setAvatarShape('rounded')}
                            title="Rounded Square"
                          >
                            <div className="shape-preview shape-preview--rounded"></div>
                            <span className="shape-label">Rounded</span>
                          </button>
                          <button 
                            className={`shape-option ${avatarShape === 'square' ? 'shape-option--active' : ''}`}
                            onClick={() => setAvatarShape('square')}
                            title="Square"
                          >
                            <div className="shape-preview shape-preview--square"></div>
                            <span className="shape-label">Square</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Filters Tab */}
              {activeTab === 'filters' && (
                <div className="control-section">
                  <div className="section-header">
                    <span className="section-title">Filters & Effects</span>
                  </div>

                  <div className="filters-grid">
                    {filterPresets.map((preset) => (
                      <button
                        key={preset.id}
                        className={`filter-preset ${filters.brightness === 100 && filters.contrast === 100 && filters.saturation === 100 && preset.id === 'normal' ? 'filter-preset--active' : ''}`}
                        onClick={() => applyPresetFilter(preset.id)}
                      >
                        <span className="filter-icon">{preset.icon}</span>
                        <span className="filter-name">{preset.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="manual-controls">
                    <div className="slider-group">
                      <label className="slider-label">
                        <span>Brightness</span>
                        <span className="slider-value">{filters.brightness}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={filters.brightness}
                        onChange={(e) => setFilters(prev => ({ ...prev, brightness: parseInt(e.target.value) }))}
                        className="professional-slider"
                      />
                    </div>
                    <div className="slider-group">
                      <label className="slider-label">
                        <span>Contrast</span>
                        <span className="slider-value">{filters.contrast}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={filters.contrast}
                        onChange={(e) => setFilters(prev => ({ ...prev, contrast: parseInt(e.target.value) }))}
                        className="professional-slider"
                      />
                    </div>
                    <div className="slider-group">
                      <label className="slider-label">
                        <span>Saturation</span>
                        <span className="slider-value">{filters.saturation}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={filters.saturation}
                        onChange={(e) => setFilters(prev => ({ ...prev, saturation: parseInt(e.target.value) }))}
                        className="professional-slider"
                      />
                    </div>
                    <div className="slider-group">
                      <label className="slider-label">
                        <span>Blur</span>
                        <span className="slider-value">{filters.blur}px</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.blur}
                        onChange={(e) => setFilters(prev => ({ ...prev, blur: parseFloat(e.target.value) }))}
                        className="professional-slider"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Background Tab */}
              {activeTab === 'background' && (
                <div className="control-section">
                  <div className="section-header">
                    <span className="section-title">Background Settings</span>
                  </div>

                  <div className="color-grid">
                    {backgroundColors.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${backgroundColor === color ? 'color-option--active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBackgroundColor(color)}
                        title={color}
                      >
                        {backgroundColor === color && (
                          <div className="color-check">✓</div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="custom-color">
                    <label className="custom-color-label">Custom Color</label>
                    <div className="color-picker-wrapper">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="color-picker-input"
                      />
                      <span className="color-hex">{backgroundColor}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="image-editor-actions">
          <div className="actions-content">
            <button onClick={reset} className="action-btn action-btn--secondary">
              <span className="btn-icon">↺</span>
              Reset All
            </button>
            <button onClick={handleSave} className="action-btn action-btn--primary">
              <span className="btn-icon">💾</span>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;