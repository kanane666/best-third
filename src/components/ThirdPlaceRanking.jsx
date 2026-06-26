import React, { useState } from 'react'
import { formatGD } from '../utils/data.js'

const STATUS_CONFIG = {
  qualified: {
    label: 'Qualifié',
    color: '#00F5A0',
    bg: 'rgba(0,245,160,0.1)',
    border: 'rgba(0,245,160,0.25)',
    dot: '#00F5A0',
  },
  onEdge: {
    label: 'En jeu',
    color: '#FFD166',
    bg: 'rgba(255,209,102,0.1)',
    border: 'rgba(255,209,102,0.25)',
    dot: '#FFD166',
  },
  eliminated: {
    label: 'Éliminé',
    color: 'rgba(255,255,255,0.35)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)',
    dot: 'rgba(255,255,255,0.3)',
  },
}

function getStatus(rank, pts, finished) {
  // Top 4 avec 4pts = quasiment assurés
  if (rank <= 4 && pts >= 4) return 'qualified'
  // Top 8 avec 4pts = qualifiés
  if (rank <= 8 && pts >= 4) return 'qualified'
  // Top 8 avec 3pts = fragile
  if (rank <= 8 && pts === 3) return 'onEdge'
  // Top 8 avec 2pts = très fragile
  if (rank <= 8 && pts === 2) return 'onEdge'
  return 'eliminated'
}

function RankBadge({ rank }) {
  const isTop8 = rank <= 8
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: isTop8 ? 'rgba(0,245,160,0.12)' : 'rgba(255,255,255,0.05)',
      border: `1px solid ${isTop8 ? 'rgba(0,245,160,0.2)' : 'rgba(255,255,255,0.08)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700,
      color: isTop8 ? '#00F5A0' : 'rgba(255,255,255,0.35)',
      flexShrink: 0,
    }}>
      {rank}
    </div>
  )
}

function TeamRow({ team, rank, isSenegal, isAnimated, delay }) {
  const status = getStatus(rank, team.pts, team.finished)
  const cfg = STATUS_CONFIG[status]
  const gd = team.gf - team.ga

  return (
    <div
      className={isAnimated ? 'animate-in' : ''}
      style={{
        animationDelay: `${delay}ms`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '11px 14px',
        background: isSenegal
          ? 'linear-gradient(90deg, rgba(0,245,160,0.07) 0%, rgba(0,245,160,0.02) 100%)'
          : rank <= 8 ? 'rgba(255,255,255,0.02)' : 'transparent',
        borderRadius: 10,
        border: isSenegal
          ? '1px solid rgba(0,245,160,0.2)'
          : '1px solid transparent',
        marginBottom: 4,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s',
      }}
    >
      {/* Barre de gauche colorée pour le Sénégal */}
      {isSenegal && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: '#00F5A0', borderRadius: '0 2px 2px 0',
        }} />
      )}

      <RankBadge rank={rank} />

      {/* Drapeau + nom */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{team.flag}</span>
          <span style={{
            fontSize: 13, fontWeight: isSenegal ? 700 : 500,
            color: isSenegal ? '#fff' : rank <= 8 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {team.name}
          </span>
          {isSenegal && (
            <span style={{ fontSize: 11, color: '#00F5A0', fontWeight: 600 }}>🦁</span>
          )}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
          Gr.{team.group} · {team.played}/3 matchs
        </div>
      </div>

      {/* Stats compactes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {/* DB */}
        <div style={{ textAlign: 'center', minWidth: 28 }}>
          <div style={{
            fontSize: 12, fontWeight: 600,
            color: gd > 0 ? '#00F5A0' : gd < 0 ? '#FF4757' : 'rgba(255,255,255,0.5)'
          }}>
            {formatGD(gd)}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>DB</div>
        </div>
        {/* Buts */}
        <div style={{ textAlign: 'center', minWidth: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
            {team.gf}:{team.ga}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>Buts</div>
        </div>
        {/* Points */}
        <div style={{
          minWidth: 36, textAlign: 'center',
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderRadius: 8, padding: '4px 6px',
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: cfg.color }}>
            {team.pts}
          </div>
          <div style={{ fontSize: 9, color: cfg.color, opacity: 0.7, marginTop: 0 }}>pts</div>
        </div>
      </div>
    </div>
  )
}

export default function ThirdPlaceRanking({ ranked, loading }) {
  const [showAll, setShowAll] = useState(false)

  const cutoff = 8
  const visible = showAll ? ranked : ranked.slice(0, 12)

  // Trouver la position du Sénégal
  const senegalIdx = ranked.findIndex(t => t.isSenegal || t.name?.toLowerCase().includes('sénégal') || t.name?.toLowerCase().includes('senegal'))

  return (
    <div style={{ padding: '0 16px 16px' }}>

      {/* Titre section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
            Classement meilleurs 3es
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            8 équipes qualifiées sur 12 · Critères FIFA Art.13
          </div>
        </div>
        <div style={{
          background: 'rgba(0,245,160,0.1)', border: '1px solid rgba(0,245,160,0.2)',
          borderRadius: 8, padding: '4px 10px',
          fontSize: 11, fontWeight: 700, color: '#00F5A0',
        }}>
          {ranked.filter((_, i) => i < cutoff).length}/8
        </div>
      </div>

      {/* Légende */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
            <span style={{ fontSize: 10, color: cfg.color }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Ligne de coupure "Top 8" */}
      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {visible.map((team, i) => {
            const rank = i + 1
            const isCutoffLine = rank === cutoff + 1
            const isSenegal = team.isSenegal ||
              team.name?.toLowerCase().includes('sénégal') ||
              team.name?.toLowerCase().includes('senegal')

            return (
              <React.Fragment key={`${team.group}-${team.name}`}>
                {isCutoffLine && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0',
                  }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,71,87,0.3)' }} />
                    <span style={{ fontSize: 10, color: '#FF4757', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      ✂ Ligne d'élimination
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,71,87,0.3)' }} />
                  </div>
                )}
                {rank === 1 && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                  }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(0,245,160,0.2)' }} />
                    <span style={{ fontSize: 10, color: '#00F5A0', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      ✓ Top 8 qualifiés
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(0,245,160,0.2)' }} />
                  </div>
                )}
                <TeamRow
                  team={team}
                  rank={rank}
                  isSenegal={isSenegal}
                  isAnimated={true}
                  delay={i * 40}
                />
              </React.Fragment>
            )
          })}

          {/* Sénégal hors top 12 visible */}
          {senegalIdx > 11 && !showAll && (
            <div style={{ marginTop: 8 }}>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 8 }} />
              <TeamRow team={ranked[senegalIdx]} rank={senegalIdx + 1} isSenegal={true} isAnimated={false} delay={0} />
            </div>
          )}
        </>
      )}

      {/* Note critères */}
      <div style={{
        marginTop: 14, padding: '10px 12px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        fontSize: 11, color: 'rgba(255,255,255,0.35)',
        lineHeight: 1.7,
      }}>
        <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Critères de départage :</span>
        {' '}1. Points · 2. Diff. de buts · 3. Buts marqués · 4. Fair-play · 5. Ranking FIFA
      </div>
    </div>
  )
}

function SkeletonList() {
  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          height: 54, borderRadius: 10, marginBottom: 4,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          animationDelay: `${i * 80}ms`,
        }} />
      ))}
    </div>
  )
}
