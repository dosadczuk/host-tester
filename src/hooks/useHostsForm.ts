import { ChangeEventHandler, FormEventHandler, useState } from 'react'

// https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address?answertab=votes#tab-top
const Valid952HostnameRegex = /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/

const useHostsForm = () => {
  const [hosts, setHosts] = useState<string[]>([])

  const [host, setHost] = useState('')
  const [hostError, setHostError] = useState<string | null>(null)

  const removeHost = async (host: string) => {
    setHosts(values => values.filter(it => it !== host))
  }

  const handleHostChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHost(event.target.value)
    setHostError(null)
  }

  const handleHostSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (host.length === 0) {
      return setHostError('Wartość nie może być pusta')
    }

    if (!host.match(Valid952HostnameRegex)) {
      return setHostError('Wartość nie jest prawidłową nazwą hosta')
    }

    if (hostError != null) {
      return // formularz zawiera błędy
    }

    setHosts(oldHosts => [...oldHosts, host])
    setHost('')
  }

  return {
    hosts, host, hostError,
    removeHost,
    handleHostChange,
    handleHostSubmit,
  }
}

export default useHostsForm
