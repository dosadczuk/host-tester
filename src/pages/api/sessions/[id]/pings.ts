import { Prisma } from '@/database/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  switch (req.method) {
    case 'GET':
      return findSessionPings(req, res)
  }

  res.status(405).send('Method not allowed')
}

const findSessionPings = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const sessionId = req.query.id as string
  if (sessionId == null) {
    return res.status(400).send('Session ID not provided')
  }

  try {
    const sessionPings = await Prisma.instance.sessionPing.findMany({ where: { sessionId } })

    res.status(200).json(sessionPings)
  } catch {
    res.status(400).send('Error occurred')
  }
}

export default handle
