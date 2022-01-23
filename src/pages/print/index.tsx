import { Heading2 } from '@/components/common/Typography'
import { Prisma } from '@/database/prisma'
import { Session } from '@/models'
import { Measurement } from '@/types'
import { getRandomColor } from '@/utils/colors'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type PrintSummaryProps = {
  summary: Array<{
    session: Session,
    results: {
      timestamps: number[],
      averageTimes: Measurement[],
    }
  }>
}

const PrintSummary: NextPage<PrintSummaryProps> = ({ summary }) => {
  const [ datas, setDatas ] = useState<Record<string, unknown>[]>([])
  const [ hosts, setHosts ] = useState<Record<string, string>[]>([])

  useEffect(
    () => {
      for (const { session: { id, host }, results: { timestamps, averageTimes } } of summary) {
        for (let idx = 0; idx < timestamps.length; idx++) {
          setDatas(v => [ ...v, {
            name: timestamps[idx],
            [host]: averageTimes[idx],
          } ])
        }

        setHosts(v => [ ...v, { id, host } ])
      }

      // @ts-ignore
      setDatas(v => v.sort((a, b) => a.name - b.name))
    },
    [ summary ],
  )

  return (
    <>
      <Head>
        <title>Zestawienie wyników odpytywania</title>
      </Head>
      <section className="py-2 px-4 mx-auto text-gray-800">
        <header>
          <h1>
            <Heading2>Zestawienie średnich czasów odpowiedzi: {hosts.map(it => it.host).join(', ')}</Heading2>
          </h1>
        </header>

        <article className="pb-2 pt-8">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={datas}>
              <CartesianGrid strokeDasharray="2 2" />

              <Tooltip />
              <Legend />

              {hosts.map(({ id, host }) => {
                const [ fill, stroke ] = getRandomColor(id)

                return (
                  <Bar key={id}
                    dataKey={host}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                    opacity={.8}
                  />
                )
              })}

              <YAxis unit="ms" stroke="#4b5563" width={42} />

              <XAxis dataKey="name" stroke="#4b5563" height={60} angle={-75} fontSize={12} fontWeight={500}>
                <Label position="insideBottom" className="text-gray-600 font-medium">
                  timestamp
                </Label>
              </XAxis>
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let sessionIds = context.query?.ids ?? []
  if (typeof sessionIds === 'string') {
    sessionIds = [ sessionIds ]
  }

  const summary = []
  for (const sessionId of sessionIds) {
    const session = await Prisma.session.findUnique({ where: { id: sessionId } })
    if (session == null) {
      continue
    }

    const sessionPings = await Prisma.sessionPing.findMany({ where: { sessionId, avg: { not: null } } })

    const averageTimes = sessionPings.map(it => Number(it.avg))
    const timestamps = sessionPings.map(it => it.timestamp.getTime())

    summary.push({
      session,
      results: {
        timestamps,
        averageTimes,
      },
    })
  }

  return {
    props: {
      summary,
    },
    notFound: summary.length === 0,
  }
}

export default PrintSummary
