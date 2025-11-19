import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VehicleManager.css';

interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  owner: string;
  color?: string;
  chassis?: string;
}

const VehicleManager: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const navigate = useNavigate();

  // Dummy data per il momento
  useEffect(() => {
    setVehicles([
      {
        id: '1',
        plate: 'AB123CD',
        brand: 'Fiat',
        model: 'Panda',
        year: 2020,
        owner: 'Mario Rossi',
        color: 'Blu',
        chassis: 'ZFA19900001234567'
      },
      {
        id: '2', 
        plate: 'EF456GH',
        brand: 'Ford',
        model: 'Focus',
        year: 2019,
        owner: 'Luca Bianchi',
        color: 'Rosso',
        chassis: 'WF0FXXGAJFJ123456'
      }
    ]);
  }, []);

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    // Naviga alla pagina di dettaglio veicolo
    navigate(`/vehicle/${vehicle.id}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return <div className="vehicle-manager">Caricamento...</div>;
  }

  return (
    <div className="vehicle-manager">
      {/* Header */}
      <div className="vehicle-manager-header">
        <button 
          className="back-to-dashboard-btn"
          onClick={handleBackToDashboard}
        >
          ← Torna alla Dashboard
        </button>
        <div>
          <h1>Gestione Veicoli</h1>
          {selectedVehicle && (
            <div className="selected-vehicle-info">
              <span className="vehicle-badge">
                Selezionato: {selectedVehicle.brand} {selectedVehicle.model} - {selectedVehicle.plate}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Sezione Veicolo Attivo */}
      {selectedVehicle && (
        <div className="active-vehicle-section">
          <div className="section-header">
            <h2>Veicolo Selezionato</h2>
            <button className="manage-vehicles-btn">
              Gestisci Veicolo
            </button>
          </div>
          <div className="vehicle-quick-info">
            <div className="vehicle-detail">
              <strong>Targa</strong>
              <span>{selectedVehicle.plate}</span>
            </div>
            <div className="vehicle-detail">
              <strong>Marca/Modello</strong>
              <span>{selectedVehicle.brand} {selectedVehicle.model}</span>
            </div>
            <div className="vehicle-detail">
              <strong>Anno</strong>
              <span>{selectedVehicle.year}</span>
            </div>
            <div className="vehicle-detail">
              <strong>Proprietario</strong>
              <span>{selectedVehicle.owner}</span>
            </div>
          </div>
        </div>
      )}

      {/* Lista Veicoli */}
      <div className="vehicles-list-section">
        <h2>Lista Veicoli ({vehicles.length})</h2>
        <div className="vehicles-grid">
          {vehicles.map(vehicle => (
            <div 
              key={vehicle.id} 
              className={`vehicle-card ${selectedVehicle?.id === vehicle.id ? 'selected' : ''}`}
              onClick={() => handleVehicleClick(vehicle)}
            >
              <div className="vehicle-card-header">
                <h3>{vehicle.brand} {vehicle.model}</h3>
                <span className="vehicle-plate">{vehicle.plate}</span>
              </div>
              <div className="vehicle-card-body">
                <div className="vehicle-info">
                  <span className="info-label">Anno:</span>
                  <span className="info-value">{vehicle.year}</span>
                </div>
                <div className="vehicle-info">
                  <span className="info-label">Proprietario:</span>
                  <span className="info-value">{vehicle.owner}</span>
                </div>
                {vehicle.color && (
                  <div className="vehicle-info">
                    <span className="info-label">Colore:</span>
                    <span className="info-value">{vehicle.color}</span>
                  </div>
                )}
              </div>
              <div className="vehicle-card-footer">
                <button className="view-details-btn">
                  Visualizza Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleManager;
