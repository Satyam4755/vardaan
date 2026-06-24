import React from 'react';

const PremiumLoader = ({ 
  title = "Just wait for a while, we'll be right there...", 
  subtitle = "Our workspace is waking up and preparing your dashboard." 
}) => {
  return (
    <div className="global-loader-overlay">
      <div className="global-loader-content">
        <div className="loader-brand-orb">V</div>
        <h2 className="loader-title">{title}</h2>
        <p className="loader-subtitle">{subtitle}</p>
        <div className="loader-progress"></div>
      </div>
    </div>
  );
};

export default PremiumLoader;
