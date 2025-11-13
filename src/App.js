// src/App.js - VERSIONE TEST
import React from 'react';
import './App.css';

function App() {
  console.log('App component is rendering!'); // Questo deve apparire in console
  
  return (
    <div className="App">
      <header style={{ 
        padding: '20px', 
        background: '#2c3e50', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>🚗 CareAuto Pro</h1>
        <p>Versione Test - Applicazione Funzionante</p>
      </header>
      
      <main style={{ 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h2>✅ App Caricata Correttamente!</h2>
        <div style={{ margin: '20px 0' }}>
          <button 
            onClick={() => alert('Bottone funzionante!')}
            style={{
              padding: '12px 24px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            Test Button 1
          </button>
          
          <button 
            onClick={() => alert('Anche questo funziona!')}
            style={{
              padding: '12px 24px',
              background: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            Test Button 2
          </button>
        </div>
        
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '30px',
          maxWidth: '600px',
          margin: '30px auto'
        }}>
          <h3>Stato Applicazione:</h3>
          <p><strong>React:</strong> ✅ Caricato</p>
          <p><strong>Componenti:</strong> ✅ Funzionanti</p>
          <p><strong>JavaScript:</strong> ✅ Attivo</p>
          <p><strong>CSS:</strong> ✅ Applicato</p>
        </div>
      </main>
      
      <footer style={{
        padding: '20px',
        background: '#ecf0f1',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p>CareAuto Pro © 2024 - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}

export default App;