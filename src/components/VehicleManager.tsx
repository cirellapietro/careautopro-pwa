import React, { useState, useEffect } from 'react';
import './VehicleManager.css';

interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  owner: string;
}

const VehicleManager: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  // Dummy data per il momento
  useEffect(() => {
    setVehicles([
      {
        id: '1',
        plate: 'AB123CD',
        brand: 'Fiat',
        model: 'Panda',
        year: 2020,
        owner: 'Mario Rossi'
      }
    ]);
  }, []);

  if (loading) {
    return <div className="vehicle-manager">Caricamento...</div>;
  }

  return (
    <div className="vehicle-manager">
      <h2>Gestione Veicoli</h2>
      <div className="vehicle-list">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="vehicle-card">
            <h3>{vehicle.brand} {vehicle.model}</h3>
            <p>Targa: {vehicle.plate}</p>
            <p>Anno: {vehicle.year}</p>
            <p>Proprietario: {vehicle.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleManager;
