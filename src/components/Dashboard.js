// src/components/Dashboard.js - VERSIONE COMPLETA
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalClients: 0,
    todayServices: 0,
    pendingAppointments: 0,
    monthlyRevenue: 0
  });
  const [recentServices, setRecentServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Qui caricheriamo i dati reali dal database
      // Per ora usiamo dati mock per dimostrazione
      
      // Simulazione caricamento dati
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
          { id: 4, client: 'Giovanni Neri', service: 'Sostituzione freni', price: 220, status: 'completato', date: '2024-01-14' }
        ]);
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Errore nel caricamento dashboard:', error);
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    alert(`Azione: ${action} - Funzionalità in sviluppo`);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Caricamento dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Benvenuto */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Benvenuto, {user.email}!</h1>
          <p>Ecco il riepilogo della tua attività</p>
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

      {/* Interventi Recenti */}
      <div className="recent-services-section">
        <div className="section-header">
          <h2>🔧 Interventi Recenti</h2>
          <button className="view-all-btn">Vedi Tutti</button>
        </div>
        
        <div className="services-table">
          <div className="table-header">
            <div className="col-client">Cliente</div>
            <div className="col-service">Intervento</div>
            <div className="col-price">Prezzo</div>
            <div className="col-status">Stato</div>
            <div className="col-date">Data</div>
          </div>
          
          <div className="table-body">
            {recentServices.map(service => (
              <div key={service.id} className="table-row">
                <div className="col-client">
                  <strong>{service.client}</strong>
                </div>
                <div className="col-service">{service.service}</div>
                <div className="col-price">€{service.price}</div>
                <div className={`col-status status-${service.status}`}>
                  {service.status === 'completato' && '✅ Completato'}
                  {service.status === 'in_corso' && '🔄 In Corso'}
                  {service.status === 'programmato' && '📅 Programmato'}
                </div>
                <div className="col-date">
                  {new Date(service.date).toLocaleDateString('it-IT')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Azioni Rapide */}
      <div className="quick-actions-section">
        <h2>⚡ Azioni Rapide</h2>
        <div className="actions-grid">
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
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('Nuovo Appuntamento')}
          >
            <span className="action-icon">📅</span>
            <span className="action-text">Nuovo Appuntamento</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('Report Mensile')}
          >
            <span className="action-icon">📊</span>
            <span className="action-text">Report Mensile</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('Gestione Pagamenti')}
          >
            <span className="action-icon">💳</span>
            <span className="action-text">Gestione Pagamenti</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('Inventario')}
          >
            <span className="action-icon">📦</span>
            <span className="action-text">Inventario</span>
          </button>
        </div>
      </div>

      {/* Promemoria */}
      <div className="reminders-section">
        <h2>📌 Promemoria</h2>
        <div className="reminders-list">
          <div className="reminder-item">
            <div className="reminder-icon">⏰</div>
            <div className="reminder-content">
              <p><strong>Appuntamento domani</strong> - Mario Rossi (Cambio gomme)</p>
              <span className="reminder-time">10:30 AM</span>
            </div>
          </div>
          
          <div className="reminder-item">
            <div className="reminder-icon">📞</div>
            <div className="reminder-content">
              <p><strong>Richiamare cliente</strong> - Luigi Verdi per preventivo</p>
              <span className="reminder-time">Da fare oggi</span>
            </div>
          </div>
          
          <div className="reminder-item">
            <div className="reminder-icon">📋</div>
            <div className="reminder-content">
              <p><strong>Ordine ricambi</strong> - Filtri aria in esaurimento</p>
              <span className="reminder-time">Urgente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;