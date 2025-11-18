// src/services/userProfileService.js
const userProfileService = {
  getUserProfile: async (userId) => {
    // Implementazione base
    return { id: userId, name: 'Utente' };
  },
  
  updateUserProfile: async (userId, data) => {
    // Implementazione base
    return { success: true };
  }
};

export default userProfileService;
