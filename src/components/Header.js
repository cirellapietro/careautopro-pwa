import React from 'react';
import './Header.css';

const Header = ({ user }) => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Errore durante il logout:', error);
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
