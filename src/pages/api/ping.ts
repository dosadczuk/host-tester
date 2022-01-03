import { NextApiRequest, NextApiResponse } from 'next'
import ping, { PingResponse } from 'ping'

/**
 * Pingowanie podanego hosta.
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<PingResponse>,
) {
  const { host } = req.body
  if (host == null) {
    res.status(400)
  }

  const data = await ping.promise.probe(host, {
    extra: ['-n', '5'],
  })

  if (data.alive) {
    res.status(200).json(data) // OK
  } else {
    res.status(400) // Nieosiągalny
  }
}
