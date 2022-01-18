import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { Else, If, Then } from 'react-if'

type SessionStatusProps = {
  isLoading: boolean
}

const SessionStatus: FC<SessionStatusProps> = ({ isLoading }) => {
  return (
    <If condition={isLoading}>
      <Then>
        <span className="px-2" title="Sprawdzanie dostępności hosta">
          <FontAwesomeIcon icon={faSpinner} className="fa-spin text-blue-500 align-middle" />
        </span>
      </Then>
      <Else>
        <span className="px-2" title="Sprawdzanie dostępności hosta">
          <FontAwesomeIcon icon={faCheck} className="text-emerald-400 align-middle" />
        </span>
      </Else>
    </If>
  )
}

export default SessionStatus
