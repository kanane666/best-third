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
  const { groups, todayActivity, ranked, loading, lastUpdate, source, error, refresh } = useLiveData()

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-deep)', paddingBottom: 80 }}>
      <Header loading={loading} lastUpdate={lastUpdate} source={source} onRefresh={refresh} />

      {todayActivity.length > 0 && <LiveMatchBanner matches={todayActivity} />}

      {error && ranked.length === 0 && (
        <div style={{
          margin: '0 16px 12px', padding: '12px 14px',
          background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)',
          borderRadius: 10, fontSize: 12, color: 'rgba(255,100,100,0.9)', lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Impossible de charger les données</div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>Verifie ta connexion.</div>
          <button onClick={refresh} style={{
            marginTop: 8, padding: '6px 14px',
            background: 'rgba(255,71,87,0.15)', border: '1px solid rgba(255,71,87,0.3)',
            borderRadius: 6, color: '#FF4757', fontSize: 12, cursor: 'pointer',
          }}>Réessayer</button>
        </div>
      )}

      <main>
        {tab === 'ranking' && (
          <div key="ranking" className="animate-in">
            <HeroStats ranked={ranked} loading={loading} />
            <ThirdPlaceRanking ranked={ranked} loading={loading} />
          </div>
        )}
        {tab === 'senegal' && (
          <div key="senegal" className="animate-in">
            <SenegalCard ranked={ranked} />
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

      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}

function HeroStats({ ranked, loading }) {
  const senIdx  = ranked.findIndex(t => t.isSenegal)
  const senRank = senIdx >= 0 ? senIdx + 1 : null
  const senPts  = senIdx >= 0 ? ranked[senIdx].pts : 0
  const senOk   = senRank !== null && senRank <= 8
  const qualifiedCount = ranked.filter((_, i) => i < 8).length

  return (
    <div style={{ padding: '8px 16px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
      {[
        { label: 'Qualifiés', value: loading ? '…' : `${qualifiedCount}/8`, sub: 'places confirmées', color: '#3D9AFF' },
        {
          label: '🦁 Sénégal',
          value: loading ? '…' : senRank ? `#${senRank}` : '—',
          sub: loading ? '' : `${senPts} pt${senPts > 1 ? 's' : ''}`,
          color: senOk ? '#00F5A0' : senRank ? '#FF4757' : 'rgba(255,255,255,0.4)',
        },
        { label: 'Groupes', value: loading ? '…' : `${ranked.filter(t => t.finished).length}/12`, sub: 'terminés', color: '#FFD166' },
      ].map(s => (
        <div key={s.label} style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12, padding: '10px 10px 8px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
