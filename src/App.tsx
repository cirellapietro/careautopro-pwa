// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componenti Pages
import Dashboard from './components/Dashboard';
import VehicleManager from './components/VehicleManager';
import VehicleDetail from './components/VehicleDetail';
import CustomerManager from './components/CustomerManager';
import ServiceManager from './components/ServiceManager';
import InventoryManager from './components/InventoryManager';
import Login from './components/Login';

// Componenti Layout
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Stili
import './App.css';

// Context (se hai l'auth context)
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    // <AuthProvider> // Se hai l'auth context, scommenta
    <Router>
      <div className="App">
        <Routes>
          {/* Route pubblica - Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Route protette con Layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Redirect a dashboard come route di default */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Gestione Veicoli */}
            <Route path="vehicle-manager" element={<VehicleManager />} />
            <Route path="vehicle/:id" element={<VehicleDetail />} />
            
            {/* Gestione Clienti */}
            <Route path="customers" element={<CustomerManager />} />
            
            {/* Gestione Interventi */}
            <Route path="services" element={<ServiceManager />} />
            
            {/* Gestione Inventario */}
            <Route path="inventory" element={<InventoryManager />} />
            
            {/* Route 404 */}
            <Route path="*" element={<div>Pagina non trovata - 404</div>} />
          </Route>
        </Routes>
        
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
    // </AuthProvider>
  );
}

export default App;
