// src/App.js - STEP 2
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';
import Header from './components/Header.js';
import LoginForm from './components/LoginForm.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session);
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Caricamento CareAuto Pro...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      
      <main>
        {user ? (
          // UTENTE LOGGATO - Mostriamo dashboard semplice
          <div style={{ 
            padding: '40px 20px',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2>✅ Step 2 Completato - Auth Funzionante!</h2>
            <div style={{ 
              background: '#d4edda', 
              padding: '20px', 
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <h3>🎉 Benvenuto, {user.email}!</h3>
              <p>L'autenticazione funziona correttamente</p>
            </div>
            
            <div style={{ margin: '20px 0' }}>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '12px 24px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px',
              marginTop: '30px'
            }}>
              <h3>Progresso Sviluppo:</h3>
              <p><strong>Step 1 - Header:</strong> ✅ Completato</p>
              <p><strong>Step 2 - Auth:</strong> ✅ Completato</p>
              <p><strong>Step 3 - Dashboard:</strong> ⏳ Prossimo</p>
              <p><strong>Step 4 - Config:</strong> ⏳ In attesa</p>
            </div>
          </div>
        ) : (
          // UTENTE NON LOGGATO - Mostriamo login
          <LoginForm onLoginSuccess={(user) => setUser(user)} />
        )}
      </main>
    </div>
  );
}

export default App;