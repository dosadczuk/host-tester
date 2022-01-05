import { FC } from 'react'

type HostNameProps = {
  name: string;
  ip?: string;
}

const HostName: FC<HostNameProps> = ({ name, ip }) => {
  return (
    <>
      <span className="text-2xl font-black uppercase">
        {name}
      </span>

      {
        ip && <span className="text-gray-400">({ip})</span>
      }
    </>
  )
}

export default HostName
