import { useState, useEffect, useCallback, useRef } from 'react'
import {
  fetchWorldCupData,
  computeGroupsFromMatches,
  getThirdPlaceTeams,
  rankThirdPlaces,
  extractLiveMatches,
  extractTodayResults,
} from '../utils/data.js'

const REFRESH_INTERVAL = 60_000 // 60 secondes

export function useLiveData() {
  const [groups, setGroups]             = useState({})
  const [liveMatches, setLiveMatches]   = useState([])
  const [todayResults, setTodayResults] = useState([])
  const [ranked, setRanked]             = useState([])
  const [loading, setLoading]           = useState(true)
  const [lastUpdate, setLastUpdate]     = useState(null)
  const [error, setError]               = useState(null)
  const timerRef = useRef(null)

  const loadData = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true)
    setError(null)

    try {
      const data = await fetchWorldCupData()
      const matches = data.matches || []

      // Calculer les classements depuis les matchs
      const computedGroups = computeGroupsFromMatches(matches)
      const thirds = getThirdPlaceTeams(computedGroups)
      const rankedThirds = rankThirdPlaces(thirds)

      // Matchs du jour
      const live = extractLiveMatches(matches)
      const results = extractTodayResults(matches)

      setGroups(computedGroups)
      setRanked(rankedThirds)
      setLiveMatches(live)
      setTodayResults(results)
      setLastUpdate(new Date())
    } catch (err) {
      setError(err.message)
      // Garder les données précédentes si on en a déjà
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Auto-refresh toutes les 60s
  useEffect(() => {
    timerRef.current = setInterval(() => loadData(true), REFRESH_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [loadData])

  const refresh = useCallback(() => loadData(), [loadData])

  const source = error ? 'error' : ranked.length > 0 ? 'live' : 'loading'

  return {
    groups,
    liveMatches,
    todayResults,
    ranked,
    loading,
    lastUpdate,
    source,
    error,
    refresh,
  }
}
