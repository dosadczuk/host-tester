import { NextApiRequest, NextApiResponse } from 'next'
import ping from 'ping'

/**
 * Sprawdzenie, czy można połączyć się z hostem.
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { host } = req.body
  if (host == null) {
    res.status(400).send('Brak informacji o hoście')
  }

  const data = await ping.promise.probe(host)
  if (data.alive) {
    res.status(200).json(data)
  } else {
    res.status(400).send('Nieosiągalny')
  }
}
