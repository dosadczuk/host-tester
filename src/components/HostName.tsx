import { Caption, Heading2 } from '@/components/common/Typography'
import { FC } from 'react'

type HostNameProps = {
  name: string;
  ip: string | null;
}

const HostName: FC<HostNameProps> = ({ name, ip }) => {
  return (
    <div className="flex flex-col">
      <Heading2>{name}</Heading2>
      {ip && <Caption>{ip}</Caption>}
    </div>
  )
}

export default HostName
