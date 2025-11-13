// Aggiornamento di src/components/Dashboard.js
import React from 'react';
import AdBanner from './AdBanner';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      {/* Banner Ad in alto */}
      <AdBanner position="top" adType="banner" />

      <div className="welcome-section">
        <h1>Benvenuto, {user.email}!</h1>
        <p>Ecco il riepilogo della tua attività</p>
      </div>

      {/* Statistiche */}
      <div className="stats-grid">
        {/* ... statistiche esistenti ... */}
      </div>

      {/* Banner Ad nel mezzo */}
      <AdBanner position="middle" adType="banner" />

      {/* Attività Recenti */}
      <div className="recent-activities">
        {/* ... attività esistenti ... */}
      </div>

      {/* Banner Ad in fondo */}
      <AdBanner position="bottom" adType="banner" />
    </div>
  );
};

export default Dashboard;
