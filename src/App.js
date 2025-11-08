import React, { useState, useEffect } from 'react'
import OperationsList from './components/OperationsList'
import './App.css'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Gestione stato connessione
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Simula caricamento iniziale
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-animation">
          <div className="loading-spinner">⚡</div>
          <h1>Gestione Operazioni Pro</h1>
          <p>Caricamento applicazione...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🚀 Gestione Operazioni Pro</h1>
            <p>Sistema avanzato di gestione attività con Supabase</p>
          </div>
          <div className="header-status">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
        
        <div className="header-ads">
          <div className="ad-header">
            {/* Spazio per annunci header - sarà popolato dai componenti AdBanner */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {!isOnline ? (
          <div className="offline-message">
            <div className="offline-icon">📶</div>
            <h2>Connessione assente</h2>
            <p>Alcune funzionalità potrebbero non essere disponibili</p>
            <div className="offline-tips">
              <h4>Modalità offline:</h4>
              <ul>
                <li>✅ Puoi visualizzare le operazioni esistenti</li>
                <li>⚠️ Le nuove operazioni verranno sincronizzate quando tornerai online</li>
                <li>🔄 Ricarica la pagina quando la connessione sarà ripristinata</li>
              </ul>
            </div>
          </div>
        ) : (
          <OperationsList />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>© 2024 Gestione Operazioni Pro - Powered by Supabase & React</p>
            <div className="footer-links">
              <span>v1.0.0</span>
              <span>•</span>
              <span>Connessione: {isOnline ? '🟢 Online' : '🔴 Offline'}</span>
            </div>
          </div>
          <div className="footer-ads">
            {/* Spazio per annunci footer */}
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      {!isOnline && (
        <div className="toast offline-toast">
          <span>⚠️ Sei offline - Modalità limitata</span>
        </div>
      )}
    </div>
  )
}

export default App