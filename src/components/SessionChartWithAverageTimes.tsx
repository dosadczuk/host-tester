import { Heading3 } from '@/components/common/Typography'
import { getRandomColor } from '@/utils/colors'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ErrorBar, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type SessionChartWithAverageTimesProps = {
  sessionId?: string,
  averageTimes: number[];
  standardDeviations: number[];
}

const SessionChartWithAverageTimes: FC<SessionChartWithAverageTimesProps> = (props) => {
  const { sessionId, averageTimes, standardDeviations } = props

  const data = useMemo(
    () => Array.from({ length: averageTimes.length }, (_, idx) => {
      const avg = averageTimes[idx]
      const stddev = standardDeviations[idx]

      return { name: idx + 1, avg, stddev }
    }),
    [ averageTimes, standardDeviations ],
  )

  const [ fillColor, strokeColor ] = useMemo(() => getRandomColor(sessionId), [ sessionId ])

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

          <XAxis dataKey="name" stroke="#4b5563" height={48}>
            <Label position="insideBottom" className="text-gray-600 font-medium">
              numer żądania
            </Label>
          </XAxis>

          <Tooltip />

          <Bar dataKey="avg" name="Avg" fill={fillColor} stroke={strokeColor} strokeWidth={2} opacity={.8}>
            <ErrorBar dataKey="stddev" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default SessionChartWithAverageTimes
