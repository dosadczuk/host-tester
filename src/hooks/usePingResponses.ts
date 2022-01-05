import { Response, ResponseWithError, ResponseWithSuccess } from '@/hooks/usePing'
import { useMemo } from 'react'

const usePingResponses = (responses: Response[]) => {
  const responsesWithSuccess = useMemo(
    () => responses.filter(({ value }) => value !== 'error') as ResponseWithSuccess[],
    [responses],
  )

  const responsesWithError = useMemo(
    () => responses.filter(({ value }) => value == 'error') as ResponseWithError[],
    [responses],
  )

  const averageTimes = useMemo(() => responsesWithSuccess.map(({ value }) => Number(value.avg)), [responsesWithSuccess])
  const minimumTimes = useMemo(() => responsesWithSuccess.map(({ value }) => Number(value.min)), [responsesWithSuccess])
  const maximumTimes = useMemo(() => responsesWithSuccess.map(({ value }) => Number(value.max)), [responsesWithSuccess])

  const average = useMemo(() => averageTimes.reduce((avg, time) => avg + time, 0) / averageTimes.length || 0, [averageTimes])
  const minimum = useMemo(() => Math.max(Math.min(...minimumTimes), 0), [minimumTimes])
  const maximum = useMemo(() => Math.max(Math.max(...maximumTimes), 0), [maximumTimes])

  const responsesCount = useMemo(() => responses.length, [responses])
  const responsesWithSuccessCount = useMemo(() => responsesWithSuccess.length, [responsesWithSuccess])
  const responsesWithErrorCount = useMemo(() => responsesWithError.length, [responsesWithError])

  return {
    averageTimes, average,
    minimumTimes, minimum,
    maximumTimes, maximum,

    responsesCount, responsesWithSuccessCount, responsesWithErrorCount,
  }
}

export default usePingResponses
