// src/services/gpsTrackingService.js
class GPSTrackingService {
  async requestPermission() {
    // Richiedi permessi GPS
    return await navigator.permissions.query({ name: 'geolocation' });
  }
  
  async startTracking(vehicleId, updateInterval) {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.saveGPSData(vehicleId, position),
      (error) => console.error('GPS Error:', error),
      { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: updateInterval * 1000 
      }
    );
  }
  
  async saveGPSData(vehicleId, position) {
    // Salva in treckinggps
    // Calcola km percorsi
    // Aggiorna veicoli.kmdagps
  }
}
