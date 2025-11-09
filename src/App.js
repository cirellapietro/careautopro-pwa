import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import OperationsList from './components/OperationsList'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  // Controlla sessione esistente
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })
      
      if (error) throw error
    } catch (error) {
      setAuthError(error.message)
    }
  }

  // Registrazione
  const handleSignUp = async (e) => {
    e.preventDefault()
    setAuthError('')
    
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      })
      
      if (error) throw error
      alert('Controlla la tua email per confermare la registrazione!')
    } catch (error) {
      setAuthError(error.message)
    }
  }

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">⚡</div>
        <div>Caricamento...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>🚗 CareAutoPro</h1>
          <p>{isSignUp ? 'Crea il tuo account' : 'Accedi al tuo account'}</p>
          
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="auth-form">
            <div className="form-group">
              <label>La tua email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tua.email@gmail.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Scegli una password sicura"
                required
                minLength="6"
              />
            </div>

            {authError && (
              <div className="auth-error">
                {authError}
              </div>
            )}

            <div className="auth-buttons">
              <button type="submit" className="btn-primary">
                {isSignUp ? '📝 Registrati' : '🔑 Accedi'}
              </button>
            </div>

            <div className="auth-switch">
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="btn-link"
              >
                {isSignUp ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
              </button>
            </div>
          </form>

          <div className="auth-info">
            <h4>📧 Importante:</h4>
            <p>Dopo la registrazione, <strong>controlla la tua email</strong> per confermare l'account.</p>
            <p>Usa un indirizzo email <strong>reale che puoi verificare</strong>.</p>
          </div>
        </div>
      </div>
    )
  }

  return <OperationsList user={session.user} onLogout={handleLogout} />
}

export default App