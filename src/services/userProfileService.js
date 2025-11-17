import { supabase } from '../lib/supabase.js';

class UserProfileService {
  // Versione semplificata per ora - possiamo migliorare dopo
  async isUserAdmin(userId) {
    try {
      // Per ora restituiamo sempre false (utente generico)
      // Implementeremo la logica reale dopo
      return { isAdmin: false, error: null };
    } catch (error) {
      console.error('Errore nel verificare profilo admin:', error);
      return { isAdmin: false, error };
    }
  }

  async getUserProfile(userId) {
    try {
      // Per ora restituiamo profilo generico
      return { 
        data: { profiloutente: 'generico', profiloutente_id: 2 }, 
        error: null 
      };
    } catch (error) {
      console.error('Errore nel caricamento profilo utente:', error);
      return { data: null, error };
    }
  }
}

export default new UserProfileService();