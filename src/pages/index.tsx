import Host from '@/components/Host'
import type { NextPage } from 'next'
import { useMemo, useState } from 'react'

const Home: NextPage = () => {
  const [hosts] = useState(['wp.pl'])
  const hasHosts = useMemo(() => hosts.length > 0, [hosts])

  return (
    <main className="container mx-auto pt-12">
      {
        hasHosts
          ? hosts.map(host => <Host key={host} host={host}/>)
          : <div>Brak hostów</div>
      }
    </main>
  )
}

export default Home
