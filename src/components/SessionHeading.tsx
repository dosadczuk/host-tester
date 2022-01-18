import { Caption, Heading2 } from '@/components/common/Typography'
import { Session } from '@/models'
import { Nullable } from '@/types'
import { FC } from 'react'
import { Else, If, Then } from 'react-if'

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
            <If condition={session.hostIp != null}>
              <Then>
                IP: {session.hostIp}
              </Then>
              <Else>
                IP: nieznany
              </Else>
            </If>
          </Caption>
        </div>
      )}
    </>
  )
}

export default SessionHeading
