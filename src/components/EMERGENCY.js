import React from 'react';

const EMERGENCY = () => {
  return (
    <div style={{
      padding: '50px',
      background: 'linear-gradient(45deg, #ff0000, #ff8000)',
      color: 'white',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1>🚨 TEST EMERGENCY - REACT FUNZIONA! 🚨</h1>
      <p>Se vedi questo messaggio ROSSO, significa che:</p>
      <ul style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>✅ React si sta montando correttamente</li>
        <li>✅ I componenti funzionano</li>
        <li>✅ Il problema è nella configurazione</li>
      </ul>
    </div>
  );
};

export default EMERGENCY;
