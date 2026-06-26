// ─────────────────────────────────────────────
// TABLE DRAPEAUX  nom anglais → emoji
// (noms exacts retournés par openfootball/worldcup.json)
// ─────────────────────────────────────────────
const FLAGS = {
  // Groupe A
  'Mexico': '🇲🇽',
  'South Korea': '🇰🇷',
  'South Africa': '🇿🇦',
  'Czech Republic': '🇨🇿',
  // Groupe B
  'Switzerland': '🇨🇭',
  'Canada': '🇨🇦',
  'Bosnia & Herzegovina': '🇧🇦',
  'Qatar': '🇶🇦',
  // Groupe C
  'Brazil': '🇧🇷',
  'Morocco': '🇲🇦',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Haiti': '🇭🇹',
  // Groupe D
  'USA': '🇺🇸',
  'Australia': '🇦🇺',
  'Paraguay': '🇵🇾',
  'Turkey': '🇹🇷',
  // Groupe E
  'Germany': '🇩🇪',
  'Ivory Coast': '🇨🇮',
  'Ecuador': '🇪🇨',
  'Curaçao': '🇨🇼',
  // Groupe F
  'Netherlands': '🇳🇱',
  'Japan': '🇯🇵',
  'Sweden': '🇸🇪',
  'Tunisia': '🇹🇳',
  // Groupe G
  'Egypt': '🇪🇬',
  'Iran': '🇮🇷',
  'Belgium': '🇧🇪',
  'New Zealand': '🇳🇿',
  // Groupe H
  'Spain': '🇪🇸',
  'Uruguay': '🇺🇾',
  'Cape Verde': '🇨🇻',
  'Saudi Arabia': '🇸🇦',
  // Groupe I
  'France': '🇫🇷',
  'Norway': '🇳🇴',
  'Senegal': '🇸🇳',
  'Iraq': '🇮🇶',
  // Groupe J
  'Argentina': '🇦🇷',
  'Austria': '🇦🇹',
  'Algeria': '🇩🇿',
  'Jordan': '🇯🇴',
  // Groupe K
  'Colombia': '🇨🇴',
  'Portugal': '🇵🇹',
  'DR Congo': '🇨🇩',
  'Uzbekistan': '🇺🇿',
  // Groupe L
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Ghana': '🇬🇭',
  'Croatia': '🇭🇷',
  'Panama': '🇵🇦',
}

// Noms FR pour l'affichage
const NAMES_FR = {
  'Mexico': 'Mexique',
  'South Korea': 'Corée du Sud',
  'South Africa': 'Afrique du Sud',
  'Czech Republic': 'Tchéquie',
  'Switzerland': 'Suisse',
  'Canada': 'Canada',
  'Bosnia & Herzegovina': 'Bosnie-Herzégovine',
  'Qatar': 'Qatar',
  'Brazil': 'Brésil',
  'Morocco': 'Maroc',
  'Scotland': 'Écosse',
  'Haiti': 'Haïti',
  'USA': 'États-Unis',
  'Australia': 'Australie',
  'Paraguay': 'Paraguay',
  'Turkey': 'Turquie',
  'Germany': 'Allemagne',
  'Ivory Coast': "Côte d'Ivoire",
  'Ecuador': 'Équateur',
  'Curaçao': 'Curaçao',
  'Netherlands': 'Pays-Bas',
  'Japan': 'Japon',
  'Sweden': 'Suède',
  'Tunisia': 'Tunisie',
  'Egypt': 'Égypte',
  'Iran': 'Iran',
  'Belgium': 'Belgique',
  'New Zealand': 'Nouvelle-Zélande',
  'Spain': 'Espagne',
  'Uruguay': 'Uruguay',
  'Cape Verde': 'Cap-Vert',
  'Saudi Arabia': 'Arabie Saoudite',
  'France': 'France',
  'Norway': 'Norvège',
  'Senegal': 'Sénégal',
  'Iraq': 'Irak',
  'Argentina': 'Argentine',
  'Austria': 'Autriche',
  'Algeria': 'Algérie',
  'Jordan': 'Jordanie',
  'Colombia': 'Colombie',
  'Portugal': 'Portugal',
  'DR Congo': 'RD Congo',
  'Uzbekistan': 'Ouzbékistan',
  'England': 'Angleterre',
  'Ghana': 'Ghana',
  'Croatia': 'Croatie',
  'Panama': 'Panama',
}

export function getFlag(nameEn) {
  return FLAGS[nameEn] || '🏳️'
}

export function getNameFr(nameEn) {
  return NAMES_FR[nameEn] || nameEn
}

// ─────────────────────────────────────────────
// CALCULER LES CLASSEMENTS depuis les matchs bruts
// ─────────────────────────────────────────────
export function computeGroupsFromMatches(matches) {
  const groups = {}

  for (const m of matches) {
    const g = m.group
    if (!g || !g.startsWith('Group ')) continue
    const letter = g.replace('Group ', '')
    if (!groups[letter]) groups[letter] = {}

    const score = m.score?.ft
    if (score == null) continue // match pas encore joué

    const t1 = m.team1
    const t2 = m.team2
    const s1 = score[0]
    const s2 = score[1]

    if (!groups[letter][t1]) groups[letter][t1] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
    if (!groups[letter][t2]) groups[letter][t2] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }

    groups[letter][t1].played++
    groups[letter][t2].played++
    groups[letter][t1].gf += s1
    groups[letter][t1].ga += s2
    groups[letter][t2].gf += s2
    groups[letter][t2].ga += s1

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

  // Convertir en format utilisable avec drapeaux et noms FR
  const result = {}
  for (const [letter, teamsObj] of Object.entries(groups)) {
    const teams = Object.entries(teamsObj).map(([nameEn, stats]) => ({
      nameEn,
      name: getNameFr(nameEn),
      flag: getFlag(nameEn),
      isSenegal: nameEn === 'Senegal',
      ...stats,
    }))
    result[letter] = { name: `Groupe ${letter}`, teams }
  }
  return result
}

// ─────────────────────────────────────────────
// EXTRAIRE LE 3e DE CHAQUE GROUPE (classé selon critères FIFA)
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
        // Un groupe est "terminé" si tous les 4 équipes ont joué 3 matchs
        finished: group.teams.every(t => t.played >= 3),
      })
    }
  }
  return thirds
}

// ─────────────────────────────────────────────
// CLASSEMENT FIFA Art.13 des 12 meilleurs 3es
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
// FETCH openfootball — CORS ouvert, gratuit, pas d'auth
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
// MATCHS EN COURS (depuis les données openfootball)
// openfootball marque les matchs live avec score null si pas joués
// Pour les matchs "en cours" on ne peut pas les détecter facilement
// depuis ce JSON statique — on retourne un tableau vide
// (le JSON raw n'a pas d'info "en cours")
// ─────────────────────────────────────────────
export function extractLiveMatches(matches) {
  // openfootball ne fournit pas de statut live dans le JSON brut
  // On retourne les matchs du jour sans score (= en cours ou à venir)
  const today = new Date().toISOString().split('T')[0]
  return matches
    .filter(m => m.date === today && m.group?.startsWith('Group'))
    .filter(m => m.score?.ft == null) // pas encore fini
    .map(m => ({
      home: getNameFr(m.team1),
      away: getNameFr(m.team2),
      homeFlag: getFlag(m.team1),
      awayFlag: getFlag(m.team2),
      group: m.group,
      time: m.time,
      status: 'Prévu',
      homeScore: null,
      awayScore: null,
    }))
}

// Matchs joués aujourd'hui (avec score)
export function extractTodayResults(matches) {
  const today = new Date().toISOString().split('T')[0]
  return matches
    .filter(m => m.date === today && m.group?.startsWith('Group') && m.score?.ft != null)
    .map(m => ({
      home: getNameFr(m.team1),
      away: getNameFr(m.team2),
      homeFlag: getFlag(m.team1),
      awayFlag: getFlag(m.team2),
      homeScore: m.score.ft[0],
      awayScore: m.score.ft[1],
      group: m.group,
      status: 'Terminé',
    }))
}
