import { DangerButton, PrimaryButton, SecondaryButton } from '@/components/common/Button'
import SessionChartButton from '@/components/SessionChartButton'
import SessionChartWithAverageTimes from '@/components/SessionChartWithAverageTimes'
import SessionHeading from '@/components/SessionHeading'
import SessionMeasurement from '@/components/SessionMeasurement'
import SessionPingInterval from '@/components/SessionPingInterval'
import SessionStatus from '@/components/SessionStatus'
import useClientSession from '@/hooks/useClientSession'
import useClientSessionReq from '@/hooks/useClientSessionReq'
import useClientSessionRes from '@/hooks/useClientSessionRes'
import { faChartBar, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronDown,
  faChevronUp,
  faPause,
  faPlay,
  faPrint,
  faSpinner,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Disclosure, Tab } from '@headlessui/react'
import Link from 'next/link'
import { ChangeEventHandler, FC } from 'react'
import { If, Then } from 'react-if'

type SessionProps = {
  id: string,

  onRemove: (sessionId: string) => void,
  onSelect: (sessionId: string) => void,
  onUnselect: (sessionId: string) => void,

  isRemoving: boolean
}

const Session: FC<SessionProps> = ({ id, onRemove, onSelect, onUnselect, isRemoving }) => {
  const { session, isLoading } = useClientSession(id)
  const {
    lastRequestId, addResponse, clearResponses,
    minimum,
    average, averageTimes,
    maximum,
    standardDeviations,
    timestamps,
  } = useClientSessionRes(session)
  const {
    isRequesting,
    startRequesting,
    pauseRequesting,
    resetRequesting,
  } = useClientSessionReq(lastRequestId + 1, session, addResponse)

  const handleSelection: ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    if (checked) { onSelect(id) } else { onUnselect(id) }
  }

  return (
    <section id={id} className="py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-xl">
      <Disclosure defaultOpen>
        <header className="flex justify-between items-center py-2">
          <h2 className="flex items-center gap-3 text-left">
            <label className="inline-flex items-center mx-3" title="Czy umieścić hosta w zestawieniu">
              <input type="checkbox" onChange={handleSelection}
                className="form-checkbox h-5 w-5 border border-gray-200 text-emerald-600 rounded" />
            </label>

            <SessionHeading session={session} />
            <SessionStatus isLoading={isLoading} />
          </h2>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 border-r border-r-gray-100 pr-3 mr-2">
              <SessionMeasurement
                name="min"
                time={minimum}
                title="Minimalny czas odpowiedzi"
                className="bg-emerald-100 text-emerald-700"
              />

              <SessionMeasurement
                name="avg"
                time={average}
                title="Średni czas odpowiedzi"
                className="bg-blue-100 text-blue-700"
              />

              <SessionMeasurement
                name="max"
                time={maximum}
                title="Maksymalny czas odpowiedzi"
                className="bg-rose-100 text-rose-700"
              />
            </div>

            <PrimaryButton
              title={isRequesting ? 'Zatrzymaj odpytywanie' : 'Rozpocznij odpytywanie'}
              onClick={() => isRequesting ? pauseRequesting() : startRequesting()}
            >
              <FontAwesomeIcon icon={isRequesting ? faPause : faPlay} size="sm" />
            </PrimaryButton>

            <PrimaryButton
              title="Wyczyść wyniki"
              onClick={clearResponses}
            >
              <FontAwesomeIcon icon={faSyncAlt} size="sm" />
            </PrimaryButton>

            <Link href={`print/${id}`} passHref>
              <a
                className={`px-3 py-0.5 text-orange-600 border border-orange-400 rounded transition-colors hover:bg-orange-600 hover:text-white hover:disabled:bg-white disabled:border-orange-200 focus:ring focus:ring-offset-2`}
                title="Drukuj wyniki"
                target="_blank"
              >
                <FontAwesomeIcon icon={faPrint} size="sm" />
              </a>
            </Link>

            <DangerButton
              title="Usuń hosta z listy"
              onClick={() => onRemove(id)}
              disabled={isRemoving}
            >
              {
                !isRemoving
                  ? <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                  : <FontAwesomeIcon icon={faSpinner} size="sm" className="fa-spin text-rose-400" />
              }
            </DangerButton>

            <Disclosure.Button as="div">
              {({ open }) => (
                <SecondaryButton className="ml-2">
                  {
                    open
                      ? <FontAwesomeIcon icon={faChevronUp} />
                      : <FontAwesomeIcon icon={faChevronDown} />
                  }
                </SecondaryButton>
              )}
            </Disclosure.Button>
          </div>
        </header>

        <If condition={!isLoading}>
          <Then>
            <Disclosure.Panel>
              <Tab.Group as="article" className="pb-2 pt-8">
                <Tab.List as="div" className="flex justify-end items-center gap-1">
                  <div>
                    <SessionPingInterval onChange={resetRequesting} />
                  </div>
                  <Tab as="button">
                    {({ selected }) => <SessionChartButton icon={faChartBar} active={selected} />}
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <SessionChartWithAverageTimes
                      sessionId={session?.id}
                      timestamps={timestamps}
                      averageTimes={averageTimes}
                      standardDeviations={standardDeviations}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Disclosure.Panel>
          </Then>
        </If>
      </Disclosure>
    </section>
  )
}

export default Session
