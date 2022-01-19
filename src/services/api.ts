import { Session, SessionPing } from '@/models'
import axios from 'axios'

/**
 * Create session for client.
 */
export const createSession = async (host: string): Promise<string> => {
  return (await axios.post('/api/sessions', { host })).data
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

/**
 * Delete all session pings.
 */
export const clearSessionPings = async (sessionId: string): Promise<void> => {
  await axios.delete(`/api/sessions/${sessionId}/pings`)
}
