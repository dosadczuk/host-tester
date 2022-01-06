import { Heading3 } from '@/components/common/Typography'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type HostChartWithAverageTimesProps = {
  averageTimes: number[];
}

const HostChartWithAverageTimes: FC<HostChartWithAverageTimesProps> = ({ averageTimes }) => {
  const data = useMemo(
    () => averageTimes.map((value, idx) => ({ name: idx + 1, value })),
    [averageTimes],
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
          <CartesianGrid strokeDasharray="2 2"/>

          <YAxis unit="ms" stroke="#4b5563" width={42}/>

          <XAxis stroke="#4b5563" height={48}>
            <Label position="insideBottom" className="text-gray-600 font-medium">
              numer żądania
            </Label>
          </XAxis>

          <Tooltip/>

          <Bar dataKey="value" name="Avg" fill="#3b82f6" stroke="#2563eb" strokeWidth={3} opacity={.8}/>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default HostChartWithAverageTimes
