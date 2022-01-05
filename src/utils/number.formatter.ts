export const formatMilliseconds = (value: number, precision: number): string => {
  return formatNumber(value, {
    style: 'unit',
    unit: 'millisecond',
    unitDisplay: 'short',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })
}

const formatNumber = (value: number, options: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat('pl', options).format(value)
}
