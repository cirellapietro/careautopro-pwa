import React, { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validazioni
    if (!email || !password) {
      setMessage('Email e password sono obbligatorie');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage('Le password non coincidono');
      setLoading(false);
      return;
    }

    if (!isLogin && password.length < 6) {
      setMessage('La password deve essere di almeno 6 caratteri');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;
        
        // Verifica se l'email è confermata
        if (data.user && !data.user.email_confirmed_at) {
          setMessage('📧 Email non confermata. Controlla la tua casella email o richiedi un nuovo link di conferma.');
          setShowEmailConfirmation(true);
          return;
        }

        setMessage('✅ Accesso effettuato con successo!');
        setTimeout(() => {
          onLoginSuccess?.(data.user);
        }, 1000);

      } else {
        // REGISTRAZIONE
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              user_name: userName.trim(),
              created_at: new Date().toISOString(),
            },
            emailRedirectTo: 'https://careautopro-v2.vercel.app/auth/callback',
          }
        });

        if (error) throw error;

        if (data.user?.identities?.length === 0) {
          setMessage('❌ Un account con questa email esiste già');
          return;
        }

        setMessage('🎉 Registrazione completata! Ti abbiamo inviato un link di conferma email. Controlla la tua casella di posta.');
        setShowEmailConfirmation(true);
        
        // Reset form dopo registrazione
        setTimeout(() => {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setUserName('');
        }, 5000);
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      // Messaggi di errore più user-friendly
      if (error.message.includes('Invalid login credentials')) {
        setMessage('❌ Email o password non validi');
      } else if (error.message.includes('Email not confirmed')) {
        setMessage('📧 Email non confermata. Controlla la tua casella email.');
        setShowEmailConfirmation(true);
      } else if (error.message.includes('User already registered')) {
        setMessage('❌ Un account con questa email esiste già');
      } else if (error.message.includes('Password should be at least')) {
        setMessage('❌ La password deve essere di almeno 6 caratteri');
      } else {
        setMessage(`❌ Errore: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: 'https://careautopro-v2.vercel.app/auth/callback',
        }
      });

      if (error) throw error;

      setMessage('📧 Nuovo link di conferma inviato! Controlla la tua email.');
    } catch (error) {
      setMessage(`❌ Errore nell'invio del link: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage('❌ Inserisci la tua email per reimpostare la password');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'https://careautopro-v2.vercel.app/auth/reset-password',
      });

      if (error) throw error;

      setMessage('📧 Link per reimpostare la password inviato! Controlla la tua email.');
    } catch (error) {
      setMessage(`❌ Errore nell'invio del link: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUserName('');
    setMessage('');
    setShowEmailConfirmation(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLogin ? 'Accedi' : 'Crea Account'}</h2>
          <p className="subtitle">
            {isLogin 
              ? 'Bentornato in CareAuto Pro' 
              : 'Unisciti a CareAuto Pro e gestisci la tua officina'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo Nome solo per registrazione */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="userName">
                Nome e Cognome <span className="required">*</span>
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Mario Rossi"
                required={!isLogin}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="esempio@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "La tua password" : "Minimo 6 caratteri"}
              required
              disabled={loading}
              minLength="6"
            />
          </div>

          {/* Campo Conferma Password solo per registrazione */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Conferma Password <span className="required">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ripeti la password"
                required={!isLogin}
                disabled={loading}
                minLength="6"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                {isLogin ? 'Accesso in corso...' : 'Registrazione...'}
              </>
            ) : (
              isLogin ? 'Accedi' : 'Crea Account'
            )}
          </button>

          {/* Sezione Conferma Email */}
          {showEmailConfirmation && (
            <div className="email-confirmation-section">
              <div className="confirmation-header">
                <span className="confirmation-icon">📧</span>
                <h4>Conferma la tua Email</h4>
              </div>
              <p className="confirmation-text">
                {isLogin 
                  ? 'Il tuo account non è ancora attivo. Controlla la tua email per il link di conferma.'
                  : 'Ti abbiamo inviato un link di conferma. Clicca sul link per attivare il tuo account.'
                }
              </p>
              <div className="confirmation-actions">
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={loading}
                  className="confirmation-btn"
                >
                  {loading ? 'Invio...' : 'Invia nuovo link'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailConfirmation(false)}
                  className="confirmation-btn secondary"
                >
                  Ho già confermato
                </button>
              </div>
            </div>
          )}

          {message && !showEmailConfirmation && (
            <div className={`message ${ 
              message.includes('✅') || message.includes('🎉') || message.includes('📧') 
                ? 'success' 
                : 'error'
            }`}>
              <div className="message-icon">
                {message.includes('✅') ? '✅' : 
                 message.includes('🎉') ? '🎉' : 
                 message.includes('📧') ? '📧' : '❌'}
              </div>
              <div className="message-text">{message}</div>
            </div>
          )}

          {/* Password Reset per Login */}
          {isLogin && !showEmailConfirmation && (
            <div className="password-reset">
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={loading || !email}
                className="reset-link"
              >
                Password dimenticata?
              </button>
            </div>
          )}
        </form>

        <div className="switch-mode">
          <p>
            {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
            <button 
              type="button" 
              onClick={switchMode}
              className="switch-btn"
              disabled={loading}
            >
              {isLogin ? 'Registrati' : 'Accedi'}
            </button>
          </p>
        </div>

        <div className="login-info">
          <h4>📋 Informazioni:</h4>
          <ul>
            <li>✅ Gestisci clienti e interventi</li>
            <li>✅ Calendarizza appuntamenti</li>
            <li>✅ Traccia pagamenti e fatture</li>
            <li>✅ Accesso multi-dispositivo</li>
            <li>✅ Conferma email richiesta per la sicurezza</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;