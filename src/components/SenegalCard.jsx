import React from 'react'
import { formatGD } from '../utils/data.js'

export default function SenegalCard({ ranked }) {
  const idx = ranked.findIndex(t =>
    t.isSenegal ||
    t.name?.toLowerCase().includes('sénégal') ||
    t.name?.toLowerCase().includes('senegal')
  )

  if (idx === -1) return null

  const sen = ranked[idx]
  const rank = idx + 1
  const gd = sen.gf - sen.ga
  const qualified = rank <= 8
  const onEdge = rank <= 8 && sen.pts <= 3
  const eliminated = rank > 8

  // Ce qu'il faut pour s'améliorer
  const next = ranked[7] // 8e place actuelle
  const needMorePts = next && sen.pts < next.pts
  const needBetterGD = next && sen.pts === next.pts && gd < (next.gf - next.ga)

  return (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(0,245,160,0.08) 0%, rgba(0,245,160,0.02) 100%)',
        border: '1px solid rgba(0,245,160,0.2)',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {/* Header card */}
        <div style={{
          padding: '14px 16px 12px',
          borderBottom: '1px solid rgba(0,245,160,0.1)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            fontSize: 32, lineHeight: 1,
            filter: 'drop-shadow(0 0 12px rgba(0,245,160,0.4))',
          }}>🇸🇳</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
              Sénégal <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400, fontSize: 13 }}>Gr.I</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
              {sen.played}/3 matchs · Lions de la Teranga
            </div>
          </div>

          {/* Rang actuel */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 26, fontWeight: 800,
              color: qualified ? '#00F5A0' : '#FF4757',
              lineHeight: 1,
            }}>
              #{rank}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
              sur 12
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '12px 16px',
          gap: 8,
          borderBottom: '1px solid rgba(0,245,160,0.08)',
        }}>
          {[
            { label: 'Points', value: sen.pts, color: '#00F5A0' },
            { label: 'Diff. buts', value: formatGD(gd), color: gd >= 0 ? '#00F5A0' : '#FF4757' },
            { label: 'Buts marqués', value: sen.gf, color: '#FFD166' },
            { label: 'Buts encaissés', value: sen.ga, color: 'rgba(255,255,255,0.5)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Statut */}
        <div style={{ padding: '12px 16px' }}>
          {qualified && !onEdge && (
            <StatusBlock
              icon="✅"
              title="Virtuelleement qualifié"
              desc="Le Sénégal est dans le top 8 des meilleurs 3es. Maintient cette position pour les 16es de finale."
              color="#00F5A0"
              bg="rgba(0,245,160,0.08)"
            />
          )}
          {onEdge && qualified && (
            <StatusBlock
              icon="⚠️"
              title="Qualifié mais sur le fil"
              desc={`Place #${rank}/8. Attention aux résultats des groupes pas encore terminés — chaque but compte.`}
              color="#FFD166"
              bg="rgba(255,209,102,0.08)"
            />
          )}
          {eliminated && (
            <StatusBlock
              icon="🔴"
              title={`Hors top 8 — ${needMorePts ? 'Besoin de points' : 'Besoin de buts'}`}
              desc={
                needMorePts
                  ? `Il faut au minimum autant de points que le 8e actuel (${next?.pts} pts) et une meilleure DB.`
                  : needBetterGD
                  ? `À égalité de points avec le 8e, il faut améliorer la différence de buts (actuellement ${formatGD(gd)}).`
                  : `Le Sénégal est 12e. Il reste des groupes à terminer — la situation peut évoluer.`
              }
              color="#FF4757"
              bg="rgba(255,71,87,0.08)"
            />
          )}

          {/* Comparaison avec le 8e */}
          {next && rank !== 8 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
                Comparaison avec le 8e actuel
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px',
              }}>
                <span style={{ fontSize: 14 }}>{next.flag}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{next.name}</span>
                <div style={{ display: 'flex', gap: 10, fontSize: 12 }}>
                  <span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Pts </span>
                    <span style={{ fontWeight: 700, color: next.pts > sen.pts ? '#FF4757' : '#00F5A0' }}>{next.pts}</span>
                  </span>
                  <span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>DB </span>
                    <span style={{ fontWeight: 700 }}>{formatGD(next.gf - next.ga)}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBlock({ icon, title, desc, color, bg }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 10, padding: '10px 12px',
      border: `1px solid ${color}22`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{title}</span>
      </div>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  )
}
