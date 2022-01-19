import { Prisma } from '@/database/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import ping from 'ping'

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  switch (req.method) {
    case 'POST':
      return createSession(req, res)
  }

  res.status(405).send('Method not allowed')
}

const createSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const token = req.cookies['ClientToken']

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
