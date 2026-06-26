// ─────────────────────────────────────────────
// DRAPEAUX — génération depuis code pays ISO 3166-1 alpha-2
// Technique: Regional Indicator Symbols (U+1F1E6 à U+1F1FF)
// A=0x1F1E6, B=0x1F1E7 ... Z=0x1F1FF
// Ex: FR → 0x1F1EB + 0x1F1F7 → 🇫🇷
// Scotland/England = drapeaux subdivisions (tag sequences) → stockés séparément
// ─────────────────────────────────────────────

function isoToFlag(iso2) {
  if (!iso2 || iso2.length !== 2) return '🏳'
  const base = 0x1F1A5 // = 0x1F1E6 - 65 ('A')
  const a = iso2.toUpperCase().charCodeAt(0)
  const b = iso2.toUpperCase().charCodeAt(1)
  return String.fromCodePoint(base + a, base + b)
}

// Drapeaux subdivisions (tag sequences) — stockés via \u escapes pour éviter
// les problèmes d'encodage dans les bundlers
const SCOTLAND_FLAG = "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F"
const ENGLAND_FLAG  = "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F"
const WALES_FLAG    = "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F"

// Map nom anglais → code ISO (ou flag spécial)
const TEAM_ISO = {
  'Mexico':                 'MX',
  'South Korea':            'KR',
  'South Africa':           'ZA',
  'Czech Republic':         'CZ',
  'Switzerland':            'CH',
  'Canada':                 'CA',
  'Bosnia & Herzegovina':   'BA',
  'Qatar':                  'QA',
  'Brazil':                 'BR',
  'Morocco':                'MA',
  'Scotland':               '__SCO',   // spécial
  'Haiti':                  'HT',
  'USA':                    'US',
  'Australia':              'AU',
  'Paraguay':               'PY',
  'Turkey':                 'TR',
  'Germany':                'DE',
  'Ivory Coast':            'CI',
  'Ecuador':                'EC',
  'Curaçao':                'CW',
  'Netherlands':            'NL',
  'Japan':                  'JP',
  'Sweden':                 'SE',
  'Tunisia':                'TN',
  'Egypt':                  'EG',
  'Iran':                   'IR',
  'Belgium':                'BE',
  'New Zealand':            'NZ',
  'Spain':                  'ES',
  'Uruguay':                'UY',
  'Cape Verde':             'CV',
  'Saudi Arabia':           'SA',
  'France':                 'FR',
  'Norway':                 'NO',
  'Senegal':                'SN',
  'Iraq':                   'IQ',
  'Argentina':              'AR',
  'Austria':                'AT',
  'Algeria':                'DZ',
  'Jordan':                 'JO',
  'Colombia':               'CO',
  'Portugal':               'PT',
  'DR Congo':               'CD',
  'Uzbekistan':             'UZ',
  'England':                '__ENG',   // spécial
  'Ghana':                  'GH',
  'Croatia':                'HR',
  'Panama':                 'PA',
}

export function getFlag(nameEn) {
  const iso = TEAM_ISO[nameEn]
  if (!iso) return '🏳'
  if (iso === '__SCO') return SCOTLAND_FLAG
  if (iso === '__ENG') return ENGLAND_FLAG
  if (iso === '__WAL') return WALES_FLAG
  return isoToFlag(iso)
}

// ─────────────────────────────────────────────
// NOMS EN FRANÇAIS
// ─────────────────────────────────────────────
const NAMES_FR = {
  'Mexico':                 'Mexique',
  'South Korea':            'Corée du Sud',
  'South Africa':           'Afrique du Sud',
  'Czech Republic':         'Tchéquie',
  'Switzerland':            'Suisse',
  'Canada':                 'Canada',
  'Bosnia & Herzegovina':   'Bosnie-Herzégovine',
  'Qatar':                  'Qatar',
  'Brazil':                 'Brésil',
  'Morocco':                'Maroc',
  'Scotland':               'Écosse',
  'Haiti':                  'Haïti',
  'USA':                    'États-Unis',
  'Australia':              'Australie',
  'Paraguay':               'Paraguay',
  'Turkey':                 'Turquie',
  'Germany':                'Allemagne',
  'Ivory Coast':            "Côte d'Ivoire",
  'Ecuador':                'Équateur',
  'Curaçao':                'Curaçao',
  'Netherlands':            'Pays-Bas',
  'Japan':                  'Japon',
  'Sweden':                 'Suède',
  'Tunisia':                'Tunisie',
  'Egypt':                  'Égypte',
  'Iran':                   'Iran',
  'Belgium':                'Belgique',
  'New Zealand':            'Nouvelle-Zélande',
  'Spain':                  'Espagne',
  'Uruguay':                'Uruguay',
  'Cape Verde':             'Cap-Vert',
  'Saudi Arabia':           'Arabie Saoudite',
  'France':                 'France',
  'Norway':                 'Norvège',
  'Senegal':                'Sénégal',
  'Iraq':                   'Irak',
  'Argentina':              'Argentine',
  'Austria':                'Autriche',
  'Algeria':                'Algérie',
  'Jordan':                 'Jordanie',
  'Colombia':               'Colombie',
  'Portugal':               'Portugal',
  'DR Congo':               'RD Congo',
  'Uzbekistan':             'Ouzbékistan',
  'England':                'Angleterre',
  'Ghana':                  'Ghana',
  'Croatia':                'Croatie',
  'Panama':                 'Panama',
}

export function getNameFr(nameEn) {
  return NAMES_FR[nameEn] || nameEn
}

// ─────────────────────────────────────────────
// CALCUL DES CLASSEMENTS depuis les matchs bruts
// ─────────────────────────────────────────────
export function computeGroupsFromMatches(matches) {
  const groups = {}

  for (const m of matches) {
    const g = m.group
    if (!g || !g.startsWith('Group ')) continue
    const letter = g.replace('Group ', '')
    if (!groups[letter]) groups[letter] = {}

    const score = m.score?.ft
    if (score == null) continue

    const t1 = m.team1
    const t2 = m.team2
    const s1 = score[0]
    const s2 = score[1]

    if (!groups[letter][t1]) groups[letter][t1] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    if (!groups[letter][t2]) groups[letter][t2] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }

    groups[letter][t1].played++
    groups[letter][t2].played++
    groups[letter][t1].gf += s1; groups[letter][t1].ga += s2
    groups[letter][t2].gf += s2; groups[letter][t2].ga += s1

    if (s1 > s2) {
      groups[letter][t1].won++; groups[letter][t1].pts += 3
      groups[letter][t2].lost++
    } else if (s2 > s1) {
      groups[letter][t2].won++; groups[letter][t2].pts += 3
      groups[letter][t1].lost++
    } else {
      groups[letter][t1].drawn++; groups[letter][t1].pts++
      groups[letter][t2].drawn++; groups[letter][t2].pts++
    }
  }

  // Convertir en format affichable
  const result = {}
  for (const [letter, teamsObj] of Object.entries(groups)) {
    const teams = Object.entries(teamsObj).map(([nameEn, stats]) => ({
      nameEn,
      name:      getNameFr(nameEn),
      flag:      getFlag(nameEn),
      isSenegal: nameEn === 'Senegal',
      ...stats,
    }))
    result[letter] = { name: `Groupe ${letter}`, teams }
  }
  return result
}

// ─────────────────────────────────────────────
// EXTRAIRE LE 3e (trié selon critères FIFA)
// ─────────────────────────────────────────────
function sortTeams(teams) {
  return [...teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const gdB = b.gf - b.ga, gdA = a.gf - a.ga
    if (gdB !== gdA) return gdB - gdA
    return b.gf - a.gf
  })
}

export function getThirdPlaceTeams(groups) {
  const thirds = []
  for (const [groupKey, group] of Object.entries(groups)) {
    const sorted = sortTeams(group.teams)
    const third = sorted[2]
    if (third) {
      thirds.push({
        ...third,
        group: groupKey,
        gd: third.gf - third.ga,
        finished: group.teams.every(t => t.played >= 3),
      })
    }
  }
  return thirds
}

// ─────────────────────────────────────────────
// CLASSEMENT FIFA Art.13
// ─────────────────────────────────────────────
export function rankThirdPlaces(thirds) {
  return [...thirds].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const gdB = b.gf - b.ga, gdA = a.gf - a.ga
    if (gdB !== gdA) return gdB - gdA
    if (b.gf !== a.gf) return b.gf - a.gf
    return 0
  })
}

export function formatGD(gd) {
  if (gd > 0) return `+${gd}`
  return `${gd}`
}

// ─────────────────────────────────────────────
// FETCH openfootball — 100% gratuit, CORS ouvert, pas d'auth
// ─────────────────────────────────────────────
const OPENFOOTBALL_URL =
  'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json'

export async function fetchWorldCupData() {
  const res = await fetch(OPENFOOTBALL_URL, {
    signal: AbortSignal.timeout(10000),
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// ─────────────────────────────────────────────
// MATCHS DU JOUR
// ─────────────────────────────────────────────
export function extractTodayResults(matches) {
  const today = new Date().toISOString().split('T')[0]
  return matches
    .filter(m => m.date === today && m.group?.startsWith('Group') && m.score?.ft != null)
    .map(m => ({
      home:       getNameFr(m.team1),
      away:       getNameFr(m.team2),
      homeFlag:   getFlag(m.team1),
      awayFlag:   getFlag(m.team2),
      homeScore:  m.score.ft[0],
      awayScore:  m.score.ft[1],
      group:      m.group,
      status:     'Terminé',
    }))
}

export function extractUpcomingToday(matches) {
  const today = new Date().toISOString().split('T')[0]
  return matches
    .filter(m => m.date === today && m.group?.startsWith('Group') && m.score?.ft == null)
    .map(m => ({
      home:     getNameFr(m.team1),
      away:     getNameFr(m.team2),
      homeFlag: getFlag(m.team1),
      awayFlag: getFlag(m.team2),
      time:     m.time,
      group:    m.group,
      status:   'Prévu',
      homeScore: null,
      awayScore: null,
    }))
}
