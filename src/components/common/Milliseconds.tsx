import { formatMilliseconds } from '@/utils/number.formatter'
import { FC } from 'react'

type MillisecondsProps = {
  value: number;
  precision?: number;
}

const Milliseconds: FC<MillisecondsProps> = ({ value, precision = 4 }) => {
  return <>{formatMilliseconds(value, precision)}</>
}

export default Milliseconds
