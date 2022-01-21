// https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address?answertab=votes#tab-top
import { Nullable } from '@/types'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

const Valid952HostnameRegex = /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/

const useSessionForm = ({ onSubmit }: { onSubmit: (session: string) => Promise<boolean> }) => {
  const [ host, setHost ] = useState<string>('')
  const [ error, setError ] = useState<Nullable<string>>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHost(event.target.value)
    setError(null)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (host.length === 0) {
      return setError('Wartość nie może być pusta')
    }

    if (!host.match(Valid952HostnameRegex)) {
      return setError('Wartość nie jest prawidłową nazwą hosta')
    }

    if (error != null) {
      return // formularz zawiera błędy
    }

    const isSuccess = await onSubmit(host)
    if (!isSuccess) {
      setError('Nie udało się nawiązać połączenia z podanym hostem')
    }

    setHost('')
  }

  return { host, error, handleChange, handleSubmit }
}

export default useSessionForm
