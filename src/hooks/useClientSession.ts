import { Session } from '@/models'
import { findSession } from '@/services/api'
import { Nullable } from '@/types'
import { useEffect, useState } from 'react'
import { useBoolean } from 'usehooks-ts'

const useClientSession = (sessionId: string) => {
  const [ session, setSession ] = useState<Nullable<Session>>(null)
  const { value: isLoading, setTrue: setLoading, setFalse: setLoaded } = useBoolean(false)

  /**
   * Set up session on component mount.
   */
  useEffect(() => { setUpSession() }, [])

  /**
   * Initialize session.
   */
  const setUpSession = async (): Promise<void> => {
    try {
      setLoading()
      setSession(await findSession(sessionId))
    } catch {
      // ignore
    } finally {
      setLoaded()
    }
  }

  return { session, isLoading }
}

export default useClientSession
