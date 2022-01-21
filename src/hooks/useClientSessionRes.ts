import { Session, SessionPing } from '@/models'
import * as api from '@/services/api'
import { Nullable } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMap } from 'usehooks-ts'

export type SessionResult = {
  lastRequestId: number,
  addResponse: (requestId: number, response: Nullable<SessionPing>) => void,
  clearResponses: () => void,

  responses: [ number, Nullable<SessionPing> ][],
  responsesCount: number,
  responsesWithSuccess: [ number, SessionPing ][],
  responsesWithSuccessCount: number,
  responsesWithError: [ number, null ][],
  responsesWithErrorCount: number,

  averageTimes: number[],
  average: number,
  minimumTimes: number[],
  minimum: number,
  maximumTimes: number[],
  maximum: number,
  standardDeviations: number[],
  packetLosses: number[],
}

const useClientSessionRes = (session: Nullable<Session>): SessionResult => {
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

      const lastPing = pings[pings.length - 1]
      if (lastPing != null) {
        setLastRequestId(lastPing.requestId)
      }
    },
    [ session ],
  )

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
  }

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
  const packetLosses = useMemo(() => responsesWithSuccess.map(([ _, { packetLoss } ]) => Number(packetLoss)), [ responsesWithSuccess ])

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
    lastRequestId,
    addResponse, clearResponses,

    responses, responsesCount,
    responsesWithSuccess, responsesWithSuccessCount,
    responsesWithError, responsesWithErrorCount,

    averageTimes, average,
    minimumTimes, minimum,
    maximumTimes, maximum,
    standardDeviations, packetLosses,
  }
}

export default useClientSessionRes
