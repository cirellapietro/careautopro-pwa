// src/components/Header.js - AGGIORNATO
import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🚗 CareAuto Pro</h1>
          <span>Gestione Operazioni Auto</span>
        </div>
        
        <nav className="nav">
          {user ? (
            <div className="user-nav">
              <span className="user-info">
                Ciao, <strong>{user.email}</strong>
              </span>
              <button 
                onClick={handleLogout}
                className="logout-btn"
                title="Esci dall'applicazione"
              >
                Esci
              </button>
            </div>
          ) : (
            <div className="guest-nav">
              <span>Accedi per gestire la tua attività</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;