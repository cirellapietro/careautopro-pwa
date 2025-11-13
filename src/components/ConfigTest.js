// src/components/ConfigTest.js
import React, { useState, useEffect } from 'react';
import configService from '../services/configService';
import './ConfigTest.css';

const ConfigTest = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConfigLoad();
  }, []);

  const testConfigLoad = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Test 1: Configurazione AdMob
      const admobConfig = await configService.getAdMobConfig();
      console.log('AdMob Config:', admobConfig);
      
      // Test 2: Configurazione App
      const appConfig = await configService.getAppConfig();
      console.log('App Config:', appConfig);
      
      setConfig({
        admob: admobConfig,
        app: appConfig
      });
      
    } catch (err) {
      console.error('Errore nel test configurazione:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testSingleValue = async (key) => {
    try {
      const value = await configService.getConfigValue(key);
      console.log(`Valore per ${key}:`, value);
      alert(`${key}: ${value}`);
    } catch (err) {
      console.error(`Errore nel caricamento ${key}:`, err);
      alert(`Errore: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="config-test loading">
        <div className="spinner"></div>
        <p>Caricamento configurazione...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="config-test error">
        <h3>❌ Errore nel caricamento configurazione</h3>
        <p>{error}</p>
        <button onClick={testConfigLoad} className="retry-btn">
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div className="config-test">
      <h3>🧪 Test Configurazione Database</h3>
      
      <div className="test-section">
        <h4>Configurazione AdMob</h4>
        {config.admob ? (
          <div className="config-results">
            <div className="config-item">
              <strong>admobidapp:</strong> 
              <span className={config.admob.admobAppId ? 'success' : 'missing'}>
                {config.admob.admobAppId || 'NON CONFIGURATO'}
              </span>
              <button 
                onClick={() => testSingleValue('admobidapp')}
                className="test-btn"
              >
                Test
              </button>
            </div>
            
            <div className="config-item">
              <strong>admobidpublisher:</strong> 
              <span className={config.admob.admobPublisherId ? 'success' : 'missing'}>
                {config.admob.admobPublisherId || 'NON CONFIGURATO'}
              </span>
              <button 
                onClick={() => testSingleValue('admobidpublisher')}
                className="test-btn"
              >
                Test
              </button>
            </div>
          </div>
        ) : (
          <p>Impossibile caricare configurazione AdMob</p>
        )}
      </div>

      <div className="test-section">
        <h4>Configurazione App</h4>
        {config.app ? (
          <div className="config-results">
            <div className="config-item">
              <strong>Debug Mode:</strong> 
              <span className={config.app.debugMode ? 'active' : 'inactive'}>
                {config.app.debugMode ? 'ATTIVO' : 'DISATTIVO'}
              </span>
            </div>
            
            <div className="config-item">
              <strong>Log Level:</strong> 
              <span>{config.app.logLevel || 'NON CONFIGURATO'}</span>
            </div>
            
            <div className="config-item">
              <strong>PWA:</strong> 
              <span className={config.app.pwaEnabled ? 'active' : 'inactive'}>
                {config.app.pwaEnabled ? 'ATTIVO' : 'DISATTIVO'}
              </span>
            </div>
          </div>
        ) : (
          <p>Impossibile caricare configurazione app</p>
        )}
      </div>

      <div className="test-actions">
        <button onClick={testConfigLoad} className="refresh-btn">
          🔄 Aggiorna Configurazione
        </button>
        
        <button onClick={() => testSingleValue('loglevel')} className="test-btn">
          Test Log Level
        </button>
        
        <button onClick={() => testSingleValue('pwa')} className="test-btn">
          Test PWA
        </button>
      </div>

      <div className="debug-info">
        <h5>Info Debug:</h5>
        <p>Controlla la console del browser per i log dettagliati</p>
      </div>
    </div>
  );
};

export default ConfigTest;
