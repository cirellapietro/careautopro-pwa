// VERIFICA CHE DashboardWithVehicles.js CONTENGA QUESTO CODICE COMPLETO:
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import VehicleManager from './VehicleManager.js';
import './Dashboard.css';

const DashboardWithVehicles = ({ user }) => {
  const [showVehicleManager, setShowVehicleManager] = useState(false);

  // SE MOSTRIAMO IL VEHICLE MANAGER
  if (showVehicleManager) {
    return (
      <div className="dashboard">
        <div className="vehicle-manager-header">
          <button 
            className="back-to-dashboard-btn"
            onClick={() => setShowVehicleManager(false)}
          >
            ← Torna alla Dashboard
          </button>
          <h1>🚗 Gestione Veicoli</h1>
        </div>
        <VehicleManager user={user} />
      </div>
    );
  }

  // DASHBOARD CON PULSANTE GESTIONE VEICOLI
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Benvenuto, {user.email}!</h1>
          <p>CareAuto Pro - Dashboard Completa</p>
        </div>
      </div>

      {/* PULSANTE GESTIONE VEICOLI - DEVE ESSERE VISIBILE */}
      <div className="vehicle-manager-card">
        <div className="vehicle-card-icon">🚗</div>
        <div className="vehicle-card-content">
          <h3>Gestione Veicoli</h3>
          <p>Aggiungi e gestisci i tuoi veicoli per il tracciamento GPS</p>
          <button 
            className="vehicle-manager-main-btn"
            onClick={() => setShowVehicleManager(true)}
          >
            🚗 APRI GESTIONE VEICOLI
          </button>
        </div>
      </div>

      {/* Sezione Statistiche */}
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
          {/* ... altre statistiche ... */}
        </div>
      </div>
    </div>
  );
};

export default DashboardWithVehicles;          { id: 3, client: 'Anna Bianchi', service: 'Tagliando', price: 180, status: 'programmato', date: '2024-01-16' },
        ]);
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Errore nel caricamento dashboard:', error);
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'Gestione Veicoli') {
      setShowVehicleManager(true);
    } else {
      alert(`Azione: ${action} - Funzionalità in sviluppo`);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleManager(false);
  };

  const handleBackToDashboard = () => {
    setShowVehicleManager(false);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Caricamento dashboard...</p>
      </div>
    );
  }

  // SE MOSTRIAMO IL VEHICLE MANAGER
  if (showVehicleManager) {
    return (
      <div className="dashboard">
        <div className="vehicle-manager-header">
          <button 
            className="back-to-dashboard-btn"
            onClick={handleBackToDashboard}
          >
            ← Torna alla Dashboard
          </button>
          <h1>🚗 Gestione Veicoli</h1>
        </div>
        <VehicleManager 
          user={user} 
          onVehicleSelect={handleVehicleSelect}
        />
      </div>
    );
  }

  // DASHBOARD NORMALE CON PULSANTE GESTIONE VEICOLI
  return (
    <div className="dashboard">
      {/* Header Benvenuto */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Benvenuto, {user.email}!</h1>
          <p>Ecco il riepilogo della tua attività</p>
          {selectedVehicle && (
            <div className="selected-vehicle-info">
              <span className="vehicle-badge">
                🚗 {selectedVehicle.nomeveicolo} - {selectedVehicle.kmattuali?.toLocaleString() || 0} km
              </span>
            </div>
          )}
        </div>
        <div className="date-section">
          <p>{new Date().toLocaleDateString('it-IT', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* PULSANTE GESTIONE VEICOLI - VISIBILE */}
      <div className="vehicle-manager-card">
        <div className="vehicle-card-icon">🚗</div>
        <div className="vehicle-card-content">
          <h3>Gestione Veicoli</h3>
          <p>Aggiungi e gestisci i tuoi veicoli per il tracciamento GPS</p>
          <button 
            className="vehicle-manager-main-btn"
            onClick={() => setShowVehicleManager(true)}
          >
            🚗 APRI GESTIONE VEICOLI
          </button>
        </div>
      </div>

      {/* Statistiche */}
      <div className="stats-section">
        <h2>📊 Riepilogo Attività</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.totalClients}</h3>
              <p>Clienti Totali</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div className="stat-content">
              <h3>{stats.todayServices}</h3>
              <p>Interventi Oggi</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{stats.pendingAppointments}</h3>
              <p>Appuntamenti</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>€{stats.monthlyRevenue}</h3>
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
            onClick={() => handleQuickAction('Nuovo Cliente')}
          >
            <span className="action-icon">➕</span>
            <span className="action-text">Nuovo Cliente</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('Nuovo Intervento')}
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
