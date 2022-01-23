import { SessionPing } from '@/models'

// hooks.d
export type PingRequestId = number
export type PingResponseSuccess = SessionPing
export type PingResponseError = null
export type Measurement = number

// common
export type Nullable<T> = T | null
