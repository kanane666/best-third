// ─────────────────────────────────────────────
// STATIC FALLBACK DATA  (updated to last known state after J2/J3 results)
// Used when the external API is unavailable (CORS / down / rate-limited)
// ─────────────────────────────────────────────

export const STATIC_GROUPS = {
  A: {
    name: "Groupe A",
    teams: [
      { name: "Mexique",       flag: "🇲🇽", played: 3, won: 3, drawn: 0, lost: 0, gf: 6, ga: 1, pts: 9 },
      { name: "Corée du Sud",  flag: "🇰🇷", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 3, pts: 3 },
      { name: "Afrique du Sud",flag: "🇿🇦", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 4, pts: 3 },
      { name: "Tchéquie",      flag: "🇨🇿", played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 3, pts: 0 },
    ]
  },
  B: {
    name: "Groupe B",
    teams: [
      { name: "Suisse",            flag: "🇨🇭", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 2, pts: 7 },
      { name: "Qatar",             flag: "🇶🇦", played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 3, pts: 4 },
      { name: "Bosnie-Herzégovine",flag: "🇧🇦", played: 3, won: 1, drawn: 1, lost: 1, gf: 5, ga: 6, pts: 4 },
      { name: "Cameroun",          flag: "🇨🇲", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 4, pts: 1 },
    ]
  },
  C: {
    name: "Groupe C",
    teams: [
      { name: "Maroc",    flag: "🇲🇦", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 1, pts: 7 },
      { name: "Brésil",  flag: "🇧🇷", played: 3, won: 2, drawn: 0, lost: 1, gf: 7, ga: 3, pts: 6 },
      { name: "Écosse",  flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 3, won: 1, drawn: 0, lost: 2, gf: 1, ga: 4, pts: 3 },
      { name: "Haïti",   flag: "🇭🇹", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 6, pts: 1 },
    ]
  },
  D: {
    name: "Groupe D",
    teams: [
      { name: "États-Unis", flag: "🇺🇸", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 2, pts: 7 },
      { name: "Australie",  flag: "🇦🇺", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, pts: 4 },
      { name: "Paraguay",   flag: "🇵🇾", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 4, pts: 4 },
      { name: "Turquie",    flag: "🇹🇷", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 3, pts: 1 },
    ]
  },
  E: {
    name: "Groupe E",
    teams: [
      { name: "Allemagne",  flag: "🇩🇪", played: 3, won: 2, drawn: 1, lost: 0, gf: 8, ga: 2, pts: 7 },
      { name: "Côte d\'Ivoire",flag:"🇨🇮", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, pts: 6 },
      { name: "Équateur",   flag: "🇪🇨", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, pts: 4 },
      { name: "Curaçao",    flag: "🇨🇼", played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 8, pts: 0 },
    ]
  },
  F: {
    name: "Groupe F",
    teams: [
      { name: "Pays-Bas", flag: "🇳🇱", played: 3, won: 3, drawn: 0, lost: 0, gf: 9, ga: 2, pts: 9 },
      { name: "Japon",    flag: "🇯🇵", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 5, pts: 4 },
      { name: "Suède",    flag: "🇸🇪", played: 3, won: 1, drawn: 1, lost: 1, gf: 7, ga: 7, pts: 4 },
      { name: "Tunisie",  flag: "🇹🇳", played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 7, pts: 0 },
    ]
  },
  G: {
    name: "Groupe G",
    teams: [
      { name: "Égypte",       flag: "🇪🇬", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, pts: 4 },
      { name: "Iran",         flag: "🇮🇷", played: 2, won: 1, drawn: 1, lost: 0, gf: 2, ga: 1, pts: 4 },
      { name: "Belgique",     flag: "🇧🇪", played: 2, won: 0, drawn: 2, lost: 0, gf: 1, ga: 1, pts: 2 },
      { name: "Nouvelle-Zélande",flag:"🇳🇿", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 3, pts: 0 },
    ]
  },
  H: {
    name: "Groupe H",
    teams: [
      { name: "Uruguay",      flag: "🇺🇾", played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, pts: 4 },
      { name: "Espagne",      flag: "🇪🇸", played: 2, won: 1, drawn: 1, lost: 0, gf: 4, ga: 2, pts: 4 },
      { name: "Cap-Vert",     flag: "🇨🇻", played: 2, won: 0, drawn: 2, lost: 0, gf: 2, ga: 2, pts: 2 },
      { name: "Arabie Saoudite",flag:"🇸🇦", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 5, pts: 0 },
    ]
  },
  I: {
    name: "Groupe I",
    teams: [
      { name: "France",   flag: "🇫🇷", played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 2, pts: 6 },
      { name: "Norvège",  flag: "🇳🇴", played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 3, pts: 6 },
      { name: "Sénégal",  flag: "🇸🇳", played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 7, pts: 3, isSenegal: true },
      { name: "Irak",     flag: "🇮🇶", played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 9, pts: 0 },
    ]
  },
  J: {
    name: "Groupe J",
    teams: [
      { name: "Argentine", flag: "🇦🇷", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 1, pts: 6 },
      { name: "Autriche",  flag: "🇦🇹", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 3, pts: 3 },
      { name: "Algérie",   flag: "🇩🇿", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 4, pts: 3 },
      { name: "Jordanie",  flag: "🇯🇴", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 4, pts: 0 },
    ]
  },
  K: {
    name: "Groupe K",
    teams: [
      { name: "Colombie",     flag: "🇨🇴", played: 2, won: 2, drawn: 0, lost: 0, gf: 4, ga: 0, pts: 6 },
      { name: "Portugal",     flag: "🇵🇹", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 2, pts: 3 },
      { name: "RD Congo",     flag: "🇨🇩", played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 2, pts: 1 },
      { name: "Ouzbékistan",  flag: "🇺🇿", played: 2, won: 0, drawn: 1, lost: 1, gf: 0, ga: 4, pts: 1 },
    ]
  },
  L: {
    name: "Groupe L",
    teams: [
      { name: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 1, pts: 6 },
      { name: "Ghana",      flag: "🇬🇭", played: 2, won: 1, drawn: 0, lost: 1, gf: 4, ga: 4, pts: 3 },
      { name: "Croatie",    flag: "🇭🇷", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 4, pts: 3 },
      { name: "Panama",     flag: "🇵🇦", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 3, pts: 0 },
    ]
  }
}

// ─────────────────────────────────────────────
// EXTRAIRE LE 3e DE CHAQUE GROUPE
// ─────────────────────────────────────────────
export function getThirdPlaceTeams(groups) {
  const thirds = []
  for (const [groupKey, group] of Object.entries(groups)) {
    const sorted = [...group.teams].sort((a, b) => {
      const ptsDiff = b.pts - a.pts
      if (ptsDiff !== 0) return ptsDiff
      const dbA = a.gf - a.ga
      const dbB = b.gf - b.ga
      const dbDiff = dbB - dbA
      if (dbDiff !== 0) return dbDiff
      return b.gf - a.gf
    })
    const third = sorted[2]
    if (third) {
      thirds.push({
        ...third,
        group: groupKey,
        gd: third.gf - third.ga,
        finished: third.played >= 3
      })
    }
  }
  return thirds
}

// ─────────────────────────────────────────────
// CLASSEMENT DES MEILLEURS 3es (critères FIFA Art. 13)
// ─────────────────────────────────────────────
export function rankThirdPlaces(thirds) {
  return [...thirds].sort((a, b) => {
    // 1. Points
    if (b.pts !== a.pts) return b.pts - a.pts
    // 2. Différence de buts
    const gdA = a.gf - a.ga
    const gdB = b.gf - b.ga
    if (gdB !== gdA) return gdB - gdA
    // 3. Buts marqués
    if (b.gf !== a.gf) return b.gf - a.gf
    // 4. Fair play (on ne l'a pas → tirage FIFA → on laisse l'ordre)
    return 0
  })
}

// ─────────────────────────────────────────────
// STATUT DE QUALIFICATION
// ─────────────────────────────────────────────
export function getQualStatus(rank, pts, finished) {
  if (rank <= 4) return 'qualified'    // top 4 → quasiment assurés
  if (rank <= 8 && pts >= 4) return 'qualified'
  if (rank <= 8 && pts >= 3) return 'onEdge'   // dans le top 8 mais fragile
  if (rank <= 8) return 'onEdge'
  return 'eliminated'
}

// ─────────────────────────────────────────────
// FETCH depuis worldcup26.ir (CORS ouvert, no auth)
// ─────────────────────────────────────────────
export async function fetchLiveGroups() {
  const res = await fetch('https://worldcup26.ir/get/groups', {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchLiveMatches() {
  const res = await fetch('https://worldcup26.ir/get/games', {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// ─────────────────────────────────────────────
// NORMALISER la réponse de worldcup26.ir → notre format interne
// La structure exacte peut varier selon la version de l'API
// ─────────────────────────────────────────────
export function normalizeApiGroups(apiData) {
  // worldcup26.ir retourne un objet avec les groupes
  // On essaie de mapper vers notre format STATIC_GROUPS
  if (!apiData || typeof apiData !== 'object') return null

  // Format possible: { groups: [ { name: "Group A", teams: [...] } ] }
  // ou directement { A: { teams: [...] } }
  let groupsArray = null

  if (Array.isArray(apiData)) groupsArray = apiData
  else if (apiData.groups && Array.isArray(apiData.groups)) groupsArray = apiData.groups
  else if (apiData.data && Array.isArray(apiData.data)) groupsArray = apiData.data

  if (!groupsArray) return null

  const result = {}
  const letters = 'ABCDEFGHIJKL'.split('')

  groupsArray.forEach((grp, idx) => {
    const key = grp.name?.replace('Group ', '').replace('Groupe ', '').trim() || letters[idx]
    const teams = (grp.teams || grp.standings || []).map(t => ({
      name:   t.team?.name || t.name || t.teamName || '?',
      flag:   getFlagEmoji(t.team?.code || t.code || t.countryCode || ''),
      played: parseInt(t.played ?? t.gamesPlayed ?? t.mp ?? 0),
      won:    parseInt(t.won ?? t.wins ?? t.w ?? 0),
      drawn:  parseInt(t.drawn ?? t.draws ?? t.d ?? 0),
      lost:   parseInt(t.lost ?? t.losses ?? t.l ?? 0),
      gf:     parseInt(t.goalsFor ?? t.gf ?? t.gf ?? 0),
      ga:     parseInt(t.goalsAgainst ?? t.ga ?? t.gc ?? 0),
      pts:    parseInt(t.points ?? t.pts ?? 0),
      isSenegal: (t.team?.name || t.name || '').toLowerCase().includes('senegal') ||
                 (t.team?.name || t.name || '').toLowerCase().includes('sénégal')
    }))
    if (teams.length > 0) result[key] = { name: `Groupe ${key}`, teams }
  })

  return Object.keys(result).length > 0 ? result : null
}

// ─────────────────────────────────────────────
// NORMALISER les matchs live de l'API
// ─────────────────────────────────────────────
export function normalizeLiveMatches(apiData) {
  let matches = []
  if (Array.isArray(apiData)) matches = apiData
  else if (apiData?.games) matches = apiData.games
  else if (apiData?.matches) matches = apiData.matches
  else if (apiData?.data) matches = apiData.data

  return matches
    .filter(m => {
      const status = (m.status || m.state || '').toLowerCase()
      return status.includes('live') || status.includes('progress') ||
             status.includes('1h') || status.includes('2h') ||
             status.includes('ht') || status === 'in_play'
    })
    .map(m => ({
      id: m.id || m._id,
      home: m.homeTeam?.name || m.home?.name || m.team1 || '?',
      away: m.awayTeam?.name || m.away?.name || m.team2 || '?',
      homeFlag: getFlagEmoji(m.homeTeam?.code || m.home?.code || ''),
      awayFlag: getFlagEmoji(m.awayTeam?.code || m.away?.code || ''),
      homeScore: parseInt(m.score?.home ?? m.homeScore ?? m.goals1 ?? 0),
      awayScore: parseInt(m.score?.away ?? m.awayScore ?? m.goals2 ?? 0),
      minute: m.minute || m.elapsed || m.time || '?',
      group: m.group || m.stage || '',
      status: m.status || m.state || 'LIVE'
    }))
}

// ─────────────────────────────────────────────
// HELPER — code ISO 2 → emoji drapeau
// ─────────────────────────────────────────────
export function getFlagEmoji(code) {
  if (!code || code.length < 2) return '🏳️'
  const FLAGS = {
    MEX:'🇲🇽', KOR:'🇰🇷', ZAF:'🇿🇦', CZE:'🇨🇿',
    CHE:'🇨🇭', QAT:'🇶🇦', BIH:'🇧🇦', CMR:'🇨🇲',
    MAR:'🇲🇦', BRA:'🇧🇷', SCO:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', HTI:'🇭🇹',
    USA:'🇺🇸', AUS:'🇦🇺', PRY:'🇵🇾', TUR:'🇹🇷',
    DEU:'🇩🇪', CIV:'🇨🇮', ECU:'🇪🇨', CUW:'🇨🇼',
    NED:'🇳🇱', JPN:'🇯🇵', SWE:'🇸🇪', TUN:'🇹🇳',
    EGY:'🇪🇬', IRN:'🇮🇷', BEL:'🇧🇪', NZL:'🇳🇿',
    URY:'🇺🇾', ESP:'🇪🇸', CPV:'🇨🇻', SAU:'🇸🇦',
    FRA:'🇫🇷', NOR:'🇳🇴', SEN:'🇸🇳', IRQ:'🇮🇶',
    ARG:'🇦🇷', AUT:'🇦🇹', DZA:'🇩🇿', JOR:'🇯🇴',
    COL:'🇨🇴', PRT:'🇵🇹', COD:'🇨🇩', UZB:'🇺🇿',
    ENG:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', GHA:'🇬🇭', HRV:'🇭🇷', PAN:'🇵🇦',
    // 2-letter codes
    MX:'🇲🇽', KR:'🇰🇷', ZA:'🇿🇦', CZ:'🇨🇿',
    CH:'🇨🇭', QA:'🇶🇦', BA:'🇧🇦', CM:'🇨🇲',
    MA:'🇲🇦', BR:'🇧🇷', US:'🇺🇸', AU:'🇦🇺',
    PY:'🇵🇾', TR:'🇹🇷', DE:'🇩🇪', CI:'🇨🇮',
    EC:'🇪🇨', NL:'🇳🇱', JP:'🇯🇵', SE:'🇸🇪',
    TN:'🇹🇳', EG:'🇪🇬', IR:'🇮🇷', BE:'🇧🇪',
    NZ:'🇳🇿', UY:'🇺🇾', ES:'🇪🇸', CV:'🇨🇻',
    SA:'🇸🇦', FR:'🇫🇷', NO:'🇳🇴', SN:'🇸🇳',
    IQ:'🇮🇶', AR:'🇦🇷', AT:'🇦🇹', DZ:'🇩🇿',
    JO:'🇯🇴', CO:'🇨🇴', PT:'🇵🇹', CD:'🇨🇩',
    UZ:'🇺🇿', GH:'🇬🇭', HR:'🇭🇷', PA:'🇵🇦',
  }
  return FLAGS[code.toUpperCase()] || '🏳️'
}

export function formatGD(gd) {
  if (gd > 0) return `+${gd}`
  return `${gd}`
}

export function getLastUpdated() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}
