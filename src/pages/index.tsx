import { Heading1 } from '@/components/common/Typography'
import Session from '@/components/Session'
import SessionForm from '@/components/SessionForm'
import useClient from '@/hooks/useClient'
import useSessionForm from '@/hooks/useSessionForm'
import type { NextPage } from 'next'
import { Else, If, Then } from 'react-if'

const Home: NextPage = () => {
  const { sessionIds, isPreparing, createSession, isCreating, removeSession, isRemoving } = useClient()
  const { host, error, handleChange, handleSubmit } = useSessionForm(createSession)

  return (
    <>
      <header>
        <h1>
          <Heading1>
            Sprawdź czas odpowiedzi hosta
          </Heading1>
        </h1>

        <SessionForm
          value={host}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isCreating}
        />
      </header>
      <main className="pt-8 flex flex-col gap-4">
        <If condition={!isPreparing}>
          <Then>
            <If condition={sessionIds.length > 0}>
              <Then>
                {sessionIds.map(id => (
                  <Session key={id} id={id} onRemove={removeSession} isRemoving={isRemoving} />),
                )}
              </Then>
              <Else>
                <div className="text-6xl text-gray-300 font-black">
                  Brak hostów
                </div>
              </Else>
            </If>
          </Then>
        </If>
      </main>
    </>
  )
}

export default Home
