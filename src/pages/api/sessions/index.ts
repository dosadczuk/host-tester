import { Prisma } from '@/database/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import ping from 'ping'

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  switch (req.method) {
    case 'GET':
      return findSessionIds(req, res)

    case 'POST':
      return createSession(req, res)
  }

  res.status(405).send('Method not allowed')
}

const findSessionIds = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const token = req.headers['x-token'] as string
  if (token == null) {
    return res.status(400).send('Parameter token not provided')
  }

  try {
    const sessions = await Prisma.instance.session
      .findMany({
        where: { clientId: token },
        select: { id: true },
      })

    const sessionIds = await sessions.map(({ id }) => id)

    res.status(200).json(sessionIds)
  } catch {
    res.status(400).send('Error occurred')
  }
}

const createSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const token = req.headers['x-token'] as string
  if (token == null) {
    return res.status(400).send('Parameter token not provided')
  }

  const { host } = req.body
  if (host == null) {
    return res.status(400).send('Parameter host not provided')
  }

  try {
    const client = await Prisma.instance.client
      .upsert({
        where: { id: token },
        create: { id: token },
        update: {},
      })

    const serverResponse = await ping.promise.probe(host)
    if (!serverResponse.alive) {
      return res.status(404).send('Host not reachable')
    }

    const session = await Prisma.instance.session.create({
      data: {
        clientId: client.id,
        host: serverResponse.host,
        hostIp: serverResponse.numeric_host ?? null,
      },
    })

    res.status(200).json(session.id)
  } catch {
    res.status(400).send('Error occurred')
  }
}

export default handle
