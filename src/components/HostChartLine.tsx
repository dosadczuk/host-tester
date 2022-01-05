import { FC, useMemo } from 'react'
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type HostChartLineProps = {
  values: number[];
}

const HostChartLine: FC<HostChartLineProps> = ({ values }) => {
  const data = useMemo(
    () => values.map((value, idx) => ({ name: idx + 1, value })),
    [values],
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="2 2"/>

        <YAxis unit="ms"/>

        <XAxis dataKey="name">
          <Label position="insideBottomRight" className="text-md text-gray-400 font-medium">
            żądanie
          </Label>
        </XAxis>

        <Tooltip/>

        <Line dataKey="value" name="Wartość" fill="#3b82f6"/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HostChartLine
