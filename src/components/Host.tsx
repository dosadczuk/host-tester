import Button from '@/components/common/Button'
import HostChartBar from '@/components/HostChartBar'
import HostChartLine from '@/components/HostChartLine'
import HostIntervals, { Interval } from '@/components/HostIntervals'
import HostName from '@/components/HostName'
import HostStatus from '@/components/HostStatus'
import HostTimeMeasurement from '@/components/HostTimeMeasurement'
import useHost from '@/hooks/useHost'
import usePing from '@/hooks/usePing'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faChartLine, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab } from '@headlessui/react'
import { FC, useEffect, useState } from 'react'

type HostProps = {
  host: string;
}

const intervals: Interval[] = [
  { value: 1000, title: '1 s' },
  { value: 5000, title: '5 s' },
  { value: 10000, title: '10 s' },
  { value: 60000, title: '1 min' },
  { value: 600000, title: '10 min' },
]

const Host: FC<HostProps> = ({ host }) => {
  const [interval, setInterval] = useState(intervals[2])

  const { ip, isChecking, isReachable } = useHost(host)
  const {
    isRequesting, startRequesting, stopRequesting,
    minimumTimes, minimum,
    averageTimes, average,
    maximumTimes, maximum,
    resetResponses,
    responsesCount, responsesWithErrorCount, responsesWithSuccessCount,
  } = usePing(host, interval.value)

  useEffect(
    () => {
      if (isReachable) {
        startRequesting()
      }
    },
    [isReachable, startRequesting],
  )

  useEffect(
    () => {
      if (isReachable) {
        stopRequesting()
        startRequesting()
      }
    },
    [interval], // tylko interval
  )

  return (
    <section className="p-4 px-6 bg-white text-gray-800 border border-gray-200 rounded-xl">
      <header className="flex justify-between items-center py-4">
        <h2 className="flex items-center gap-2">
          <HostStatus isChecking={isChecking} isReachable={isReachable}/>
          <HostName name={host} ip={ip}/>
        </h2>

        <h3 className="flex items-center gap-2">
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
          <article>
            <Tab.Group as="div" className="pb-4 py-4">
              <Tab.List as="div" className="pb-2 flex justify-between items-center gap-1">
                <div className="flex items-center gap-2">
                  <Button onClick={() => isRequesting ? stopRequesting() : startRequesting()}>
                    {isRequesting ? 'Zatrzymaj pomiar' : 'Rozpocznij pomiar'}
                  </Button>
                  <Button onClick={resetResponses}>
                    Resetuj wyniki
                  </Button>
                </div>
                <div className="flex justify-end items-center gap-1">
                  <HostIntervals
                    intervals={intervals}
                    interval={interval}
                    setInterval={setInterval}
                  />
                  <Tab>
                    {({ selected }) => <ChartButton icon={faChartBar} title="Wykres słupkowy" active={selected}/>}
                  </Tab>
                  <Tab>
                    {({ selected }) => <ChartButton icon={faChartLine} title="Wykres liniowy" active={selected}/>}
                  </Tab>
                </div>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <HostChartBar title="Średni czas odpowiedzi" values={averageTimes}/>
                </Tab.Panel>
                <Tab.Panel>
                  <HostChartLine title="Średni czas odpowiedzi" values={averageTimes}/>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </article>
        )
      }
    </section>
  )
}


type ChartButtonProps = {
  icon: IconDefinition;
  active: boolean;
  title?: string;
}

const ChartButton: FC<ChartButtonProps> = ({ icon, active, title }) => {
  return (
    <div className={`px-2 py-0.5 border ${active ? 'border-blue-500' : 'border-gray-200'} rounded`} title={title}>
      <FontAwesomeIcon icon={icon} className={active ? 'text-blue-600' : 'text-gray-300'}/>
    </div>
  )
}

export default Host
