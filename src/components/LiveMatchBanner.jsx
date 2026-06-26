import React from 'react'

export default function LiveMatchBanner({ matches }) {
  if (!matches || matches.length === 0) return null

  const live = matches.filter(m => m.homeScore !== null)
  const upcoming = matches.filter(m => m.homeScore === null)

  return (
    <div style={{ padding: '0 16px 14px' }}>
      {live.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#FF4757', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4757', display: 'inline-block', animation: 'pulse-dot 1s infinite' }} />
            RÉSULTATS DU JOUR
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: upcoming.length > 0 ? 10 : 0 }}>
            {live.map((m, i) => (
              <MatchRow key={i} m={m} finished />
            ))}
          </div>
        </>
      )}
      {upcoming.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#3D9AFF', letterSpacing: '0.08em', marginBottom: 8 }}>
            À VENIR AUJOURD'HUI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {upcoming.map((m, i) => (
              <MatchRow key={i} m={m} finished={false} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function MatchRow({ m, finished }) {
  return (
    <div style={{
      background: finished ? 'rgba(255,255,255,0.04)' : 'rgba(61,154,255,0.07)',
      border: `1px solid ${finished ? 'rgba(255,255,255,0.08)' : 'rgba(61,154,255,0.2)'}`,
      borderRadius: 10,
      padding: '9px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <span style={{ fontSize: 13, flex: 1, textAlign: 'right' }}>{m.homeFlag} {m.home}</span>
      <div style={{
        fontSize: finished ? 15 : 12,
        fontWeight: 700,
        background: finished ? 'rgba(255,255,255,0.08)' : 'rgba(61,154,255,0.15)',
        color: finished ? '#fff' : '#3D9AFF',
        borderRadius: 7,
        padding: '3px 10px',
        minWidth: finished ? 52 : 64,
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        {finished ? `${m.homeScore} – ${m.awayScore}` : m.time || 'Prévu'}
      </div>
      <span style={{ fontSize: 13, flex: 1 }}>{m.awayFlag} {m.away}</span>
    </div>
  )
}
