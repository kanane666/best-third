import React from 'react'

const TABS = [
  { id: 'ranking', icon: '🏆', label: 'Classement' },
  { id: 'senegal', icon: '🦁', label: 'Sénégal' },
  { id: 'groups',  icon: '📊', label: 'Groupes' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0, left: '50%',
      transform: 'translateX(-50%)',
      width: '100%', maxWidth: 480,
      background: 'rgba(7,11,20,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      zIndex: 200,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1, padding: '10px 0 12px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              transition: 'opacity 0.15s',
            }}
          >
            <span style={{
              fontSize: 20,
              filter: isActive ? 'drop-shadow(0 0 8px rgba(0,245,160,0.7))' : 'none',
              transition: 'filter 0.2s',
            }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: isActive ? '#00F5A0' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.15s',
            }}>
              {tab.label}
            </span>
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                width: 24, height: 2,
                background: '#00F5A0',
                borderRadius: 2,
              }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}
