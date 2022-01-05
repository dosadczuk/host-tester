import { PrimaryButton } from '@/components/common/Button'
import HostChart from '@/components/HostChart'
import HostName from '@/components/HostName'
import HostStatus from '@/components/HostStatus'
import HostTimeMeasurement from '@/components/HostTimeMeasurement'
import useHost from '@/hooks/useHost'
import usePing from '@/hooks/usePing'
import { FC, useEffect, useState } from 'react'

type HostProps = {
  host: string;
}

const Host: FC<HostProps> = ({ host }) => {
  const [interval, setInterval] = useState<number>(3600)

  const { ip, isChecking, isReachable } = useHost(host)
  const {
    isRequesting, startRequesting, stopRequesting,
    minimumTimes, minimum,
    averageTimes, average,
    maximumTimes, maximum,
    responsesCount, responsesWithErrorCount, responsesWithSuccessCount,
  } = usePing(host, interval)

  useEffect(
    () => {
      // if (isReachable) {
      //   startRequesting()
      // }
    },
    [isReachable, startRequesting],
  )

  return (
    <section className="py-2 px-4">
      <header className="flex justify-between items-center">
        <h2 className="flex items-center gap-2">
          <HostStatus isChecking={isChecking} isReachable={isReachable}/>
          <HostName name={host} ip={ip}/>
        </h2>

        <h3 className="flex items-center gap-2">
          <PrimaryButton onClick={() => isRequesting ? stopRequesting() : startRequesting()}>
            {isRequesting ? 'Zatrzymaj odpytywanie' : 'Rozpocznij odpytywanie'}
          </PrimaryButton>

          <HostTimeMeasurement
            name="MIN"
            value={minimum}
            title="Minimalny czas odpowiedzi"
            className="bg-emerald-100 text-emerald-700"
          />

          <HostTimeMeasurement
            name="AVG"
            value={average}
            title="Średni czas odpowiedzi"
            className="bg-blue-100 text-blue-700"
          />

          <HostTimeMeasurement
            name="MAX"
            value={maximum}
            title="Maksymalny czas odpowiedzi"
            className="bg-rose-100 text-rose-700"
          />
        </h3>
      </header>

      {
        isReachable && (
          <>
            <article className="py-8">
              <HostChart values={averageTimes}/>
            </article>
          </>
        )
      }
    </section>
  )
}

export default Host
