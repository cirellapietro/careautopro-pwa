// src/components/VehicleManager.js - VERSIONE CON RELAZIONE PROFILO
import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicleService.js';
import userProfileService from './userProfileService.js';
import './VehicleManager.css';

const VehicleManager = ({ user, onVehicleSelect }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    loadUserDataAndVehicles();
  }, [user]);

  const loadUserDataAndVehicles = async () => {
    setLoading(true);
    
    // Carica profilo utente BASATO SULLA RELAZIONE
    const { isAdmin: userIsAdmin } = await userProfileService.isUserAdmin(user.id);
    setIsAdmin(userIsAdmin);
    
    const { data: profile } = await userProfileService.getUserProfile(user.id);
    setUserProfile(profile);
    
    // Carica veicoli CON FILTRI BASATI SU RELAZIONE
    const { data, error } = await vehicleService.getUserVehicles(user.id);
    
    if (!error && data) {
      setVehicles(data);
      if (data.length > 0 && !selectedVehicle) {
        setSelectedVehicle(data[0]);
        onVehicleSelect?.(data[0]);
      }
    }
    setLoading(false);
  };

  // ... resto del codice ...

  return (
    <div className="vehicle-manager">
      {/* Header con info profilo BASATO SU RELAZIONE */}
      <div className="vehicle-header">
        <div>
          <h2>🚗 Gestione Veicoli</h2>
          <p className="user-role">
            {isAdmin ? '👑 Amministratore' : '👤 Utente Generico'} 
            {userProfile && ` - ${userProfile.profiloutente}`}
          </p>
        </div>
        
        {/* Pulsante disponibile in base alla RELAZIONE PROFILO */}
        {(isAdmin || vehicles.length === 0) && (
          <button 
            className="add-vehicle-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Aggiungi Veicolo
          </button>
        )}
      </div>

      {/* Visualizzazione veicoli con info RELAZIONE */}
      <div className="vehicles-list">
        {vehicles.map(vehicle => (
          <div key={vehicle.veicolo_id} className="vehicle-card">
            <div className="vehicle-info">
              <h4>{vehicle.nomeveicolo}</h4>
              
              {/* Info aggiuntiva per admin BASATA SU RELAZIONE */}
              {isAdmin && (
                <p className="vehicle-owner">
                  Proprietario ID: {vehicle.utente_id}
                </p>
              )}
              
              <p className="vehicle-km">
                {vehicle.kmattuali?.toLocaleString() || 0} km
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleManager;
