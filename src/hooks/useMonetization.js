// src/hooks/useMonetization.js
import { useState, useEffect } from 'react';
import configService from '../services/configService';

const useMonetization = () => {
  const [adConfig, setAdConfig] = useState(null);
  const [appConfig, setAppConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfigurations();
  }, []);

  const loadConfigurations = async () => {
    try {
      const [admobConfig, appConfig] = await Promise.all([
        configService.getAdMobConfig(),
        configService.getAppConfig()
      ]);
      
      setAdConfig(admobConfig);
      setAppConfig(appConfig);
    } catch (error) {
      console.error('Errore nel caricamento configurazioni:', error);
    } finally {
      setLoading(false);
    }
  };

  const showAd = async (adType = 'banner') => {
    if (!adConfig?.admobAppId) {
      console.warn('AdMob non configurato');
      return false;
    }

    // Qui implementeremo la logica per mostrare diversi tipi di ad
    switch (adType) {
      case 'banner':
        return showBannerAd();
      case 'interstitial':
        return showInterstitialAd();
      case 'rewarded':
        return showRewardedAd();
      default:
        return false;
    }
  };

  const showBannerAd = async () => {
    // Implementazione banner AdMob
    console.log('Mostra banner AdMob');
    return true;
  };

  const showInterstitialAd = async () => {
    // Implementazione interstitial AdMob
    console.log('Mostra interstitial AdMob');
    return true;
  };

  const showRewardedAd = async () => {
    // Implementazione rewarded AdMob
    console.log('Mostra rewarded AdMob');
    return true;
  };

  return {
    adConfig,
    appConfig,
    loading,
    showAd,
    showBannerAd,
    showInterstitialAd,
    showRewardedAd
  };
};

export default useMonetization;
