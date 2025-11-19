// src/components/VehicleDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VehicleDetail.css';

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Dummy data - sostituisci con API call
  const vehicle = {
    id: id,
    plate: 'AB123CD',
    brand: 'Fiat',
    model: 'Panda',
    year: 2020,
    owner: 'Mario Rossi',
    color: 'Blu',
    chassis: 'ZFA19900001234567',
    fuelType: 'Benzina',
    engine: '1.2 69 CV',
    registrationDate: '2020-03-15'
  };

  const handleBack = () => {
    navigate('/vehicle-manager');
  };

  return (
    <div className="vehicle-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Torna a Gestione Veicoli
        </button>
        <h1>Dettaglio Veicolo</h1>
      </div>

      <div className="vehicle-info-card">
        <div className="vehicle-main-info">
          <h2>{vehicle.brand} {vehicle.model}</h2>
          <span className="vehicle-plate">{vehicle.plate}</span>
        </div>

        <div className="vehicle-details-grid">
          <div className="detail-item">
            <strong>Proprietario:</strong>
            <span>{vehicle.owner}</span>
          </div>
          <div className="detail-item">
            <strong>Anno:</strong>
            <span>{vehicle.year}</span>
          </div>
          <div className="detail-item">
            <strong>Colore:</strong>
            <span>{vehicle.color}</span>
          </div>
          <div className="detail-item">
            <strong>Tipo Carburante:</strong>
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="detail-item">
            <strong>Motore:</strong>
            <span>{vehicle.engine}</span>
          </div>
          <div className="detail-item">
            <strong>Data Immatricolazione:</strong>
            <span>{vehicle.registrationDate}</span>
          </div>
          <div className="detail-item full-width">
            <strong>Telaio:</strong>
            <span>{vehicle.chassis}</span>
          </div>
        </div>
      </div>

      <div className="vehicle-actions">
        <button className="btn btn-primary">Modifica Veicolo</button>
        <button className="btn btn-secondary">Aggiungi Intervento</button>
        <button className="btn btn-danger">Elimina Veicolo</button>
      </div>
    </div>
  );
};

export default VehicleDetail;
