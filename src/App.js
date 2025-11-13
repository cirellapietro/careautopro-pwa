// src/App.js - STEP 1
import React from 'react';
import Header from './components/Header.js';
import './App.css';

function App() {
  console.log('App component is rendering!');
  
  return (
    <div className="App">
      {/* Aggiungiamo l'Header */}
      <Header user={null} />
      
      <main style={{ 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h2>✅ Step 1 Completato - Header Aggiunto!</h2>
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
          <h3>Progresso Sviluppo:</h3>
          <p><strong>Step 1 - Header:</strong> ✅ Completato</p>
          <p><strong>Step 2 - Auth:</strong> ⏳ Prossimo</p>
          <p><strong>Step 3 - Dashboard:</strong> ⏳ In attesa</p>
          <p><strong>Step 4 - Config:</strong> ⏳ In attesa</p>
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