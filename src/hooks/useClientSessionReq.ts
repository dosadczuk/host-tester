import { Session, SessionPing } from '@/models'
import * as api from '@/services/api'
import { Nullable } from '@/types'
import useInterval from '@use-it/interval'
import { useCallback, useEffect, useMemo, useState } from 'react'

const useClientSessionReq = (initRequestId: number, session: Nullable<Session>, onResponse: (requestId: number, response: Nullable<SessionPing>) => void) => {
  const [ requestId, setRequestId ] = useState(initRequestId)
  const [ externalInterval, setExternalInterval ] = useState<Nullable<number>>(null)
  const [ internalInterval, setInternalInterval ] = useState<Nullable<number>>(null)

  const isRequesting = useMemo(() => internalInterval != null, [ internalInterval ])

  const startRequesting = () => setInternalInterval(externalInterval)
  const pauseRequesting = () => setInternalInterval(null)
  const resetRequesting = (interval: number) => setExternalInterval(interval)

  useEffect(
    () => {
      setRequestId(initRequestId)
    },
    [ initRequestId ],
  )

  /**
   * Reset requesting interval if is external change.
   */
  useEffect(
    () => {
      pauseRequesting()
    },
    [ externalInterval ],
  )

  const pingSession = useCallback(
    async () => {
      if (session == null) {
        return // nothing to ping
      }

      const id = requestId
      setRequestId(requestId + 1)

      try {
        const ping = await api.pingSession(session.id, id)

        onResponse(id, ping)
      } catch {
        onResponse(id, null)
      }
    },
    [ session, requestId, onResponse ],
  )

  /**
   * Make ping if interval has changed.
   */
  useEffect(
    () => {
      if (isRequesting) pingSession()
    },
    [ isRequesting ],
  )

  /**
   * Set up interval to ping session.
   */
  useInterval(pingSession, internalInterval)

  return {
    isRequesting,
    startRequesting,
    pauseRequesting,
    resetRequesting,
  }
}

export default useClientSessionReq
