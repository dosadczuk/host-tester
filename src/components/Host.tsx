import Milliseconds from '@/components/common/Milliseconds'
import HostBarChart from '@/components/HostBarChart'
import HostLineChart from '@/components/HostLineChart'
import useHost from '@/hooks/useHost'
import usePing from '@/hooks/usePing'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faChartLine, faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab } from '@headlessui/react'
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
          {
            isChecking
              ? <StatusChecking/>
              : isReachable ? <StatusReachable/> : <StatusNotReachable/>
          }

          <span className="text-2xl font-black uppercase">
            {host}
          </span>

          {
            ip && (
              <span className="text-gray-400">
                ({ip})
              </span>
            )
          }
        </h2>

        <h3 className="flex items-center gap-2">
          <button
            onClick={() => isRequesting ? stopRequesting() : startRequesting()}
            className="px-4 py-0.5 bg-indigo-600 text-sm text-white text-medium rounded hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-offset-2">
            {isRequesting ? 'Zatrzymaj odpytywanie' : 'Rozpocznij odpytywanie'}
          </button>

          <div className="px-4 py-0.5 bg-emerald-100 text-emerald-700 rounded" title="Minimalny czas odpowiedzi">
            <span className="text-xs mr-2">MIN</span>
            <span className="font-medium">
              <Milliseconds value={minimum}/>
            </span>
          </div>

          <div className="px-4 py-0.5 bg-blue-100 text-blue-700 rounded" title="Średni czas odpowiedzi">
            <span className="text-xs mr-2">AVG</span>
            <span className="font-medium">
              <Milliseconds value={average}/>
            </span>
          </div>

          <div className="px-4 py-0.5 bg-rose-100 text-rose-700 rounded" title="Maksymalny czas odpowiedzi">
            <span className="text-xs mr-2">MAX</span>
            <span className="font-medium">
              <Milliseconds value={maximum}/>
            </span>
          </div>
        </h3>
      </header>

      {
        isReachable && (
          <>
            <article className="py-8">
              <Tab.Group>
                <Tab.List as="div" className="pb-2 flex justify-end items-center gap-1">
                  <Tab>
                    {({ selected }) => (
                      <button
                        className={`px-2 py-0.5 border ${selected ? 'border-blue-500' : 'border-gray-200'} rounded`}
                        title="Wykres słupkowy"
                      >
                        <FontAwesomeIcon icon={faChartBar} className={selected ? 'text-blue-600' : 'text-gray-300'}/>
                      </button>
                    )}
                  </Tab>
                  <Tab>
                    {({ selected }) => (
                      <button
                        className={`px-2 py-0.5 border ${selected ? 'border-blue-500' : 'border-gray-200'} rounded`}
                        title="Wykres liniowy"
                      >
                        <FontAwesomeIcon icon={faChartLine} className={selected ? 'text-blue-600' : 'text-gray-300'}/>
                      </button>
                    )}
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <HostBarChart values={averageTimes}/>
                  </Tab.Panel>
                  <Tab.Panel>
                    <HostLineChart values={averageTimes}/>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </article>
          </>
        )
      }
    </section>
  )
}

const StatusChecking: FC = () => {
  return (
    <span className="px-2" title="Sprawdzanie dostępności hosta">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin text-blue-500 align-middle"/>
    </span>
  )
}

const StatusReachable: FC = () => {
  return (
    <span className="px-2" title="Host osiągalny">
      <FontAwesomeIcon icon={faCheck} className="text-green-500 align-middle"/>
    </span>
  )
}

const StatusNotReachable: FC = () => {
  return (
    <span className="px-2" title="Host nieosiągalny">
      <FontAwesomeIcon icon={faTimes} className="text-rose-500 align-middle"/>
    </span>
  )
}

export default Host
