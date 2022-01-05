import useSequencer from '@/hooks/useSequencer'
import useInterval from '@use-it/interval'
import axios from 'axios'
import { PingResponse } from 'ping'
import { useCallback, useMemo, useState } from 'react'
import { useMap } from 'usehooks-ts'

const usePing = (host: string, interval: number) => {
  // ---------------------------- REQ ----------------------------
  const [delay, setDelay] = useState<number | null>(null)

  const isRequesting = useMemo(() => delay != null, [delay])
  const toggleRequesting = () => {
    setDelay(delay == null ? interval : null)
  }

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
  type Response = {
    value: PingResponse | 'error';
    sentAt: Date;
  }

  const [_, nextResponseId] = useSequencer(1)
  const [responses, actions] = useMap<number, Response>()

  const newResponse = useCallback(
    (id: number, response: PingResponse | 'error') => {
      actions.set(id, { value: response, sentAt: new Date() })
    },
    [actions],
  )
  // ---------------------------- /RES ----------------------------

  return {
    isRequesting, toggleRequesting,
    responses,
  }
}

export default usePing
