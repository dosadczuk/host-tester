import Milliseconds from '@/components/common/Milliseconds'
import HostBarChart from '@/components/HostBarChart'
import useHost from '@/hooks/useHost'
import usePing from '@/hooks/usePing'
import usePingResponses from '@/hooks/usePingResponses'
import { faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState } from 'react'

type HostProps = {
  host: string;
}

const Host: FC<HostProps> = ({ host }) => {
  const [interval, setInterval] = useState<number>(3600)

  const { ip, isChecking, isReachable } = useHost(host)
  const { isRequesting, startRequesting, stopRequesting, responses } = usePing(host, interval)
  const {
    minimumTimes,
    averageTimes,
    maximumTimes,

    minimum,
    average,
    maximum,
  } = usePingResponses(responses)

  useEffect(
    () => {
      if (isReachable) {
        startRequesting()
      }
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
              <HostBarChart values={averageTimes}/>
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
