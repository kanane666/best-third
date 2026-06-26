import React, { useState } from 'react'
import { formatGD } from '../utils/data.js'

export default function GroupsGrid({ groups }) {
  const [expanded, setExpanded] = useState(null)

  const groupEntries = Object.entries(groups)

  return (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
        Groupes <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>— 3e de chaque groupe</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {groupEntries.map(([key, group]) => {
          const sorted = [...group.teams].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts
            const gdA = a.gf - a.ga, gdB = b.gf - b.ga
            if (gdB !== gdA) return gdB - gdA
            return b.gf - a.gf
          })
          const third = sorted[2]
          if (!third) return null

          const isSen = third.isSenegal ||
            third.name?.toLowerCase().includes('sénégal') ||
            third.name?.toLowerCase().includes('senegal')
          const gd = third.gf - third.ga
          const isOpen = expanded === key

          return (
            <div
              key={key}
              onClick={() => setExpanded(isOpen ? null : key)}
              style={{
                background: isSen
                  ? 'linear-gradient(135deg, rgba(0,245,160,0.08), rgba(0,245,160,0.02))'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isSen ? 'rgba(0,245,160,0.2)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12,
                padding: '10px 12px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {/* Groupe label */}
              <div style={{ fontSize: 10, fontWeight: 700, color: isSen ? '#00F5A0' : 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: '0.06em' }}>
                GROUPE {key}
              </div>

              {/* 3e équipe */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 18 }}>{third.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: isSen ? '#fff' : 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {third.name}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: isSen ? '#00F5A0' : '#FFD166' }}>{third.pts} pts</span>
                    <span style={{ fontSize: 11, color: gd > 0 ? '#00F5A0' : gd < 0 ? '#FF4757' : 'rgba(255,255,255,0.4)' }}>{formatGD(gd)}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{third.played}/3</span>
                  </div>
                </div>
              </div>

              {/* Détail du groupe si ouvert */}
              {isOpen && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {sorted.map((t, i) => (
                    <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', opacity: i === 2 ? 1 : 0.5 }}>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', minWidth: 12 }}>{i + 1}</span>
                      <span style={{ fontSize: 13 }}>{t.flag}</span>
                      <span style={{ fontSize: 11, flex: 1, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#FFD166' }}>{t.pts}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 10 }}>
        Appuie sur un groupe pour voir le classement complet
      </p>
    </div>
  )
}
