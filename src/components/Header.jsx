import React from 'react'

export default function Header({ loading, lastUpdate, source, onRefresh }) {
  const time = lastUpdate
    ? lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : '--:--'

  return (
    <header style={{
      background: 'linear-gradient(180deg, #0A0E1A 0%, rgba(10,14,26,0) 100%)',
      padding: '16px 16px 8px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo + titre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(0,245,160,0.12)',
            border: '1px solid rgba(0,245,160,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>🦁</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', color: '#fff' }}>
              Lions <span style={{ color: '#00F5A0' }}>3es</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>
              CM 2026 · Meilleurs 3es
            </div>
          </div>
        </div>

        {/* Status + refresh */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Source badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: source === 'live' ? 'rgba(0,245,160,0.1)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${source === 'live' ? 'rgba(0,245,160,0.25)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 20, padding: '4px 10px',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: source === 'live' ? '#00F5A0' : '#888',
              display: 'block',
              animation: source === 'live' && !loading ? 'pulse-dot 1.5s ease infinite' : 'none'
            }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: source === 'live' ? '#00F5A0' : 'rgba(255,255,255,0.45)' }}>
              {loading ? 'Synchro...' : source === 'live' ? 'LIVE' : 'Données locales'}
            </span>
          </div>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: loading ? 0.5 : 1,
              transition: 'opacity 0.2s',
            }}
            aria-label="Actualiser"
          >
            <span style={{
              display: 'inline-block',
              animation: loading ? 'spin 0.8s linear infinite' : 'none'
            }}>↻</span>
          </button>
        </div>
      </div>

      {/* Dernière mise à jour */}
      <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>
        {loading ? 'Actualisation...' : `Mis à jour à ${time}`}
      </div>
    </header>
  )
}
