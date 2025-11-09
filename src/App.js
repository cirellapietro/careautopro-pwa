import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import OperationsList from './components/OperationsList'
import './App.css'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // BYPASS COMPLETO - nessun login richiesto
  const mockUser = {
    id: 'bypass-user',
    email: 'user@careautopro.com'
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🚗 CareAutoPro</h1>
            <p>Gestione operazioni veicoli</p>
          </div>
          <div className="header-status">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <OperationsList user={mockUser} />
      </main>

      <footer className="app-footer">
        <p>© 2024 CareAutoPro - Accesso diretto</p>
      </footer>
    </div>
  )
}

export default App