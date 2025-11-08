import React from 'react'
import { useTraduzioni } from '../i18n'

const SelettoreLingua = () => {
  const { lingua, cambiaLingua, lingueDisponibili, t } = useTraduzioni()

  const bandiere = {
    it: '🇮🇹',
    en: '🇺🇸', 
    es: '🇪🇸',
    fr: '🇫🇷'
  }

  return (
    <div className="lingua-selector">
      <select 
        value={lingua}
        onChange={(e) => cambiaLingua(e.target.value)}
        className="lingua-select"
        title={t('language')}
      >
        {lingueDisponibili.map(lang => (
          <option key={lang} value={lang}>
            {bandiere[lang]} {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelettoreLingua