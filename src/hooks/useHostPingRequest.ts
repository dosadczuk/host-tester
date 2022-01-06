import useInterval from '@use-it/interval'
import axios from 'axios'
import { PingResponse } from 'ping'
import { useCallback, useEffect, useMemo, useState } from 'react'

const useHostPingRequest = (host: string, onResponse: (requestId: number, response: PingResponse | null) => void) => {
  const [requestId, setRequestId] = useState(1)
  const [interval, setInterval] = useState<number | null>(null)
  const [delay, setDelay] = useState<number | null>(null)

  const isRequesting = useMemo(() => delay != null, [delay])

  const startRequesting = () => setDelay(interval)
  const pauseRequesting = () => setDelay(null)
  const resetRequesting = (newInterval: number) => setInterval(newInterval)

  useEffect(
    () => {
      pauseRequesting()
      startRequesting()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interval],
  )

  const makeRequest = useCallback(
    async () => {
      try {
        const { data } = await axios.post<PingResponse>('/api/ping', { host })

        onResponse(requestId, data)
      } catch {
        onResponse(requestId, null)
      } finally {
        setRequestId(requestId + 1)
      }
    },
    [host, onResponse, requestId],
  )

  // jak zmieni się interval, to od razu robimy żądanie, okresowym wywołaniem zajmuje się useInterval
  useEffect(
    () => {
      if (isRequesting) {
        makeRequest()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRequesting],
  )

  // ustawiamy regularne odpytywanie
  useInterval(makeRequest, delay)

  return {
    isRequesting,
    startRequesting,
    pauseRequesting,
    resetRequesting,
  }
}

export default useHostPingRequest
