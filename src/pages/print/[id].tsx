import { Heading3 } from '@/components/common/Typography'
import SessionChartWithAverageTimes from '@/components/SessionChartWithAverageTimes'
import SessionHeading from '@/components/SessionHeading'
import SessionMeasurement from '@/components/SessionMeasurement'
import SessionTable from '@/components/SessionTable'
import { Prisma } from '@/database/prisma'
import useClientSessionRes from '@/hooks/useClientSessionRes'
import { Session } from '@/models'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type PrintProps = {
  session: Session
}

const Print: NextPage<PrintProps> = ({ session }) => {
  const router = useRouter()
  const sessionResponse = useClientSessionRes(session)

  const handlePrint = () => {
    window.print()
  }

  return (
    <section className="w-[900px] py-2 px-4 mx-auto text-gray-800">
      <header className="flex justify-between items-center py-2">
        <h2 className="flex items-center gap-3 text-left">
          <SessionHeading session={session} />
        </h2>
        <div className="flex items-center gap-1">
          <SessionMeasurement
            name="min"
            time={sessionResponse.minimum}
            title="Minimalny czas odpowiedzi"
            className="bg-emerald-100 text-emerald-700"
          />
          <SessionMeasurement
            name="avg"
            time={sessionResponse.average}
            title="Średni czas odpowiedzi"
            className="bg-blue-100 text-blue-700"
          />
          <SessionMeasurement
            name="max"
            time={sessionResponse.maximum}
            title="Maksymalny czas odpowiedzi"
            className="bg-rose-100 text-rose-700"
          />
        </div>
      </header>

      <article className="pb-2 pt-8">
        <SessionChartWithAverageTimes
          sessionId={session?.id}
          averageTimes={sessionResponse.averageTimes}
          standardDeviations={sessionResponse.standardDeviations}
          withTooltip={false}
          onAnimationEnd={handlePrint}
        />

        <div className="flex flex-col mt-10">
          <div>
            <h2>
              <Heading3>
                Podsumowanie
              </Heading3>
            </h2>
          </div>
          <SessionTable result={sessionResponse} />
        </div>
      </article>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let session = null

  if (context?.params?.id != null) {
    session = await Prisma.session.findUnique({
      where: {
        id: context.params.id as string,
      },
    })
  }

  return {
    props: {
      session,
    },
    notFound: session == null,
  }
}

export default Print
