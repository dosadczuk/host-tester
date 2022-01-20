import { Heading1 } from '@/components/common/Typography'
import Session from '@/components/Session'
import SessionForm from '@/components/SessionForm'
import { Prisma } from '@/database/prisma'
import useClient from '@/hooks/useClient'
import useSessionForm from '@/hooks/useSessionForm'
import { getClientToken } from '@/utils/cookies'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Else, If, Then } from 'react-if'

type HomePageProps = {
  savedSessionIds: string[]
}

const Home: NextPage<HomePageProps> = ({ savedSessionIds }) => {
  const { sessionIds, createSession, isCreating, removeSession, isRemoving } = useClient(savedSessionIds)
  const { host, error, handleChange, handleSubmit } = useSessionForm({ onSubmit: createSession })

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
      <main className="py-8 flex flex-col gap-4">
        <If condition={sessionIds.length > 0}>
          <Then>
            {sessionIds.map(id => <Session key={id} id={id} onRemove={removeSession} isRemoving={isRemoving} />)}
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
  const sessions = await Prisma.instance.session
    .findMany({
      where: {
        clientId: getClientToken(req, res),
      },
      select: { id: true },
    })

  return {
    props: {
      savedSessionIds: await sessions.map(({ id }) => id),
    },
  }
}

export default Home
