import HostChartTitle from '@/components/HostChartTitle'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type HostChartBarProps = {
  title: string;
  values: number[];
}

const HostChartBar: FC<HostChartBarProps> = ({ title, values }) => {
  const data = useMemo(
    () => values.map((value, idx) => ({ name: idx + 1, value })),
    [values],
  )

  return (
    <div>
      <HostChartTitle value={title}/>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 2"/>

          <YAxis unit="ms" width={42}/>

          <XAxis dataKey="name" height={42}>
            <Label position="insideBottom" className="text-md text-gray-400 font-medium">
              numer żądania
            </Label>
          </XAxis>

          <Tooltip/>

          <Bar dataKey="value" name="Wartość" fill="#3b82f6"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HostChartBar
