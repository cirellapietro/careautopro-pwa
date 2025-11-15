// src/services/vehicleService.js
class VehicleService {
  async getUserVehicles(userId) {
    return await supabase.from('veicoli').select('*').eq('utente_id', userId);
  }
  
  async createVehicle(vehicleData) {
    return await supabase.from('veicoli').insert(vehicleData);
  }
  
  async updateVehicleKM(vehicleId, newKM) {
    return await supabase.from('veicoli').update({
      kmattuali: newKM,
      kmattualidataorainserimento: new Date().toISOString()
    }).eq('veicolo_id', vehicleId);
  }
}
