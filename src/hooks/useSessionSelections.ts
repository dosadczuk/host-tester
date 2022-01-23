import { useMemo, useState } from 'react'

const useSessionSelections = () => {
  const [ selectedSessionIds, setSelectedSessionIds ] = useState<string[]>([])

  const selectSession = (sessionId: string) => {
    setSelectedSessionIds(oldSelectedSessionIds => [ ...oldSelectedSessionIds, sessionId ].sort())
  }

  const unselectSession = (sessionId: string) => {
    setSelectedSessionIds(oldSelectedSessionIds => oldSelectedSessionIds.filter(it => it !== sessionId))
  }

  const hasSelectedSessions = useMemo(() => selectedSessionIds.length > 0, [ selectedSessionIds ])

  const sessionSummaryUrl = useMemo(
    () => {
      const params = new URLSearchParams()
      for (const sessionId of selectedSessionIds) {
        params.append('ids', sessionId)
      }

      return '/print/?' + params
    },
    [ selectedSessionIds ],
  )

  return {
    selectSession, unselectSession,
    hasSelectedSessions,
    sessionSummaryUrl,
  }
}

export default useSessionSelections
