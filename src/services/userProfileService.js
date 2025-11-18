const userProfileService = {
  /**
   * Recupera il profilo utente
   */
  getUserProfile: async (userId) => {
    try {
      // Simulazione chiamata API
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Errore nel caricamento profilo');
      }
      return await response.json();
    } catch (error) {
      console.error('Errore userProfileService:', error);
      // Fallback dati
      return {
        id: userId,
        name: 'Utente',
        email: 'utente@example.com',
        role: 'user'
      };
    }
  },

  /**
   * Aggiorna il profilo utente
   */
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        throw new Error('Errore nell\'aggiornamento profilo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Errore aggiornamento profilo:', error);
      throw error;
    }
  },

  /**
   * Cambia password utente
   */
  changePassword: async (userId, currentPassword, newPassword) => {
    try {
      const response = await fetch(`/api/users/${userId}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Errore cambio password:', error);
      return false;
    }
  }
};

export default userProfileService;
