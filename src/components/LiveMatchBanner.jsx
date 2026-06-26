import React from 'react'

export default function LiveMatchBanner({ matches }) {
  if (!matches || matches.length === 0) return null

  return (
    <div style={{ padding: '0 16px 12px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#FF4757', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4757', display: 'inline-block', animation: 'pulse-dot 1s infinite' }} />
        MATCHS EN COURS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {matches.map((m, i) => (
          <div key={m.id || i} style={{
            background: 'rgba(255,71,87,0.08)',
            border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FF4757', minWidth: 28 }}>
              {m.minute}'
            </span>
            <span style={{ fontSize: 13, flex: 1 }}>{m.homeFlag} {m.home}</span>
            <span style={{
              fontSize: 15, fontWeight: 700,
              background: '#FF4757', color: '#fff',
              borderRadius: 8, padding: '2px 10px',
              minWidth: 48, textAlign: 'center'
            }}>
              {m.homeScore} – {m.awayScore}
            </span>
            <span style={{ fontSize: 13, flex: 1, textAlign: 'right' }}>{m.away} {m.awayFlag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
