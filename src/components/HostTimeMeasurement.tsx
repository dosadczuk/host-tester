import Milliseconds from '@/components/common/Milliseconds'
import { FC } from 'react'

type HostTimeMeasurementProps = {
  name: string;
  value: number;
  title?: string;
  className?: string;
}

const HostTimeMeasurement: FC<HostTimeMeasurementProps> = ({ name, value, title, className }) => {
  return (
    <div className={`px-4 py-0.5 rounded ${className}`} title={title}>
      <span className="text-xs mr-2">{name}</span>
      <span className="font-medium">
        <Milliseconds value={value}/>
      </span>
    </div>
  )
}

export default HostTimeMeasurement
