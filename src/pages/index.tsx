import Host from '@/components/Host'
import type { NextPage } from 'next'
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react'

const Home: NextPage = () => {
  const [host, setHost] = useState('')

  const [hosts, setHosts] = useState<string[]>([])
  const hasHosts = useMemo(() => hosts.length > 0, [hosts])

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault()

      setHosts(values => [...values, host])
      setHost('')
    },
    [host],
  )

  const handleHost = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setHost(event.target.value)
    },
    [],
  )

  return (
    <div className="container mx-auto pt-12">
      <header>
        <h1 className="text-4xl font-black">
          Zmierz czas odpowiedzi hosta
        </h1>
        <form className="py-4 flex items-center gap-1" onSubmit={handleSubmit}>
          <input
            type="text"
            value={host}
            onChange={handleHost}
            className="w-full border border-gray-200 rounded placeholder-gray-400 focus:outline-none"
            placeholder="np. wp.pl"
          />
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded">
            Sprawdź
          </button>
        </form>
      </header>
      <main className="pt-8">
        {
          hasHosts
            ? hosts.map(host => <Host key={host} host={host}/>)
            : (
              <div className="text-6xl text-gray-300 font-black">
                Brak hostów
              </div>
            )
        }
      </main>
    </div>
  )
}

export default Home
