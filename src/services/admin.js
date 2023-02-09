import { http } from './http-common'

export const getProperties = (payload) => {
  return http.get('/properties', { params: payload })
}
//deletePropertyApi
export const deletePropertyApi = (id) => {
  return http.delete(`/properties/${id}`)
}
// getPropertDetailApi(id)
export const getPropertDetailApi = (id) => {
  return http.get(`/properties/${id}`)
}

export const getPropertiesAsUser = (userID, payload) => {
  return http.get(`/properties/getByUserid/${userID}`, { params: payload })
}
