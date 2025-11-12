import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  // Dati mock per la demo
  const stats = [
    { label: 'Clienti Attivi', value: '24', icon: '👥' },
    { label: 'Interventi Oggi', value: '8', icon: '🔧' },
    { label: 'Appuntamenti', value: '3', icon: '📅' },
    { label: 'Fatturato Mese', value: '€2.840', icon: '💰' }
  ];

  const recentActivities = [
    { id: 1, action: 'Cambio olio', client: 'Mario Rossi', time: '2 ore fa', status: 'completato' },
    { id: 2, action: 'Revisione', client: 'Luigi Verdi', time: '1 giorno fa', status: 'in corso' },
    { id: 3, action: 'Tagliando', client: 'Anna Bianchi', time: '2 giorni fa', status: 'programmato' }
  ];

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Benvenuto, {user.email}!</h1>
        <p>Ecco il riepilogo della tua attività</p>
      </div>

      {/* Statistiche */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attività Recenti */}
      <div className="recent-activities">
        <h2>Attività Recenti</h2>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-info">
                <h4>{activity.action}</h4>
                <p>Cliente: {activity.client}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
              <div className={`activity-status ${activity.status}`}>
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Azioni Rapide</h2>
        <div className="actions-grid">
          <button className="action-btn">➕ Nuovo Cliente</button>
          <button className="action-btn">🔧 Nuovo Intervento</button>
          <button className="action-btn">📅 Nuovo Appuntamento</button>
          <button className="action-btn">📊 Report Mensile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
