import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type HostChartButtonProps = {
  icon: any;
  active: boolean;
  title?: string;
}

const HostChartButton: FC<HostChartButtonProps> = ({ icon, active, title }) => {
  return (
    <div title={title} className={`px-2 py-0.5 ${active ? 'border-indigo-400' : 'border-gray-200'} border rounded`}>
      <FontAwesomeIcon icon={icon} size="sm" className={active ? 'text-indigo-600' : 'text-gray-300'}/>
    </div>
  )
}

export default HostChartButton
