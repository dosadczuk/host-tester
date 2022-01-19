import Cookies from 'cookies'
import { IncomingMessage, ServerResponse } from 'http'
import { v4 as uuid } from 'uuid'

export const getClientToken = (request: IncomingMessage, response: ServerResponse): string => {
  const cookies = new Cookies(request, response)

  const savedToken = cookies.get('ClientToken')
  if (savedToken != null) {
    return savedToken
  }

  const newToken = uuid()
  cookies.set('ClientToken', newToken)
  
  return newToken
}
