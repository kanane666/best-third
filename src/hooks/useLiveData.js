import { useState, useEffect, useCallback, useRef } from 'react'
import {
  fetchWorldCupData,
  computeGroupsFromMatches,
  getThirdPlaceTeams,
  rankThirdPlaces,
  extractTodayResults,
  extractUpcomingToday,
} from '../utils/data.js'

const REFRESH_INTERVAL = 60_000

export function useLiveData() {
  const [groups, setGroups]           = useState({})
  const [todayActivity, setToday]     = useState([])
  const [ranked, setRanked]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [lastUpdate, setLastUpdate]   = useState(null)
  const [error, setError]             = useState(null)
  const timerRef = useRef(null)

  const loadData = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true)
    setError(null)
    try {
      const data = await fetchWorldCupData()
      const matches = data.matches || []

      const computedGroups = computeGroupsFromMatches(matches)
      const thirds         = getThirdPlaceTeams(computedGroups)
      const rankedThirds   = rankThirdPlaces(thirds)

      const results  = extractTodayResults(matches)
      const upcoming = extractUpcomingToday(matches)

      setGroups(computedGroups)
      setRanked(rankedThirds)
      setToday([...results, ...upcoming])
      setLastUpdate(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    timerRef.current = setInterval(() => loadData(true), REFRESH_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [loadData])

  const refresh = useCallback(() => loadData(), [loadData])
  const source  = error ? 'error' : ranked.length > 0 ? 'live' : 'loading'

  return { groups, todayActivity, ranked, loading, lastUpdate, source, error, refresh }
}
