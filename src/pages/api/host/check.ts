import { NextApiRequest, NextApiResponse } from 'next'
import ping from 'ping'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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
    return
  }

  const data = await ping.promise.probe(host)
  if (data.alive) {
    const session = await prisma.session.create({
      data: {
        host,
        hostIp: data.numeric_host
      }
    })

    res.status(200).json({ id: session.id, data })
  } else {
    res.status(400).send('Nieosiągalny')
  }
}
