import { DangerButton, PrimaryButton, SecondaryButton } from '@/components/common/Button'
import Link from 'next/link'
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
import { faChevronDown, faChevronUp, faPause, faPlay, faSpinner, faSyncAlt, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Disclosure, Tab } from '@headlessui/react'
import { FC } from 'react'
import { If, Then } from 'react-if'

type SessionProps = {
  id: string,

  onRemove: (sessionId: string) => void,
  isRemoving: boolean
}

const Session: FC<SessionProps> = ({ id, onRemove, isRemoving }) => {
  const { session, isLoading } = useClientSession(id)
  const {
    nextRequestId, addResponse, clearResponses,
    minimum, minimumTimes,
    average, averageTimes,
    maximum, maximumTimes,
    standardDeviations,
  } = useClientSessionRes(session)
  const {
    isRequesting,
    startRequesting,
    pauseRequesting,
    resetRequesting,
  } = useClientSessionReq(nextRequestId, session, addResponse)

  return (
    <section id={id} className="py-2 px-4 bg-white text-gray-800 border border-gray-200 rounded-xl">
      <Disclosure defaultOpen>
        <header className="flex justify-between items-center py-2">
          <h2 className="flex items-center gap-3 text-left">
            <SessionStatus isLoading={isLoading} />
            <SessionHeading session={session} />
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
            <Link href={`print/${id}`} passHref>
              <PrimaryButton
                title="Drukuj"
              >
                <FontAwesomeIcon icon={faPrint} size="sm" color="green"/>
              </PrimaryButton>
            </Link>

            <PrimaryButton
              title={isRequesting ? 'Zatrzymaj odpytywanie' : 'Rozpocznij odpytywanie'}
              onClick={() => isRequesting ? pauseRequesting() : startRequesting()}
            >
              <FontAwesomeIcon icon={isRequesting ? faPause : faPlay} size="sm" />
            </PrimaryButton>

            <PrimaryButton
              title="Wyczyść wyniki odpytywania"
              onClick={clearResponses}
            >
              <FontAwesomeIcon icon={faSyncAlt} size="sm" />
            </PrimaryButton>

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
