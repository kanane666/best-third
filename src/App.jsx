import React, { useState } from 'react'
import Header from './components/Header.jsx'
import LiveMatchBanner from './components/LiveMatchBanner.jsx'
import ThirdPlaceRanking from './components/ThirdPlaceRanking.jsx'
import SenegalCard from './components/SenegalCard.jsx'
import GroupsGrid from './components/GroupsGrid.jsx'
import BottomNav from './components/BottomNav.jsx'
import { useLiveData } from './hooks/useLiveData.js'

export default function App() {
  const [tab, setTab] = useState('ranking')
  const { groups, liveMatches, ranked, loading, lastUpdate, source, error, refresh } = useLiveData()

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-deep)', paddingBottom: 80 }}>

      {/* Header sticky */}
      <Header
        loading={loading}
        lastUpdate={lastUpdate}
        source={source}
        onRefresh={refresh}
      />

      {/* Matchs en cours (visible sur tous les tabs si des matchs sont live) */}
      {liveMatches.length > 0 && (
        <LiveMatchBanner matches={liveMatches} />
      )}

      {/* Contenu par tab */}
      <main>
        {tab === 'ranking' && (
          <div key="ranking" className="animate-in">
            {/* Hero stats */}
            <HeroStats ranked={ranked} />
            <ThirdPlaceRanking ranked={ranked} loading={loading} />
          </div>
        )}

        {tab === 'senegal' && (
          <div key="senegal" className="animate-in">
            <SenegalCard ranked={ranked} />
            {/* Aussi afficher le classement complet pour contexte */}
            <div style={{ padding: '0 16px 8px' }}>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <ThirdPlaceRanking ranked={ranked} loading={loading} />
          </div>
        )}

        {tab === 'groups' && (
          <div key="groups" className="animate-in">
            <GroupsGrid groups={groups} />
          </div>
        )}
      </main>

      {/* Message d'erreur discret si fallback */}
      {error && source === 'static' && (
        <div style={{
          margin: '0 16px 12px',
          padding: '8px 12px',
          background: 'rgba(255,209,102,0.06)',
          border: '1px solid rgba(255,209,102,0.15)',
          borderRadius: 8,
          fontSize: 11,
          color: 'rgba(255,209,102,0.7)',
        }}>
          ⚡ API live indisponible — données locales affichées (dernière mise à jour connue)
        </div>
      )}

      {/* Bottom nav */}
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}

function HeroStats({ ranked }) {
  const qualified = ranked.filter((_, i) => i < 8).length
  const senIdx = ranked.findIndex(t =>
    t.isSenegal ||
    t.name?.toLowerCase().includes('sénégal') ||
    t.name?.toLowerCase().includes('senegal')
  )
  const senRank = senIdx >= 0 ? senIdx + 1 : '?'
  const senPts = senIdx >= 0 ? ranked[senIdx].pts : 0
  const senOk = senRank <= 8

  return (
    <div style={{ padding: '8px 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
      {[
        {
          label: 'Places dispo',
          value: `${8 - qualified}/8`,
          sub: 'encore à prendre',
          color: '#3D9AFF',
        },
        {
          label: '🦁 Sénégal',
          value: `#${senRank}`,
          sub: `${senPts} point${senPts > 1 ? 's' : ''}`,
          color: senOk ? '#00F5A0' : '#FF4757',
        },
        {
          label: 'Groupes finis',
          value: `${ranked.filter(t => t.finished).length}/12`,
          sub: 'groupes terminés',
          color: '#FFD166',
        },
      ].map(s => (
        <div key={s.label} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12,
          padding: '10px 10px 8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
