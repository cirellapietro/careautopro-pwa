import React, { useEffect } from 'react'

const AdBanner = ({ type = 'adsense', config }) => {
  useEffect(() => {
    if (config && type === 'adsense' && config.adsense_client_id) {
      // Carica script AdSense solo se non è già presente
      if (!window.adsbygoogle) {
        const script = document.createElement('script')
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsense_client_id}`
        script.async = true
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)

        script.onload = () => {
          // Forza il push degli annunci dopo il caricamento
          try {
            if (window.adsbygoogle) {
              window.adsbygoogle.push({})
            }
          } catch (err) {
            console.log('AdSense load error:', err)
          }
        }

        return () => {
          // Cleanup
          if (document.head.contains(script)) {
            document.head.removeChild(script)
          }
        }
      }
    }
  }, [config, type])

  if (!config) {
    return (
      <div className="ad-placeholder">
        <div className="ad-placeholder-content">
          <span>Spazio pubblicitario</span>
          <small>Configurazione in caricamento...</small>
        </div>
      </div>
    )
  }

  if (type === 'adsense' && config.adsense_client_id) {
    return (
      <div className="ad-banner adsense">
        <ins 
          className="adsbygoogle"
          style={{ 
            display: 'block',
            textAlign: 'center',
            minHeight: '90px'
          }}
          data-ad-client={config.adsense_client_id}
          data-ad-slot={config.adsense_ad_slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({})`}
        </script>
      </div>
    )
  }

  if (type === 'admob' && config.admob_app_id) {
    return (
      <div className="ad-banner admob">
        <div className="admob-banner">
          <div className="admob-content">
            <h4>📱 AdMob Banner</h4>
            <div className="admob-info">
              <small>App: {config.admob_app_id.substring(0, 20)}...</small>
              <small>Unit: {config.admob_banner_unit_id.substring(0, 20)}...</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback per configurazione mancante
  return (
    <div className="ad-banner fallback">
      <div className="fallback-content">
        <span>🤑 Spazio Pubblicitario</span>
        <small>Configura AdSense o AdMob nella tabella config</small>
      </div>
    </div>
  )
}

export default AdBanner