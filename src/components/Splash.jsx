import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the main splash page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/splash');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo-container">
          <h1 className="logo-text">WedNest</h1>
          <div className="loading-animation">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash; 