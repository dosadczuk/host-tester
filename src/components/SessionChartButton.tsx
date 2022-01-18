import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type SessionChartButtonProps = {
  icon: any;
  active: boolean;
  title?: string;
}

const SessionChartButton: FC<SessionChartButtonProps> = ({ icon, title, active }) => {
  return (
    <div title={title} className={`px-2 py-0.5 ${active ? 'border-indigo-400' : 'border-gray-200'} border rounded`}>
      <FontAwesomeIcon icon={icon} size="sm" className={active ? 'text-indigo-600' : 'text-gray-300'} />
    </div>
  )
}

export default SessionChartButton
