import axios from 'axios'
import type { NextPage } from 'next'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [host, setHost] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHostReachable, setIsHostReachable] = useState(false)
  const [response, setResponse] = useState({})

  const handleSubmit = useCallback<FormEventHandler>(
    async (event) => {
      event.preventDefault()

      if (host.length === 0) {
        return console.error('Wartość jest wymagana')
      }

      setIsSubmitted(true)

      const { status } = await axios.post('/api/check', { host })
      if (status === 200) {
        setIsHostReachable(true)
      } else {
        setIsHostReachable(false)
      }
    },
    [host],
  )

  const pingHost = useCallback(
    async () => {
      const { data } = await axios.post('/api/ping', { host })

      setResponse(data)
    },
    [host],
  )

  useEffect(
    () => {
      if (!isHostReachable) {
        return
      }

      pingHost()
    },
    [isHostReachable, pingHost],
  )

  return (
    <div className="container mx-auto py-4 px-8 bg-white">
      <header className="w-full mx-auto py-16 z-20">
        <h1>
          <div className="text-4xl text-black font-black">
            Sprawdź czas odpowiedzi hosta
          </div>
          <div className="text-2xl text-indigo-500 font-bold">
            oraz monitoruj jego stan
          </div>
        </h1>

        <form className="flex gap-1 py-4" onSubmit={handleSubmit}>
          <input type="text" onChange={({ target: { value } }) => { setHost(value) }}
                 className="w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-gray-400"
                 placeholder="np. wp.pl lub 192.168.0.1"
          />

          <button type="submit"
                  className="px-6 bg-indigo-100 text-indigo-700 font-bold hover:bg-indigo-200 focus:ring focus:ring-indigo-500 rounded-md">
            Sprawdź
          </button>
        </form>
      </header>

      <main>
        <section>
          {isSubmitted && (
            <article className="py-2 px-4 shadow rounded">
              <header>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col py-2">
                  <span className="text-sm text-gray-400 font-medium leading-tight">
                    Nazwa hosta
                  </span>
                    <span className="text-2xl text-black font-bold leading-tight">
                    {host}
                  </span>
                  </div>

                  {
                    isHostReachable
                      ? (
                        <div className="flex justify-start items-center">
                        <span className="px-4 py-1 bg-green-100 text-sm text-green-700 font-medium rounded-md">
                          Dostępny
                        </span>
                        </div>
                      )
                      : (
                        <div className="flex justify-start items-center">
                        <span className="px-4 py-1 bg-red-100 text-sm text-red-700 font-medium rounded-md">
                          Niedostępny
                        </span>
                        </div>
                      )
                  }
                </div>
              </header>

              <div>
                {response && JSON.stringify(response, null, 4)}
              </div>
            </article>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
