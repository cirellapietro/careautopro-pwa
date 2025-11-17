import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import VehicleManager from './VehicleManager.js';
import './Dashboard.css';

const DashboardWithVehicles = ({ user }) => {
  const [stats, setStats] = useState({
    totalClients: 0,
    todayServices: 0,
    pendingAppointments: 0,
    monthlyRevenue: 0
  });
  const [recentServices, setRecentServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleManager, setShowVehicleManager] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setTimeout(() => {
        setStats({
          totalClients: 24,
          todayServices: 8,
          pendingAppointments: 3,
          monthlyRevenue: 2840
        });
        
        setRecentServices([
          { id: 1, client: 'Mario Rossi', service: 'Cambio olio', price: 85, status: 'completato', date: '2024-01-15' },
          { id: 2, client: 'Luigi Verdi', service: 'Revisione', price: 120, status: 'in_corso', date: '2024-01-15' },
          { id: 3, client: 'Anna Bianchi', service: 'Tagliando', price: 180, status: 'programmato', date: '2024-01-16' },
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

  return (
    <div className="dashboard">
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
