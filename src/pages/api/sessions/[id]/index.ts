import { Prisma } from '@/database/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import ping from 'ping'

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  switch (req.method) {
    case 'GET':
      return findSession(req, res)

    case 'POST':
      return pingSession(req, res)

    case 'DELETE':
      return removeSession(req, res)
  }

  res.status(405).send('Method not allowed')
}

const findSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const sessionId = req.query.id as string
  if (sessionId == null) {
    return res.status(400).send('Session ID not provided')
  }

  try {
    let session = await Prisma.instance.session.findUnique({ where: { id: sessionId } })
    if (session == null) {
      return res.status(404).send('Session not found')
    }

    const serverResponse = await ping.promise.probe(session.host)
    if (!serverResponse.alive) {
      return res.status(404).send('Host not reachable')
    }

    if (
      serverResponse.numeric_host != null &&
      serverResponse.numeric_host !== session.hostIp
    ) {
      session = await Prisma.instance.session
        .update({
          where: { id: session.id },
          data: {
            hostIp: serverResponse.numeric_host,
          },
        })
    }

    res.status(200).json(session)
  } catch {
    res.status(400).send('Error occurred')
  }
}

const pingSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const sessionId = req.query.id as string
  if (sessionId == null) {
    return res.status(400).send('Session ID not provided')
  }

  const { requestId } = req.body
  if (requestId == null) {
    return res.status(400).send('Request ID not provided')
  }

  try {
    const session = await Prisma.instance.session.findUnique({ where: { id: sessionId } })
    if (session == null) {
      return res.status(404).send('Session not found')
    }

    const serverResponse = await ping.promise.probe(session.host, { min_reply: 5 })
    if (!serverResponse.alive) {
      return res.status(404).send('Host not reachable')
    }

    const sessionPing = await Prisma.instance.sessionPing
      .create({
        data: {
          sessionId,
          requestId,
          alive: serverResponse.alive,
          min: serverResponse.min,
          avg: serverResponse.avg,
          max: serverResponse.max,
          stddev: serverResponse.stddev,
          packetLoss: serverResponse.packetLoss,
        },
      })

    res.status(200).json(sessionPing)
  } catch {
    res.status(400).send('Error occurred')
  }
}

const removeSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const sessionId = req.query.id as string
  if (sessionId == null) {
    return res.status(400).send('Session ID not provided')
  }

  try {
    await Prisma.instance.sessionPing.deleteMany({ where: { sessionId } })
    await Prisma.instance.session.delete({ where: { id: sessionId } })

    res.status(200).send('OK')
  } catch (e) {
    res.status(400).send('Error occurred')
  }
}

export default handle
