import React, { useState } from 'react'
import { useSupabase } from '../hooks/useSupabase'
import AdBanner from './AdBanner'

const OperationsList = () => {
  const { 
    data: operations, 
    loading, 
    error, 
    config,
    insertData, 
    deleteData 
  } = useSupabase('operations', {
    orderBy: 'created_at',
    ascending: false
  })

  const [newOperation, setNewOperation] = useState({
    nome: '',
    descrizione: '',
    stato: 'pending',
    priorita: 'media'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newOperation.nome.trim()) {
      alert('Inserisci un nome per l\'operazione!')
      return
    }

    const result = await insertData(newOperation)
    if (result) {
      setNewOperation({ 
        nome: '', 
        descrizione: '', 
        stato: 'pending',
        priorita: 'media'
      })
      
      // Mostra conferma
      alert('✅ Operazione aggiunta con successo!')
    }
  }

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Sei sicuro di voler eliminare l'operazione "${nome}"?`)) {
      await deleteData(id)
    }
  }

  // Statistiche
  const stats = {
    total: operations.length,
    pending: operations.filter(op => op.stato === 'pending').length,
    inProgress: operations.filter(op => op.stato === 'in_progress').length,
    completed: operations.filter(op => op.stato === 'completed').length
  }

  if (loading && operations.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <div className="loading-text">Caricamento operazioni...</div>
        <AdBanner type="adsense" config={config} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <div className="error-icon">❌</div>
          <h3>Errore di caricamento</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-retry"
          >
            🔄 Ricarica la pagina
          </button>
        </div>
        <AdBanner type="adsense" config={config} />
      </div>
    )
  }

  return (
    <div className="operations-container">
      {/* Header con Stats e Ad */}
      <div className="operations-header">
        <div className="header-main">
          <h1>🎯 Gestione Operazioni</h1>
          <p>Gestisci tutte le tue attività in un unico posto</p>
        </div>
        <AdBanner type="adsense" config={config} />
      </div>

      {/* Statistiche */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Totali</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">In Attesa</div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Corso</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completate</div>
        </div>
      </div>

      {/* Form Inserimento */}
      <form onSubmit={handleSubmit} className="operation-form">
        <div className="form-section">
          <h3>➕ Nuova Operazione</h3>
          
          <div className="form-row">
            <input
              type="text"
              placeholder="Nome operazione *"
              value={newOperation.nome}
              onChange={(e) => setNewOperation({...newOperation, nome: e.target.value})}
              required
              className="form-input"
            />
            <select
              value={newOperation.priorita}
              onChange={(e) => setNewOperation({...newOperation, priorita: e.target.value})}
              className="form-select"
            >
              <option value="bassa">📋 Bassa Priorità</option>
              <option value="media">📝 Media Priorità</option>
              <option value="alta">🚨 Alta Priorità</option>
            </select>
          </div>
          
          <textarea
            placeholder="Descrizione dettagliata..."
            value={newOperation.descrizione}
            onChange={(e) => setNewOperation({...newOperation, descrizione: e.target.value})}
            rows="3"
            className="form-textarea"
          />
          
          <div className="form-actions">
            <select
              value={newOperation.stato}
              onChange={(e) => setNewOperation({...newOperation, stato: e.target.value})}
              className="form-select"
            >
              <option value="pending">⏳ In Attesa</option>
              <option value="in_progress">🚀 In Corso</option>
              <option value="completed">✅ Completato</option>
            </select>
            <button type="submit" className="btn-primary">
              ➕ Aggiungi Operazione
            </button>
          </div>
        </div>
      </form>

      {/* Banner Ad Middle */}
      <AdBanner type="admob" config={config} />

      {/* Lista Operazioni */}
      <div className="operations-list-section">
        <h3>📋 Lista Operazioni ({operations.length})</h3>
        
        {operations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>Nessuna operazione presente</h4>
            <p>Crea la tua prima operazione usando il form sopra!</p>
          </div>
        ) : (
          <div className="operations-list">
            {operations.map((op, index) => (
              <div key={op.id} className="operation-card">
                <div className="operation-main">
                  <div className="operation-header">
                    <h4 className="operation-title">{op.nome}</h4>
                    <div className="operation-badges">
                      <span className={`priority-badge priority-${op.priorita}`}>
                        {op.priorita === 'alta' && '🚨'}
                        {op.priorita === 'media' && '📝'}
                        {op.priorita === 'bassa' && '📋'}
                        {op.priorita}
                      </span>
                      <span className={`status-badge status-${op.stato}`}>
                        {op.stato === 'pending' && '⏳'}
                        {op.stato === 'in_progress' && '🚀'}
                        {op.stato === 'completed' && '✅'}
                        {op.stato}
                      </span>
                    </div>
                  </div>
                  
                  {op.descrizione && (
                    <p className="operation-description">{op.descrizione}</p>
                  )}
                  
                  <div className="operation-meta">
                    <small className="operation-id">
                      ID: {op.operazione_id || op.id}
                    </small>
                    <small className="operation-date">
                      Creata: {new Date(op.created_at).toLocaleDateString('it-IT')}
                    </small>
                    {op.updated_at !== op.created_at && (
                      <small className="operation-updated">
                        Aggiornata: {new Date(op.updated_at).toLocaleDateString('it-IT')}
                      </small>
                    )}
                  </div>
                </div>
                
                <div className="operation-actions">
                  <button 
                    onClick={() => handleDelete(op.id, op.nome)}
                    className="btn-delete"
                    title="Elimina operazione"
                  >
                    🗑️ Elimina
                  </button>
                </div>

                {/* Mostra Ad ogni 3 operazioni */}
                {(index + 1) % 3 === 0 && (
                  <div className="operation-ad">
                    <AdBanner type="adsense" config={config} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Banner Ad Bottom */}
      <AdBanner type="adsense" config={config} />
    </div>
  )
}

export default OperationsList