import { formatDecimal, formatMilliseconds } from '@/utils/number.formatter'
import { FC } from 'react'

export const Milliseconds: FC<{ value: number, precision?: number }> = ({ value, precision = 4 }) => {
  return (
    <>{formatMilliseconds(value, precision)}</>
  )
}

export const Decimal: FC<{ value: number, precision?: number }> = ({ value, precision = 4 }) => {
  return (
    <>{formatDecimal(value, precision)}</>
  )
}
