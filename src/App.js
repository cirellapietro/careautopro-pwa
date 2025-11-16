// TEST: Dashboard semplice senza VehicleManager
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';
import Header from './components/Header.js';
import LoginForm from './components/LoginForm.js';
// src/App.js - CAMBIA SOLO QUESTA RIGA:
import Dashboard from './components/DashboardWithVehicles.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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
          // 🎯 VERSIONE SEMPLICE PER TEST
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>CareAuto Pro - Test</h1>
            <p>Applicazione funzionante</p>
            <div style={{ 
              background: '#d4edda', 
              padding: '2rem', 
              borderRadius: '8px',
              margin: '2rem 0'
            }}>
              <h2>✅ Build Success</h2>
              <p>Se vedi questa pagina, il deployment funziona</p>
            </div>
          </div>
        ) : (
          <LoginForm onLoginSuccess={(user) => setUser(user)} />
        )}
      </main>
    </div>
  );
}

export default App;
