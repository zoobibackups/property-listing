import axios from 'axios'
// import app from '../main'

const instanceOptions = {
  baseURL: 'https://api.propelinspections.com/inventory',
  headers: {},
}
const http = axios.create(instanceOptions)

http.interceptors.request.use(function (config) {
  // app.$Progress.start()
  config.headers["Authorization"] = "Bearer " + localStorage.getItem('token')
  return config
})

http.interceptors.response.use(response => {
  // app.$Progress.finish()
  return response
})

export { http }
