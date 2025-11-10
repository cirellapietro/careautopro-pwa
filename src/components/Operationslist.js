import React, { useState } from 'react'
import { useSupabase } from '../hooks/useSupabase'

const OperationsList = () => {
  const { 
    data: operations, 
    loading, 
    error, 
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
    priorita: 'medium'
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
        priorita: 'medium'
      })
      alert('✅ Operazione aggiunta con successo!')
    }
  }

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Sei sicuro di voler eliminare l'operazione "${nome}"?`)) {
      await deleteData(id)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <div>Caricamento operazioni...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Errore di caricamento</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">
            🔄 Ricarica la pagina
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="operations-container">
      <div className="operations-header">
        <h2>📋 Gestione Operazioni</h2>
        <p>Gestisci tutte le operazioni dei veicoli</p>
      </div>

      <form onSubmit={handleSubmit} className="operation-form">
        <h3>➕ Nuova Operazione</h3>
        <input
          type="text"
          placeholder="Nome operazione *"
          value={newOperation.nome}
          onChange={(e) => setNewOperation({...newOperation, nome: e.target.value})}
          required
        />
        <textarea
          placeholder="Descrizione"
          value={newOperation.descrizione}
          onChange={(e) => setNewOperation({...newOperation, descrizione: e.target.value})}
          rows="3"
        />
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            ➕ Aggiungi Operazione
          </button>
        </div>
      </form>

      <div className="operations-list">
        <h3>Operazioni ({operations.length})</h3>
        {operations.length === 0 ? (
          <div className="empty-state">
            <p>Nessuna operazione presente. Creane una nuova!</p>
          </div>
        ) : (
          operations.map((op) => (
            <div key={op.id} className="operation-card">
              <div className="operation-info">
                <h4>{op.nome}</h4>
                {op.descrizione && <p>{op.descrizione}</p>}
                <div className="operation-meta">
                  <span className={`status status-${op.stato}`}>
                    {op.stato}
                  </span>
                  <span className={`priority priority-${op.priorita}`}>
                    {op.priorita}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(op.id, op.nome)}
                className="btn-delete"
              >
                🗑️ Elimina
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OperationsList