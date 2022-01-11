import axios from 'axios'
import { PingResponse } from 'ping'
import { useEffect, useState } from 'react'

const useHostCheck = (host: string) => {
  const [id, setId] = useState<string>('')
  const [ip, setIp] = useState<string | null>(null)

  const [isChecking, setChecking] = useState(true)
  const [isReachable, setReachable] = useState(false)

  // jak zmieni się host to aktualizujemy stan
  useEffect(
    () => {
      const checkHostReachability = async () => {
        try {
          setChecking(true)

          const response = await axios.post<{ id: string, data: PingResponse }>('/api/host/check', { host })
          const { id, data } = response.data

          setId(id)
          setIp(data.numeric_host ?? null)
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

  return { id, ip, isChecking, isReachable }
}

export default useHostCheck
