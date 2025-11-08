import React, { useState } from 'react'
import { useSupabase } from '../hooks/useSupabase'
import { useTraduzioni } from '../i18n'
import AdBanner from './AdBanner'
import SelettoreLingua from './SelettoreLingua'

const OperationsList = () => {
  const { t, lingua } = useTraduzioni()
  const { 
    dati: operazioni, 
    caricamento, 
    errore, 
    configurazione,
    inserisciDati, 
    eliminaDati 
  } = useSupabase('operations', {
    ordinamento: 'created_at',
    ascendente: false
  })

  const [nuovaOperazione, setNuovaOperazione] = useState({
    nome: '',
    descrizione: '',
    stato: 'pending',
    priorita: 'medium'
  })

  // Mappatura stati per database (sempre in inglese)
  const mappaStati = {
    pending: 'pending',
    in_corso: 'in_progress', 
    completata: 'completed'
  }

  const mappaStatiInverso = {
    pending: 'pending',
    in_progress: 'in_corso',
    completed: 'completata'
  }

  const gestisciInvio = async (e) => {
    e.preventDefault()
    if (!nuovaOperazione.nome.trim()) {
      alert(t('enterOperationName'))
      return
    }

    // Converti stato per database
    const datiPerDB = {
      ...nuovaOperazione,
      stato: mappaStati[nuovaOperazione.stato] || nuovaOperazione.stato
    }

    const risultato = await inserisciDati(datiPerDB)
    if (risultato) {
      setNuovaOperazione({ 
        nome: '', 
        descrizione: '', 
        stato: 'pending',
        priorita: 'medium'
      })
      alert(t('operationAdded'))
    }
  }

  const gestisciEliminazione = async (id, nome) => {
    if (window.confirm(`${t('confirmDelete')} "${nome}"?`)) {
      await eliminaDati(id)
    }
  }

  // Statistiche con stati localizzati
  const statistiche = {
    totali: operazioni.length,
    inAttesa: operazioni.filter(op => op.stato === 'pending').length,
    inCorso: operazioni.filter(op => op.stato === 'in_progress').length,
    completate: operazioni.filter(op => op.stato === 'completed').length
  }

  if (caricamento && operazioni.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <div className="loading-text">{t('loading')}</div>
        <AdBanner tipo="adsense" configurazione={configurazione} />
      </div>
    )
  }

  if (errore) {
    return (
      <div className="error-container">
        <div className="error-message">
          <div className="error-icon">❌</div>
          <h3>{t('connectionError')}</h3>
          <p>{errore}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-retry"
          >
            🔄 {t('reloadPage')}
          </button>
        </div>
        <AdBanner tipo="adsense" configurazione={configurazione} />
      </div>
    )
  }

  return (
    <div className="operations-container">
      {/* Header con selettore lingua */}
      <div className="operations-header">
        <div className="header-main">
          <div className="header-top">
            <h1>🎯 {t('appTitle')}</h1>
            <SelettoreLingua />
          </div>
          <p>{t('appDescription')}</p>
        </div>
        <AdBanner tipo="adsense" configurazione={configurazione} />
      </div>

      {/* Statistiche */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{statistiche.totali}</div>
          <div className="stat-label">{t('total')}</div>
        </div>
        <div className="stat-card in-attesa">
          <div className="stat-number">{statistiche.inAttesa}</div>
          <div className="stat-label">{t('pending')}</div>
        </div>
        <div className="stat-card in-corso">
          <div className="stat-number">{statistiche.inCorso}</div>
          <div className="stat-label">{t('inProgress')}</div>
        </div>
        <div className="stat-card completate">
          <div className="stat-number">{statistiche.completate}</div>
          <div className="stat-label">{t('completed')}</div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={gestisciInvio} className="operation-form">
        <div className="form-section">
          <h3>➕ {t('newOperation')}</h3>
          
          <div className="form-row">
            <input
              type="text"
              placeholder={`${t('operationName')} *`}
              value={nuovaOperazione.nome}
              onChange={(e) => setNuovaOperazione({...nuovaOperazione, nome: e.target.value})}
              required
              className="form-input"
            />
            <select
              value={nuovaOperazione.priorita}
              onChange={(e) => setNuovaOperazione({...nuovaOperazione, priorita: e.target.value})}
              className="form-select"
            >
              <option value="low">📋 {t('low')}</option>
              <option value="medium">📝 {t('medium')}</option>
              <option value="high">🚨 {t('high')}</option>
            </select>
          </div>
          
          <textarea
            placeholder={t('description')}
            value={nuovaOperazione.descrizione}
            onChange={(e) => setNuovaOperazione({...nuovaOperazione, descrizione: e.target.value})}
            rows="3"
            className="form-textarea"
          />
          
          <div className="form-actions">
            <select
              value={nuovaOperazione.stato}
              onChange={(e) => setNuovaOperazione({...nuovaOperazione, stato: e.target.value})}
              className="form-select"
            >
              <option value="pending">⏳ {t('pending')}</option>
              <option value="in_corso">🚀 {t('inProgress')}</option>
              <option value="completata">✅ {t('completed')}</option>
            </select>
            <button type="submit" className="btn-primary">
              ➕ {t('add')} {t('newOperation')}
            </button>
          </div>
        </div>
      </form>

      <AdBanner tipo="admob" configurazione={configurazione} />

      {/* Lista operazioni */}
      <div className="operations-list-section">
        <h3>📋 {t('operations')} ({operazioni.length})</h3>
        
        {operazioni.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>{t('emptyList')}</h4>
            <p>{t('emptyDescription')}</p>
          </div>
        ) : (
          <div className="operations-list">
            {operazioni.map((operazione, indice) => (
              <div key={operazione.id} className="operation-card">
                <div className="operation-main">
                  <div className="operation-header">
                    <h4 className="operation-title">{operazione.nome}</h4>
                    <div className="operation-badges">
                      <span className={`priority-badge priority-${operazione.priorita}`}>
                        {operazione.priorita === 'high' && '🚨'}
                        {operazione.priorita === 'medium' && '📝'}
                        {operazione.priorita === 'low' && '📋'}
                        {t(operazione.priorita)}
                      </span>
                      <span className={`status-badge status-${operazione.stato}`}>
                        {operazione.stato === 'pending' && '⏳'}
                        {operazione.stato === 'in_progress' && '🚀'}
                        {operazione.stato === 'completed' && '✅'}
                        {t(mappaStatiInverso[operazione.stato] || operazione.stato)}
                      </span>
                    </div>
                  </div>
                  
                  {operazione.descrizione && (
                    <p className="operation-description">{operazione.descrizione}</p>
                  )}
                  
                  <div className="operation-meta">
                    <small className="operation-id">
                      ID: {operazione.operazione_id || operazione.id}
                    </small>
                    <small className="operation-date">
                      {t('created')}: {new Date(operazione.created_at).toLocaleDateString(lingua)}
                    </small>
                    {operazione.updated_at !== operazione.created_at && (
                      <small className="operation-updated">
                        {t('updated')}: {new Date(operazione.updated_at).toLocaleDateString(lingua)}
                      </small>
                    )}
                  </div>
                </div>
                
                <div className="operation-actions">
                  <button 
                    onClick={() => gestisciEliminazione(operazione.id, operazione.nome)}
                    className="btn-delete"
                    title={t('delete')}
                  >
                    🗑️ {t('delete')}
                  </button>
                </div>

                {(indice + 1) % 3 === 0 && (
                  <div className="operation-ad">
                    <AdBanner tipo="adsense" configurazione={configurazione} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AdBanner tipo="adsense" configurazione={configurazione} />
    </div>
  )
}

export default OperationsList