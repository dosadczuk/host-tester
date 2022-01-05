import axios from 'axios'
import { PingResponse } from 'ping'
import { useEffect, useState } from 'react'

export const useHost = (host: string) => {
  const [ip, setIP] = useState<string | undefined>('')
  const [isChecking, setIsChecking] = useState(true)
  const [isReachable, setIsReachable] = useState(false)

  useEffect(
    () => {
      const checkHostReachability = async () => {
        try {
          setIsChecking(true)

          const { data } = await axios.post<PingResponse>('/api/check', { host })

          setIP(data.numeric_host)
          setIsReachable(true)
        } catch {
          setIsReachable(false)
        } finally {
          setIsChecking(false)
        }
      }

      // noinspection JSIgnoredPromiseFromCall
      checkHostReachability()
    },
    [host],
  )

  return {
    ip,
    isChecking,
    isReachable,
  }
}

export default useHost
