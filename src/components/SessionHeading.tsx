import { Caption, Heading2 } from '@/components/common/Typography'
import { Session } from '@/models'
import { Nullable } from '@/types'
import { FC } from 'react'

type SessionHeadingProps = {
  session: Nullable<Session>
}

const SessionHeading: FC<SessionHeadingProps> = ({ session }) => {
  return (
    <>
      {session != null && (
        <div className="flex flex-col">
          <Heading2>{session.host}</Heading2>
          <Caption>
            {
              session.hostIp != null
                ? <>IP: {session.hostIp}</>
                : <>IP: nieznany</>
            }
          </Caption>
        </div>
      )}
    </>
  )
}

export default SessionHeading
