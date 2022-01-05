import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type HostBarChartProps = {
  values: number[];
}

const HostBarChart: FC<HostBarChartProps> = ({ values }) => {
  const data = useMemo(
    () => values.map((value, idx) => ({ name: idx + 1, value })),
    [values],
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="2 2"/>

        <YAxis unit="ms"/>

        <XAxis dataKey="name">
          <Label position="insideBottomRight" className="text-md text-gray-400 font-medium">
            żądanie
          </Label>
        </XAxis>

        <Tooltip/>

        <Bar dataKey="value" name="Wartość" fill="#3b82f6"/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HostBarChart
