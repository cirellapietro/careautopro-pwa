import React, { useState, useEffect } from 'react'
import OperationsList from './components/OperationsList'
import { useTraduzioni } from './i18n'
import './App.css'

function App() {
  const { t, lingua } = useTraduzioni()
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
        <div className="loading-animation">
          <div className="loading-spinner">⚡</div>
          <h1>{t('appTitle')}</h1>
          <p>{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🚀 {t('appTitle')}</h1>
            <p>{t('appDescription')}</p>
          </div>
          <div className="header-status">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {isOnline ? t('online') : t('offline')}
            </div>
          </div>
        </div>
        
        <div className="header-ads">
          <div className="ad-header"></div>
        </div>
      </header>

      <main className="app-main">
        {!isOnline ? (
          <div className="offline-message">
            <div className="offline-icon">📶</div>
            <h2>{t('connectionError')}</h2>
            <p>{t('offlineMessage')}</p>
          </div>
        ) : (
          <OperationsList />
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>© 2024 {t('appTitle')} - Powered by Supabase & React</p>
            <div className="footer-links">
              <span>v1.0.0</span>
              <span>•</span>
              <span>{t('status')}: {isOnline ? '🟢 ' + t('online') : '🔴 ' + t('offline')}</span>
              <span>•</span>
              <span>🌐 {lingua.toUpperCase()}</span>
            </div>
          </div>
          <div className="footer-ads"></div>
        </div>
      </footer>

      {!isOnline && (
        <div className="toast offline-toast">
          <span>⚠️ {t('offlineMessage')}</span>
        </div>
      )}
    </div>
  )
}

export default App