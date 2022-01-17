import { NextApiRequest, NextApiResponse } from 'next'
import ping, { PingResponse } from 'ping'
import { Prisma } from "@/database/prisma";

/**
 * Pingowanie podanego hosta.
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<PingResponse | string>,
) {
  const { sessionId, requestId } = req.body
  if (sessionId == null) {
    res.status(400).send('Brak informacji o hoście')
    return
  }

  if (requestId == null) {
    res.status(400).send('Brak informacji o numerze żądania')
    return
  }

  const session = await Prisma.instance.session.findUnique({ where: { id: sessionId } })
  if (session == null) {
    res.status(404).send('Nie znaleziono sesji')
    return
  }

  const data = await ping.promise.probe(session.host, {
    min_reply: 5
  })

  if (!data.alive) {
    res.status(400).send('Nieosiągalny')
    return
  }

  try {
    await Prisma.instance.sessionPing.create({
      data: {
        requestId,
        sessionId,
        alive: data.alive,
        min: data.min,
        max: data.max,
        avg: data.avg,
        stddev: data.stddev,
        packetLoss: data.packetLoss
      }
    })

    res.status(200).json(data)
  } catch {
    res.status(400).send('Błąd zapisywania do bazy')
  }
}
