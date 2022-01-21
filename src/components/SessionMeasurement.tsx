import { Milliseconds } from '@/components/common/Formatter'
import { FC } from 'react'

type SessionMeasurementProps = {
  name: string;
  time: number;
  title?: string;
  className?: string;
}

const SessionMeasurement: FC<SessionMeasurementProps> = ({ name, time, title, className }) => {
  return (
    <div className={`px-4 py-0.5 border border-transparent rounded ${className}`} title={title}>
      <span className="text-xs mr-2 uppercase">{name}</span>
      <span className="font-medium">
        <Milliseconds value={time} />
      </span>
    </div>
  )
}

export default SessionMeasurement
