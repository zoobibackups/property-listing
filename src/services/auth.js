import { http } from './http-common'

export const login = (payload) => {
  return http.post('/accounts/authenticate', payload)
}
