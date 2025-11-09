import React, { useState, useEffect } from 'react'
import OperationsList from './components/OperationsList'
import './App.css'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

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
        <div className="loading-spinner">⚡</div>
        <h1>CareAutoPro</h1>
        <p>Caricamento...</p>
      </div>
    )
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
        <OperationsList />
      </main>

      <footer className="app-footer">
        <p>© 2024 CareAutoPro - Sistema di gestione</p>
      </footer>
    </div>
  )
}

export default App