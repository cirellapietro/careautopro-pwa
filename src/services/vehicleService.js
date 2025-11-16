// src/services/vehicleService.js - VERSIONE CORRETTA CON RELAZIONE
import { supabase } from '../lib/supabase.js';
import userProfileService from './userProfileService.js';

class VehicleService {
  // Ottiene veicoli IN BASE AL PROFILO
  async getUserVehicles(userId) {
    const { isAdmin, error: profileError } = await userProfileService.isUserAdmin(userId);
    
    if (profileError) {
      return { data: null, error: profileError };
    }

    try {
      let query = supabase.from('veicoli').select('*');
      
      // FILTRO BASATO SU RELAZIONE PROFILO:
      // - Profilo 1 (admin): vede TUTTI i veicoli
      // - Profilo 2 (generico): vede solo i PROPRI veicoli
      if (!isAdmin) {
        query = query.eq('utente_id', userId);
      }
      
      const { data, error } = await query.order('dataora', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Errore nel caricamento veicoli:', error);
      return { data: null, error };
    }
  }

  // Crea veicolo CON CONTROLLO AUTORIZZAZIONE
  async createVehicle(vehicleData, currentUserId) {
    const { isAdmin, error: profileError } = await userProfileService.isUserAdmin(currentUserId);
    
    if (profileError) {
      return { data: null, error: profileError };
    }

    // CONTROLLO BASATO SU RELAZIONE PROFILO:
    // - Profilo 2 (generico): può creare solo per se stesso
    // - Profilo 1 (admin): può creare per qualsiasi utente
    if (!isAdmin && vehicleData.utente_id !== currentUserId) {
      return { data: null, error: 'Non autorizzato: puoi creare solo i tuoi veicoli' };
    }

    try {
      const { data, error } = await supabase
        .from('veicoli')
        .insert([vehicleData])
        .select();

      if (error) throw error;
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Errore nella creazione veicolo:', error);
      return { data: null, error };
    }
  }
}

export default new VehicleService();
