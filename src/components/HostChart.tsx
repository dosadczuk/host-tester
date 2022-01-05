import HostChartBar from '@/components/HostChartBar'
import HostChartLine from '@/components/HostChartLine'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faChartLine, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab } from '@headlessui/react'
import { FC } from 'react'

type HostChartProps = {
  values: number[];
}

const HostChart: FC<HostChartProps> = ({ values }) => {
  return (
    <Tab.Group as="div" className="pt-8 pb-2">
      <Tab.List as="div" className="pb-2 flex justify-end items-center gap-1">
        <Tab>
          {({ selected }) => <ChartButton icon={faChartBar} title="Wykres słupkowy" active={selected}/>}
        </Tab>
        <Tab>
          {({ selected }) => <ChartButton icon={faChartLine} title="Wykres liniowy" active={selected}/>}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <HostChartBar values={values}/>
        </Tab.Panel>
        <Tab.Panel>
          <HostChartLine values={values}/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

type ChartButtonProps = {
  icon: IconDefinition;
  active: boolean;
  title?: string;
}

const ChartButton: FC<ChartButtonProps> = ({ icon, active, title }) => {
  return (
    <div className={`px-2 py-0.5 border ${active ? 'border-blue-500' : 'border-gray-200'} rounded`} title={title}>
      <FontAwesomeIcon icon={icon} className={active ? 'text-blue-600' : 'text-gray-300'}/>
    </div>
  )
}

export default HostChart
