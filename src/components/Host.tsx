import { DangerButton, PrimaryButton } from '@/components/common/Button'
import HostChartButton from '@/components/HostChartButton'
import HostChartWithAverageTimes from '@/components/HostChartWithAverageTimes'
import HostInterval from '@/components/HostInterval'
import HostName from '@/components/HostName'
import HostStatus from '@/components/HostStatus'
import HostTimeMeasurement from '@/components/HostTimeMeasurement'
import useHostCheck from '@/hooks/useHostCheck'
import useHostPingRequest from '@/hooks/useHostPingRequest'
import useHostPingResponses from '@/hooks/useHostPingResponses'
import { faChartBar, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPause, faPlay, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab } from '@headlessui/react'
import { FC } from 'react'
import { If, Then } from 'react-if'

type HostProps = {
  value: string;

  onRemove: () => void;
}

const Host: FC<HostProps> = ({ value, onRemove }) => {
  const { IP, isChecking, isReachable } = useHostCheck(value)
  const {
    addResponse, clearResponses,
    minimum, average, maximum,
    averageTimes,
  } = useHostPingResponses()
  const {
    isRequesting,
    startRequesting,
    pauseRequesting,
    resetRequesting,
  } = useHostPingRequest(value, addResponse)

  return (
    <section className="py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-xl">
      <header className="flex justify-between items-center py-2">
        <h2 className="flex items-center gap-3">
          <HostStatus isChecking={isChecking} isReachable={isReachable}/>
          <HostName name={value} ip={IP}/>
        </h2>

        <h3 className="flex items-center gap-1">
          <div className="flex items-center gap-1 border-r border-r-gray-100 pr-3 mr-2">
            <HostTimeMeasurement
              name="min"
              value={minimum}
              title="Minimalny czas odpowiedzi"
              className="bg-emerald-100 text-emerald-700"
            />

            <HostTimeMeasurement
              name="avg"
              value={average}
              title="Średni czas odpowiedzi"
              className="bg-blue-100 text-blue-700"
            />

            <HostTimeMeasurement
              name="max"
              value={maximum}
              title="Maksymalny czas odpowiedzi"
              className="bg-rose-100 text-rose-700"
            />
          </div>

          <If condition={isReachable}>
            <Then>
              <PrimaryButton
                title={isRequesting ? 'Zatrzymaj odpytywanie' : 'Rozpocznij odpytywanie'}
                onClick={() => isRequesting ? pauseRequesting() : startRequesting()}
              >
                <FontAwesomeIcon icon={isRequesting ? faPause : faPlay} size="sm"/>
              </PrimaryButton>

              <PrimaryButton
                title="Wyczyść wyniki odpytywania"
                onClick={clearResponses}
              >
                <FontAwesomeIcon icon={faSyncAlt} size="sm"/>
              </PrimaryButton>
            </Then>
          </If>

          <DangerButton title="Usuń hosta z listy" onClick={onRemove}>
            <FontAwesomeIcon icon={faTrashAlt} size="sm"/>
          </DangerButton>
        </h3>
      </header>

      <If condition={isReachable}>
        <Then>
          <Tab.Group as="article" className="pb-2 pt-8">
            <Tab.List as="div" className="flex justify-end items-center gap-1">
              <div>
                <HostInterval onChange={(interval) => resetRequesting(interval)}/>
              </div>
              <Tab as="button">
                {({ selected }) => <HostChartButton icon={faChartBar} active={selected}/>}
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <HostChartWithAverageTimes averageTimes={averageTimes}/>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Then>
      </If>
    </section>
  )
}

export default Host
