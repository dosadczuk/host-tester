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
  // ---------------------------- /RES ----------------------------

  return {
    isRequesting, startRequesting, stopRequesting,
    responses,
  }
}

export default usePing
