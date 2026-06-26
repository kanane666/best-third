import { useState, useEffect, useCallback, useRef } from 'react'
import {
  STATIC_GROUPS,
  fetchLiveGroups,
  fetchLiveMatches,
  normalizeApiGroups,
  normalizeLiveMatches,
  getThirdPlaceTeams,
  rankThirdPlaces
} from '../utils/data.js'

const REFRESH_INTERVAL = 60_000 // 60 secondes

export function useLiveData() {
  const [groups, setGroups]           = useState(STATIC_GROUPS)
  const [liveMatches, setLiveMatches] = useState([])
  const [ranked, setRanked]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [lastUpdate, setLastUpdate]   = useState(null)
  const [source, setSource]           = useState('static') // 'live' | 'static'
  const [error, setError]             = useState(null)
  const timerRef = useRef(null)

  const computeRanking = useCallback((grps) => {
    const thirds = getThirdPlaceTeams(grps)
    return rankThirdPlaces(thirds)
  }, [])

  const loadData = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true)
    setError(null)

    try {
      // Essayer l'API live
      const [groupsRes, matchesRes] = await Promise.allSettled([
        fetchLiveGroups(),
        fetchLiveMatches()
      ])

      let resolvedGroups = null

      if (groupsRes.status === 'fulfilled') {
        resolvedGroups = normalizeApiGroups(groupsRes.value)
      }

      if (resolvedGroups && Object.keys(resolvedGroups).length >= 8) {
        setGroups(resolvedGroups)
        setRanked(computeRanking(resolvedGroups))
        setSource('live')
      } else {
        // Fallback sur les données statiques
        setGroups(STATIC_GROUPS)
        setRanked(computeRanking(STATIC_GROUPS))
        setSource('static')
      }

      if (matchesRes.status === 'fulfilled') {
        const live = normalizeLiveMatches(matchesRes.value)
        setLiveMatches(live)
      }

      setLastUpdate(new Date())
    } catch (err) {
      // Fallback silencieux
      setGroups(STATIC_GROUPS)
      setRanked(computeRanking(STATIC_GROUPS))
      setSource('static')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [computeRanking])

  // Initialisation
  useEffect(() => {
    loadData()
  }, [loadData])

  // Recompute ranking when groups change (pour cohérence)
  useEffect(() => {
    if (groups) setRanked(computeRanking(groups))
  }, [groups, computeRanking])

  // Auto-refresh
  useEffect(() => {
    timerRef.current = setInterval(() => loadData(true), REFRESH_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [loadData])

  const refresh = useCallback(() => loadData(), [loadData])

  return { groups, liveMatches, ranked, loading, lastUpdate, source, error, refresh }
}
