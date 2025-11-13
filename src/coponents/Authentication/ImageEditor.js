import React, { useState, useEffect, useRef } from 'react';
import './ImageEditor.css'; // We'll create this CSS file

const ImageEditor = ({ image, onSave, onClose }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (image && canvasRef.current) {
      drawImage();
    }
  }, [image, scale, rotation, position]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Save context
      ctx.save();
      
      // Move to center of canvas
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Apply scale and position
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
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
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      onSave(blob);
    }, 'image/jpeg', 0.9);
  };

  return (
    <div className="image-editor-overlay">
      <div className="image-editor-modal">
        <div className="image-editor-header">
          <h3>Edit Profile Photo</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="image-editor-content">
          <div className="image-preview-container">
            <canvas
              ref={canvasRef}
              className="image-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
          
          <div className="editor-controls">
            <div className="control-group">
              <label>Zoom</label>
              <div className="zoom-controls">
                <button onClick={zoomOut} className="control-button">
                  <span>−</span>
                </button>
                <span className="scale-value">{Math.round(scale * 100)}%</span>
                <button onClick={zoomIn} className="control-button">
                  <span>+</span>
                </button>
              </div>
            </div>
            
            <div className="control-group">
              <label>Rotate</label>
              <div className="rotate-controls">
                <button onClick={rotateLeft} className="control-button">
                  <span>↶</span>
                </button>
                <span className="rotation-value">{rotation}°</span>
                <button onClick={rotateRight} className="control-button">
                  <span>↷</span>
                </button>
              </div>
            </div>
            
            <div className="control-group">
              <label>Position</label>
              <div className="position-hint">
                Drag the image to adjust position
              </div>
            </div>
          </div>
        </div>
        
        <div className="image-editor-actions">
          <button onClick={reset} className="editor-button editor-button--secondary">
            Reset
          </button>
          <button onClick={handleSave} className="editor-button editor-button--primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;