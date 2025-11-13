// src/components/AdBanner.js
import React, { useState, useEffect } from 'react';
import useMonetization from '../hooks/useMonetization.js';
import './AdBanner.css';

const AdBanner = ({ position = 'top', adType = 'banner' }) => {
  const { adConfig, showAd } = useMonetization();
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    if (adConfig?.admobAppId) {
      initializeAd();
    }
  }, [adConfig]);

  const initializeAd = async () => {
    try {
      await showAd(adType);
      setAdVisible(true);
    } catch (error) {
      console.error('Errore nell inizializzazione ad:', error);
    }
  };

  // Placeholder per sviluppo
  const renderAdPlaceholder = () => (
    <div className={`ad-container ad-${position}`}>
      <div className="ad-label">
        {adConfig?.admobAppId ? 'AdMob Configurato' : 'Configura AdMob'}
      </div>
      <div className="ad-content">
        {adConfig?.admobAppId ? (
          <>
            <p>App ID: {adConfig.admobAppId}</p>
            <p>Publisher: {adConfig.admobPublisherId}</p>
            <small>Posizione: {position} - Tipo: {adType}</small>
          </>
        ) : (
          <p>Configura admobidapp e admobidpublisher nel database</p>
        )}
      </div>
    </div>
  );

  if (!adVisible) {
    return (
      <div className="ad-container ad-loading">
        <p>Caricamento annuncio...</p>
      </div>
    );
  }

  return renderAdPlaceholder();
};

export default AdBanner;
