import { Heading3 } from '@/components/common/Typography'
import { getRandomColor } from '@/utils/colors'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ErrorBar, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type SessionChartWithAverageTimesProps = {
  sessionId?: string,
  timestamps: number[],
  averageTimes: number[],
  standardDeviations: number[],

  withTooltip?: boolean,
  onAnimationEnd?: () => void,
}

const SessionChartWithAverageTimes: FC<SessionChartWithAverageTimesProps> = (props) => {
  const {
    sessionId,
    timestamps,
    averageTimes,
    standardDeviations,
    withTooltip = true,
    onAnimationEnd = () => void 0,
  } = props

  const data = useMemo(
    () => Array.from({ length: averageTimes.length }, (_, idx) => {
      const timestamp = timestamps[idx]
      const avg = averageTimes[idx]
      const stddev = standardDeviations[idx]

      return { name: timestamp, avg, stddev }
    }),
    [ timestamps, averageTimes, standardDeviations ],
  )

  const [ fillColor, strokeColor ] = useMemo(() => getRandomColor(sessionId), [ sessionId ])

  return (
    <>
      <h3 className="mb-2 pl-10">
        <Heading3>
          Średni czas odpowiedzi
        </Heading3>
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 2" />

          {withTooltip && <Tooltip />}

          <Bar
            dataKey="avg"
            name="Avg"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={2}
            opacity={.8}
            onAnimationEnd={onAnimationEnd}
          >
            <ErrorBar dataKey="stddev" />
          </Bar>

          <YAxis unit="ms" stroke="#4b5563" width={42} />

          <XAxis dataKey="name" stroke="#4b5563" height={60} angle={-75} fontSize={12} fontWeight={500}>
            <Label position="insideBottom" className="text-gray-600 font-medium">
              timestamp
            </Label>
          </XAxis>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default SessionChartWithAverageTimes
