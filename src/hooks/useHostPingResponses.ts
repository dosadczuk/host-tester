import { PingResponse } from 'ping'
import { useMemo } from 'react'
import { useMap } from 'usehooks-ts'

const useHostPingResponses = () => {
  const [registry, controller] = useMap<number, PingResponse | null>()

  const addResponse = (requestId: number, response: PingResponse | null) => {
    controller.set(requestId, response)
  }

  const responses = useMemo(() => Array.from(registry.values()), [registry])
  const responsesCount = useMemo(() => responses.length, [responses])

  const responsesSuccessful = useMemo(() => responses.filter(it => it != null) as PingResponse[], [responses])
  const responsesSuccessfulCount = useMemo(() => responsesSuccessful.length, [responsesSuccessful])

  const averageTimes = useMemo(() => responsesSuccessful.map(({ avg }) => Number(avg)), [responsesSuccessful])
  const minimumTimes = useMemo(() => responsesSuccessful.map(({ min }) => Number(min)), [responsesSuccessful])
  const maximumTimes = useMemo(() => responsesSuccessful.map(({ max }) => Number(max)), [responsesSuccessful])

  const standardDeviations = useMemo(() => responsesSuccessful.map(({ stddev }) => Number(stddev)), [responsesSuccessful])

  const average = useMemo(
    () => {
      const total = averageTimes.reduce((acc, avg) => acc + avg, 0)
      const count = averageTimes.length

      return (total / count) || 0
    },
    [averageTimes],
  )
  const minimum = useMemo(
    () => {
      const min = Math.min(...minimumTimes)
      return isFinite(min) ? min : 0
    },
    [minimumTimes],
  )
  const maximum = useMemo(
    () => {
      const max = Math.max(...maximumTimes)
      return isFinite(max) ? max : 0
    },
    [maximumTimes],
  )

  const clearResponses = () => controller.reset()

  return {
    addResponse,

    responses, responsesCount,
    responsesSuccessful, responsesSuccessfulCount,

    averageTimes, average,
    minimumTimes, minimum,
    maximumTimes, maximum,
    standardDeviations,

    clearResponses,
  }
}

export default useHostPingResponses
