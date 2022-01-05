import { FC } from 'react'

type HostChartTitleProps = {
  value: string;
}

const HostChartTitle: FC<HostChartTitleProps> = ({ value }) => {
  return (
    <div className="flex justify-center items-center text-xl text-gray-600 font-medium">
      {value}
    </div>
  )
}

export default HostChartTitle
