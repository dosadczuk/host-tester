import { Heading1 } from '@/components/common/Typography'
import Session from '@/components/Session'
import SessionForm from '@/components/SessionForm'
import { Prisma } from '@/database/prisma'
import useClient from '@/hooks/useClient'
import useSessionForm from '@/hooks/useSessionForm'
import useSessionSelections from '@/hooks/useSessionSelections'
import { getClientToken } from '@/utils/cookies'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Else, If, Then } from 'react-if'

type HomePageProps = {
  savedSessionIds: string[]
}

const Home: NextPage<HomePageProps> = ({ savedSessionIds }) => {
  const { sessionIds, createSession, isCreating, removeSession, isRemoving } = useClient(savedSessionIds)
  const { host, error, handleChange, handleSubmit } = useSessionForm({ onSubmit: createSession })
  const { selectSession, unselectSession, hasSelectedSessions, sessionSummaryUrl } = useSessionSelections()

  return (
    <>
      <Head>
        <title>host tester</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
      <main className="py-6 flex flex-col gap-2">
        <If condition={sessionIds.length > 0}>
          <Then>
            <div className="py-2">
              {
                hasSelectedSessions
                ? (
                    <Link href={sessionSummaryUrl} passHref>
                      <a target="_blank" className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-sm text-white font-medium focus:ring-4 rounded transition-colors">
                        Wygeneruj zestawienie
                      </a>
                    </Link>
                  )
                  : (
                    <span className="py-2 px-4 bg-emerald-200 text-sm text-white font-medium rounded">
                      Wygeneruj zestawienie
                    </span>
                  )
              }
            </div>
            <div className="flex flex-col gap-4">
              {sessionIds.map(id => (
                <Session key={id} id={id}
                  onRemove={removeSession}
                  onSelect={selectSession}
                  onUnselect={unselectSession}
                  isRemoving={isRemoving}
                />
              ))}
            </div>
          </Then>
          <Else>
            <div className="text-6xl text-gray-300 font-black">
              Brak hostów
            </div>
          </Else>
        </If>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req, res }) => {
  const sessions = await Prisma.session
    .findMany({
      where: {
        clientId: getClientToken(req, res),
      },
      select: { id: true },
      orderBy: { id: 'desc' },
    })

  return {
    props: {
      savedSessionIds: await sessions.map(({ id }) => id),
    },
  }
}

export default Home
