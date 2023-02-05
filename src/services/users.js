import { http } from './http-common'

export const getUsers = (payload) => {
  return http.get('/accounts', { params: payload })
}
export const enableUserApi = (id) => {
  return http.get(`/accounts/approve/${id}`)
}
export const disableUserApi = (id) => {
  return http.get(`/accounts/reject/${id}`)
}
export const createUser = (payload) => {
  return http.post('/accounts', payload)
}
export const updateUser = (id, payload) => {
  return http.put(`/accounts/${id}`, payload)
}
export const deleteUserApi = (id) => {
  return http.delete(`/accounts/${id}`)
}