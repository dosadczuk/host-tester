import { Heading3 } from '@/components/common/Typography'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ErrorBar, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type SessionChartWithAverageTimesProps = {
  averageTimes: number[];
  standardDeviations: number[];
}

const SessionChartWithAverageTimes: FC<SessionChartWithAverageTimesProps> = ({ averageTimes, standardDeviations }) => {
  const data = useMemo(
    () => Array.from({ length: averageTimes.length }, (_, idx) => {
      const avg = averageTimes[idx]
      const stddev = standardDeviations[idx]

      return { name: idx + 1, avg, stddev }
    }),
    [ averageTimes, standardDeviations ],
  )

  return (
    <>
      <h3 className="pl-10">
        <Heading3>
          Średni czas odpowiedzi
        </Heading3>
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 2" />

          <YAxis unit="ms" stroke="#4b5563" width={42} />

          <XAxis stroke="#4b5563" height={48}>
            <Label position="insideBottom" className="text-gray-600 font-medium">
              numer żądania
            </Label>
          </XAxis>

          <Tooltip />

          <Bar dataKey="avg" name="Avg" fill="#3b82f6" stroke="#2563eb" strokeWidth={2} opacity={.8}>
            <ErrorBar dataKey="stddev" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default SessionChartWithAverageTimes
