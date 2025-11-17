// src/App.js - COPIA E INCOLLA QUESTO CODICE COMPLETO
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';
import Header from './components/Header.js';
import LoginForm from './components/LoginForm.js';
import DashboardWithVehicles from './components/DashboardWithVehicles.js';
import Dashboard from './components/TestDashboard.js';
import Dashboard from './components/DEBUG.js';
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
          <DashboardWithVehicles user={user} />
        ) : (
          <LoginForm onLoginSuccess={(user) => setUser(user)} />
        )}
      </main>
    </div>
  );
}

export default App;
