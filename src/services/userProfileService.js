// src/services/userProfileService.js
import { supabase } from '../lib/supabase.js';

class UserProfileService {
  // Ottiene il profilo utente BASATO SULLA RELAZIONE
  async getUserProfile(userId) {
    try {
      // Prima otteniamo il profiloutente_id dell'utente
      const { data: userData, error: userError } = await supabase
        .from('utenti') // Suppongo tu abbia una tabella utenti che collega a auth.users
        .select('profiloutente_id')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      // Poi otteniamo i dettagli del profilo
      const { data: profileData, error: profileError } = await supabase
        .from('utentiprofilo')
        .select('*')
        .eq('profiloutente_id', userData.profiloutente_id)
        .single();

      if (profileError) throw profileError;
      return { data: profileData, error: null };
    } catch (error) {
      console.error('Errore nel caricamento profilo utente:', error);
      return { data: null, error };
    }
  }

  // Verifica se l'utente è amministratore (profiloutente_id = 1)
  async isUserAdmin(userId) {
    try {
      const { data: userData, error } = await supabase
        .from('utenti') // Tabella che collega auth.users a utentiprofilo
        .select('profiloutente_id')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { isAdmin: userData?.profiloutente_id === 1, error: null };
    } catch (error) {
      console.error('Errore nel verificare profilo admin:', error);
      return { isAdmin: false, error };
    }
  }
}

export default new UserProfileService();
