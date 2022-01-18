export type Session = {
  id: string,
  host: string,
  hostIp: number
}

export type SessionPing = {
  id: string,
  requestId: number,
  alive: boolean,
  min?: string,
  avg?: string,
  max?: string,
  stddev?: string,
  packetLoss?: string
}
