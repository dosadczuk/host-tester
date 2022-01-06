import axios from 'axios'
import { PingResponse } from 'ping'
import { useEffect, useState } from 'react'

const useHostCheck = (host: string) => {
  const [IP, setIP] = useState<string | null>(null)

  const [isChecking, setChecking] = useState(true)
  const [isReachable, setReachable] = useState(false)

  // jak zmieni się host to aktualizujemy stan
  useEffect(
    () => {
      const checkHostReachability = async () => {
        try {
          setChecking(true)

          const response = await axios.post<PingResponse>('/api/check', { host })
          const { numeric_host = null } = response.data

          setIP(numeric_host)
          setReachable(true)
        } catch {
          setReachable(false)
        } finally {
          setChecking(false)
        }
      }

      // noinspection JSIgnoredPromiseFromCall
      checkHostReachability()
    },
    [host],
  )

  return { IP, isChecking, isReachable }
}

export default useHostCheck
