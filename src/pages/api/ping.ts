import { NextApiRequest, NextApiResponse } from 'next'
import ping, { PingResponse } from 'ping'

/**
 * Pingowanie podanego hosta.
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<PingResponse | string>,
) {
  const { host } = req.body
  if (host == null) {
    res.status(400).send('Brak informacji o hoście')
  }

  const data = await ping.promise.probe(host, {
    extra: ['-n', '5'],
  })

  if (data.alive) {
    res.status(200).json(data)
  } else {
    res.status(400).send('Nieosiągalny')
  }
}
