import React, { useEffect, useState } from 'react';
import './DoorAnimation.css';

const DoorAnimation = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3001);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="door-container">
      <div className={`door-left ${isOpening ? 'opening' : ''}`}>
        <div className="door-handle"></div>
      </div>
      <div className={`door-right ${isOpening ? 'opening' : ''}`}>
        <div className="door-handle"></div>
      </div>
      <div className={`welcome-text ${isOpening ? 'fade-in' : ''}`}>
        <h1>Welcome to Dreamy Beds</h1>
        <p>Premium Bed & Pillow Covers</p>
      </div>
    </div>
  );
};

export default DoorAnimation;