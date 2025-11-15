// src/components/DashboardWithVehicles.js - FILE NUOVO
import React, { useState } from 'react';
import VehicleManager from './VehicleManager.js';
import './Dashboard.css';

const DashboardWithVehicles = ({ user }) => {
  const [showVehicleManager, setShowVehicleManager] = useState(false);

  // SE MOSTRIAMO IL VEHICLE MANAGER
  if (showVehicleManager) {
    return (
      <div className="dashboard">
        <div style={{
          padding: '1rem',
          background: '#3498db',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button 
            onClick={() => setShowVehicleManager(false)}
            style={{
              background: 'white',
              color: '#3498db',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ← Torna alla Dashboard
          </button>
          <h2 style={{ margin: 0 }}>🚗 Gestione Veicoli</h2>
        </div>
        <VehicleManager user={user} />
      </div>
    );
  }

  // DASHBOARD CON PULSANTE GESTIONE VEICOLI
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Benvenuto, {user.email}!</h1>
          <p>CareAuto Pro - Dashboard Completa</p>
        </div>
      </div>

      {/* Pulsante Gestione Veicoli Visibile */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        margin: '2rem 0'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚗</div>
        <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
          Gestione Veicoli
        </h2>
        <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>
          Aggiungi e gestisci i tuoi veicoli per il tracciamento GPS
        </p>
        <button 
          onClick={() => setShowVehicleManager(true)}
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🚗 APRI GESTIONE VEICOLI
        </button>
      </div>

      {/* Sezione Statistiche Esistenti (manteniamo la dashboard originale) */}
      <div className="stats-section">
        <h2>📊 Riepilogo Attività</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>24</h3>
              <p>Clienti Totali</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div className="stat-content">
              <h3>8</h3>
              <p>Interventi Oggi</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>3</h3>
              <p>Appuntamenti</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>€2.840</h3>
              <p>Fatturato Mese</p>
            </div>
          </div>
        </div>
      </div>

      {/* Azioni Rapide */}
      <div className="quick-actions-section">
        <h2>⚡ Azioni Rapide</h2>
        <div className="actions-grid">
          <button 
            className="action-btn"
            onClick={() => setShowVehicleManager(true)}
          >
            <span className="action-icon">🚗</span>
            <span className="action-text">Gestione Veicoli</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => alert('Nuovo Cliente - Funzionalità in sviluppo')}
          >
            <span className="action-icon">➕</span>
            <span className="action-text">Nuovo Cliente</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => alert('Nuovo Intervento - Funzionalità in sviluppo')}
          >
            <span className="action-icon">🔧</span>
            <span className="action-text">Nuovo Intervento</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardWithVehicles;
