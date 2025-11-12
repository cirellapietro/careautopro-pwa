import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Accesso effettuato!');
      } else {
        // Registrazione
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Registrazione completata! Controlla la tua email.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Accedi' : 'Registrati'}</h2>
        <p className="subtitle">
          {isLogin 
            ? 'Accedi al tuo account CareAuto Pro' 
            : 'Crea il tuo account per iniziare'
          }
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="la-tua@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="La tua password"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Caricamento...' : (isLogin ? 'Accedi' : 'Registrati')}
          </button>

          {message && (
            <div className={`message ${message.includes('effettuato') || message.includes('completata') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="switch-mode">
          <p>
            {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="switch-btn"
            >
              {isLogin ? 'Registrati' : 'Accedi'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
