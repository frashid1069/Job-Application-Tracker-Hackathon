import React from 'react';
import './css/Features.css';

function Features() {
  return (
    <div className="FeaturesSection">
      <div className="feature-item">
        <img src="job-matches-icon.png" alt="Job Matches"/>
        <p>Job Matches</p>
      </div>
      <div className="feature-item">
        <img src="copilot-extension-icon.png" alt="Copilot Extension"/>
        <p>Copilot Extension</p>
      </div>
      <div className="feature-item">
        <img src="ai-resume-builder-icon.png" alt="AI Resume Builder"/>
        <p>AI Resume Builder</p>
      </div>
      <div className="feature-item">
        <img src="job-tracker-icon.png" alt="Job Tracker"/>
        <p>Job Tracker</p>
      </div>
    </div>
  );
}

export default Features;
