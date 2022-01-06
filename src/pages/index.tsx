import { Heading1 } from '@/components/common/Typography'
import Host from '@/components/Host'
import HostsForm from '@/components/HostsForm'
import useHostsForm from '@/hooks/useHostsForm'
import type { NextPage } from 'next'
import { Else, If, Then } from 'react-if'

const Home: NextPage = () => {
  const { hosts, host, hostError, handleHostChange, handleHostSubmit, removeHost } = useHostsForm()

  return (
    <div className="container mx-auto pt-12 pb-8">
      <header>
        <h1>
          <Heading1>
            Sprawdź czas odpowiedzi hosta
          </Heading1>
        </h1>

        <form onSubmit={handleHostSubmit}>
          <HostsForm
            value={host}
            error={hostError}
            onChange={handleHostChange}
          />
        </form>
      </header>
      <main className="pt-8 flex flex-col gap-4">
        <If condition={hosts.length > 0}>
          <Then>
            {hosts.map(host => (
              <Host key={host} value={host} onRemove={() => removeHost(host)}/>
            ))}
          </Then>
          <Else>
            <div className="text-6xl text-gray-300 font-black">
              Brak hostów
            </div>
          </Else>
        </If>
      </main>
    </div>
  )
}

export default Home
