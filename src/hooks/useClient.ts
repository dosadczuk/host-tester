import * as api from '@/services/api'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'

const useClient = (savedSessionIds: string[]) => {
  const [ sessionIds, setSessionIds ] = useState<string[]>(savedSessionIds)
  const { value: isCreating, setTrue: setCreating, setFalse: setCreated } = useBoolean(false)
  const { value: isRemoving, setTrue: setRemoving, setFalse: setRemoved } = useBoolean(false)

  /**
   * Create session for client.
   */
  const createSession = async (host: string): Promise<void> => {
    try {
      setCreating()
      const session = await api.createSession(host)
      setSessionIds(oldSessionIds => [ session, ...oldSessionIds ])
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
    isCreating, createSession,
    isRemoving, removeSession,
  }
}

export default useClient
