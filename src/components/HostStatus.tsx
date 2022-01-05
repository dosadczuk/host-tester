import { faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type HostStatusProps = {
  isChecking: boolean;
  isReachable: boolean;
}

const HostStatus: FC<HostStatusProps> = ({ isChecking, isReachable }) => {
  if (isChecking) {
    return <Checking/>
  }

  return isReachable ? <Reachable/> : <Unreachable/>
}

const Checking: FC = () => {
  return (
    <span className="px-2" title="Sprawdzanie dostępności hosta">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin text-blue-500 align-middle"/>
    </span>
  )
}

const Reachable: FC = () => {
  return (
    <span className="px-2" title="Host osiągalny">
      <FontAwesomeIcon icon={faCheck} className="text-green-500 align-middle"/>
    </span>
  )
}

const Unreachable: FC = () => {
  return (
    <span className="px-2" title="Host nieosiągalny">
      <FontAwesomeIcon icon={faTimes} className="text-rose-500 align-middle"/>
    </span>
  )
}

export default HostStatus
