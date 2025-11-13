// src/services/configService.js
import { supabase } from '../lib/supabase.js';

class ConfigService {
  constructor() {
    this.configCache = new Map();
  }

  async getConfigValue(key) {
    if (this.configCache.has(key)) {
      return this.configCache.get(key);
    }

    try {
      // La tua tabella ha già i campi, usiamo la struttura esistente
      const { data, error } = await supabase
        .from('config')
        .select('valore')  // Il tuo campo si chiama 'valore'
        .eq('chiave', key)  // Suppongo tu abbia un campo chiave
        .single();

      if (error) throw error;
      
      this.configCache.set(key, data.valore);
      return data.valore;
    } catch (error) {
      console.error(`Errore nel caricamento config ${key}:`, error);
      return null;
    }
  }

  // Metodo per ottenere tutti i parametri AdMob
  async getAdMobConfig() {
    try {
      const admobAppId = await this.getConfigValue('admobidapp');
      const admobPublisherId = await this.getConfigValue('admobidpublisher');
      
      return {
        admobAppId,
        admobPublisherId,
        // Aggiungi altri ID per banner, interstitial se li hai
      };
    } catch (error) {
      console.error('Errore nel caricamento config AdMob:', error);
      return null;
    }
  }

  // Metodo per configurazione generale app
  async getAppConfig() {
    try {
      const debugMode = await this.getConfigValue('configDebugMode');
      const logLevel = await this.getConfigValue('loglevel');
      const pwaEnabled = await this.getConfigValue('pwa');
      
      return {
        debugMode: debugMode === 'true',
        logLevel,
        pwaEnabled: pwaEnabled === 'true'
      };
    } catch (error) {
      console.error('Errore nel caricamento config app:', error);
      return null;
    }
  }
}

export default new ConfigService();
