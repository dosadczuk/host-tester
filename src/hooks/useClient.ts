import useLocalStorage from '@/hooks/useLocalStorage'
import * as api from '@/services/api'
import { useEffect, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

const useClient = () => {
  const token = useLocalStorage('client-token', uuid())

  const [ sessionIds, setSessionIds ] = useState<string[]>([])
  const { value: isPreparing, setTrue: setPreparing, setFalse: setPrepared } = useBoolean(false)
  const { value: isCreating, setTrue: setCreating, setFalse: setCreated } = useBoolean(false)
  const { value: isRemoving, setTrue: setRemoving, setFalse: setRemoved } = useBoolean(false)

  /**
   * Set up sessions on component mount.
   */
  useEffect(() => { setUpSessions() }, [ token ])

  /**
   * Initialize client sessions.
   */
  const setUpSessions = async (): Promise<void> => {
    try {
      setPreparing()
      setSessionIds(await api.findSessionIds(token))
    } catch {
      // ignore
    } finally {
      setPrepared()
    }
  }

  /**
   * Create session for client.
   */
  const createSession = async (host: string): Promise<void> => {
    try {
      setCreating()
      const session = await api.createSession(token, host)
      setSessionIds(oldSessionIds => [ ...oldSessionIds, session ])
    } catch {
      // ignore
    } finally {
      setCreated()
    }
  }

  /**
   * Remove client session.
   */
  const removeSession = async (sessionId: string): Promise<void> => {
    try {
      setRemoving()
      await api.removeSession(sessionId)
      setSessionIds(oldSessionIds => oldSessionIds.filter(id => id !== sessionId))
    } catch {
      // ignore
    } finally {
      setRemoved()
    }
  }

  return {
    sessionIds,
    isPreparing,
    isCreating, createSession,
    isRemoving, removeSession,
  }
}

export default useClient
