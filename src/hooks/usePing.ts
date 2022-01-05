import useSequencer from '@/hooks/useSequencer'
import useInterval from '@use-it/interval'
import axios from 'axios'
import { PingResponse } from 'ping'
import { useCallback, useMemo, useState } from 'react'
import { useMap } from 'usehooks-ts'

export type Response = {
  value: PingResponse | 'error';
  sentAt: Date;
};

export type ResponseWithSuccess = Omit<Response, 'value'> & { value: PingResponse }
export type ResponseWithError = Omit<Response, 'value'> & { value: 'error' }

const usePing = (host: string, interval: number) => {
  // ---------------------------- REQ ----------------------------
  const [delay, setDelay] = useState<number | null>(null)

  const isRequesting = useMemo(() => delay != null, [delay])
  const startRequesting = useCallback(() => setDelay(interval), [interval])
  const stopRequesting = useCallback(() => setDelay(null), [])

  // Ping in given interval
  useInterval(
    async () => {
      const id = nextResponseId()

      try {
        const { data } = await axios.post<PingResponse>('/api/ping', { host })
        newResponse(id, data)
      } catch {
        newResponse(id, 'error')
      }
    },
    delay,
  )
  // ---------------------------- /REQ ----------------------------


  // ---------------------------- RES ----------------------------
  const [_, nextResponseId] = useSequencer(1)
  const [map, actions] = useMap<number, Response>()

  const newResponse = useCallback(
    (id: number, response: PingResponse | 'error') => {
      actions.set(id, { value: response, sentAt: new Date() })
    },
    [actions],
  )

  const responses = useMemo(() => Array.from(map.values()), [map])

  const responsesWithSuccess = useMemo(
    () => responses.filter(({ value }) => value !== 'error') as ResponseWithSuccess[],
    [responses],
  )

  const responsesWithError = useMemo(
    () => responses.filter(({ value }) => value == 'error') as ResponseWithError[],
    [responses],
  )

  const averageTimes = useMemo(() => responsesWithSuccess.map(({ value }) => Number(value.avg)), [responsesWithSuccess])
  const minimumTimes = useMemo(() => responsesWithSuccess.map(({ value }) => Number(value.min)), [responsesWithSuccess])
  const maximumTimes = useMemo(() => responsesWithSuccess.map(({ value }) => Number(value.max)), [responsesWithSuccess])

  const average = useMemo(() => averageTimes.reduce((avg, time) => avg + time, 0) / averageTimes.length || 0, [averageTimes])
  const minimum = useMemo(
    () => {
      const min = Math.min(...minimumTimes)
      return isFinite(min) ? min : 0
    },
    [minimumTimes],
  )
  const maximum = useMemo(
    () => {
      const max = Math.max(...maximumTimes)
      return isFinite(max) ? max : 0
    },
    [maximumTimes],
  )

  const responsesCount = useMemo(() => responses.length, [responses])
  const responsesWithSuccessCount = useMemo(() => responsesWithSuccess.length, [responsesWithSuccess])
  const responsesWithErrorCount = useMemo(() => responsesWithError.length, [responsesWithError])
  // ---------------------------- /RES ----------------------------

  return {
    isRequesting, startRequesting, stopRequesting,

    averageTimes, average,
    minimumTimes, minimum,
    maximumTimes, maximum,

    responsesCount, responsesWithSuccessCount, responsesWithErrorCount,
  }
}

export default usePing
