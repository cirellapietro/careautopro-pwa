// src/App.js
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';
import Header from './components/Header.js';
import LoginForm from './components/LoginForm.js';
import Dashboard from './components/Dashboard.js';
import ConfigTest from './components/ConfigTest.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfigTest, setShowConfigTest] = useState(true); // TRUE per vedere il test

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
      <Header user={user} />
      <main>
        {user ? (
          <div>
            {/* MOSTRA PRIMA IL TEST CONFIGURAZIONE */}
            {showConfigTest && (
              <div>
                <ConfigTest />
                <div style={{ textAlign: 'center', margin: '20px' }}>
                  <button 
                    onClick={() => setShowConfigTest(false)}
                    style={{
                      padding: '10px 20px',
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    ✅ Test Completato - Vai alla Dashboard
                  </button>
                </div>
              </div>
            )}
            
            {/* POI MOSTRA LA DASHBOARD NORMALE */}
            {!showConfigTest && <Dashboard user={user} />}
          </div>
        ) : (
          <LoginForm />
        )}
      </main>
    </div>
  );
}

export default App;
