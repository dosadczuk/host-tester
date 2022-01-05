import usePing from '@/hooks/usePing'
import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Home: NextPage = () => {
  const [host] = useState('wp.pl')
  const { isRequesting, toggleRequesting, responses } = usePing(host, 3600)

  const averageTime = useMemo(
    () => {
      // @ts-ignore
      const averages: number[] = Array.from(responses.values())
        .map(({ value: response }) => {
          if (response === 'error') {
            return null
          }

          return Number(response.avg)
        })
        .filter(it => it != null)

      if (averages.length === 0) {
        return 0
      }

      const sum = averages.reduce((avg, value) => avg + value, 0)

      return (sum / averages.length).toFixed(4)
    },
    [responses],
  )

  const chart = useMemo(
    () => {
      return Array.from(responses.values())
        .map(({ value: response }, idx) => {
          if (response === 'error') {
            return null
          }

          return {
            name: idx,
            min: response.min,
            max: response.max,
            avg: response.avg,
          }
        })
        .filter(it => it != null)
    },
    [responses],
  )

  return (
    <section className="container mx-auto">
      <header className="pt-12">
        <h1 className="text-4xl font-black">
          {host}
        </h1>
        <h2 className="text-lg text-indigo-500 font-bold">
          {averageTime}ms
        </h2>
      </header>

      <article className="py-6">
        <header>
          <h2 className="text-xl text-gray-500 font-bold">
            Średnie czasy
          </h2>
        </header>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis label="ms"/>

            <Tooltip/>
            <Legend/>

            <Bar dataKey="avg" fill="#6366f1"/>
          </BarChart>
        </ResponsiveContainer>
      </article>

      <button type="button" className="px-2 py-1 border border-black" onClick={toggleRequesting}>
        {
          isRequesting
            ? <span>Zakończ odpytywanie</span>
            : <span>Zacznij odpytywanie</span>
        }
      </button>

      <div>
        Aktualnie odpytuje: {isRequesting ? 'tak' : 'nie'}
      </div>
    </section>
  )
}

export default Home
