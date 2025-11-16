// src/components/TestDashboard.js - CREA QUESTO FILE
import React from 'react';
import VehicleManager from './VehicleManager.js';
import './Dashboard.css';

const TestDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Test Vehicle Manager</h1>
          <p>Se vedi questo, l'integrazione funziona</p>
        </div>
      </div>

      {/* DIRECT VEHICLE MANAGER - SEMPRE VISIBILE */}
      <VehicleManager user={user} />
    </div>
  );
};

export default TestDashboard;
