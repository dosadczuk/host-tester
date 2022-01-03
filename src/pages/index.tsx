import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [host, setHost] = useState<string>('')

  useEffect(
    () => {
      console.log({ host })
    },
    [host],
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

        <form className="flex gap-1 py-4">
          <input type="url" onChange={({ target: { value } }) => { setHost(value) }}
                 className="w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-gray-400"
                 placeholder="np. wp.pl lub 192.168.0.1"
          />

          <button type="submit"
                  className="px-6 bg-indigo-100 text-indigo-700 font-bold hover:bg-indigo-200 focus:ring focus:ring-indigo-500 rounded-md">
            Sprawdź
          </button>
        </form>
      </header>
    </div>
  )
}

export default Home
