import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <h1>CareAuto Pro</h1>
      <p>Applicazione caricata correttamente!</p>
      <button onClick={() => alert('Funziona!')}>
        Test Button
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  }
};

export default App;
