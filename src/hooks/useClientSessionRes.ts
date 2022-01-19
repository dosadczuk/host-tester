import { Session, SessionPing } from '@/models'
import * as api from '@/services/api'
import { Nullable } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMap } from 'usehooks-ts'

const useClientSessionRes = (session: Nullable<Session>) => {
  const [ registry, controller ] = useMap<number, Nullable<SessionPing>>()
  const [ lastRequestId, setLastRequestId ] = useState(0)

  useEffect(() => { setUpRegistry() }, [ session ])

  const setUpRegistry = useCallback(
    async (): Promise<void> => {
      if (session == null) return

      const pings = await api.findSessionPings(session.id)
      for (const ping of pings) {
        addResponse(ping.requestId, ping)
      }
    },
    [ session ],
  )

  // TODO: Czyścić w bazie
  const clearResponses = useCallback(
    async () => {
      if (session == null) return

      await api.clearSessionPings(session.id)

      controller.reset()
    },
    [ session ],
  )

  const addResponse = (requestId: number, response: Nullable<SessionPing>) => {
    controller.set(requestId, response)
    setLastRequestId(requestId)
  }

  const nextRequestId = useMemo(() => lastRequestId + 1, [ lastRequestId ])

  const responses = useMemo(() => Array.from(registry.entries()), [ registry ])
  const responsesCount = useMemo(() => responses.length, [ responses ])

  const responsesWithSuccess = useMemo(() => responses.filter(([ _, response ]) => response != null), [ responses ]) as [ number, SessionPing ][]
  const responsesWithSuccessCount = useMemo(() => responsesWithSuccess.length, [ responsesWithSuccess ])

  const responsesWithError = useMemo(() => responses.filter(([ _, response ]) => response != null), [ responses ]) as [ number, null ][]
  const responsesWithErrorCount = useMemo(() => responsesWithError.length, [ responsesWithError ])

  const minimumTimes = useMemo(() => responsesWithSuccess.map(([ _, { min } ]) => Number(min)), [ responsesWithSuccess ])
  const averageTimes = useMemo(() => responsesWithSuccess.map(([ _, { avg } ]) => Number(avg)), [ responsesWithSuccess ])
  const maximumTimes = useMemo(() => responsesWithSuccess.map(([ _, { max } ]) => Number(max)), [ responsesWithSuccess ])

  const standardDeviations = useMemo(() => responsesWithSuccess.map(([ _, { stddev } ]) => Number(stddev)), [ responsesWithSuccess ])

  const average = useMemo(
    () => {
      const total = averageTimes.reduce((acc, avg) => acc + avg, 0)
      const count = averageTimes.length

      return (total / count) || 0
    },
    [ averageTimes ],
  )
  const minimum = useMemo(
    () => {
      const min = Math.min(...minimumTimes)
      return isFinite(min) ? min : 0
    },
    [ minimumTimes ],
  )
  const maximum = useMemo(
    () => {
      const max = Math.max(...maximumTimes)
      return isFinite(max) ? max : 0
    },
    [ maximumTimes ],
  )

  return {
    nextRequestId,
    addResponse, clearResponses,

    responses, responsesCount,
    responsesWithSuccess, responsesWithSuccessCount,
    responsesWithError, responsesWithErrorCount,

    averageTimes, average,
    minimumTimes, minimum,
    maximumTimes, maximum,
    standardDeviations,
  }
}

export default useClientSessionRes
