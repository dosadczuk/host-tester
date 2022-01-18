import { Session, SessionPing } from '@/models'
import axios, { AxiosRequestHeaders } from 'axios'

/**
 * Find client sessions.
 */
export const findSessionIds = async (token: string): Promise<string[]> => {
  return (await axios.get('/api/sessions', { headers: withToken(token) })).data
}
/**
 * Create session for client.
 */
export const createSession = async (token: string, host: string): Promise<string> => {
  return (await axios.post('/api/sessions', { host }, { headers: withToken(token) })).data
}

/**
 * Find client session.
 */
export const findSession = async (sessionId: string): Promise<Session> => {
  return (await axios.get(`/api/sessions/${sessionId}`)).data
}

/**
 * Ping session for client.
 */
export const pingSession = async (sessionId: string, requestId: number): Promise<SessionPing> => {
  return (await axios.post(`/api/sessions/${sessionId}`, { requestId })).data
}

/**
 * Remove client session.
 */
export const removeSession = async (sessionId: string): Promise<void> => {
  await axios.delete(`/api/sessions/${sessionId}`)
}

/**
 * Find session pings.
 */
export const findSessionPings = async (sessionId: string): Promise<SessionPing[]> => {
  return (await axios.get(`/api/sessions/${sessionId}/pings`)).data
}

const withToken = (token: string, headers: object = {}): AxiosRequestHeaders => {
  return Object.assign({ 'x-token': token }, headers)
}
