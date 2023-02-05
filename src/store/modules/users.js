import { http } from '@/services/http-common'
const state = {
  users: [],
  singleUser: {},
}
const actions = {
  async getSingleUserInfo ({ commit }, payload) {
    const response = await http.get(
      `${process.env.VUE_APP_API}/users/${payload}`,
    )
    commit('GotSingleUser', response.data ? response.data : {})
  },
  async getUsers ({ commit }, payload) {
    const response = await http.get(
      `${process.env.VUE_APP_API}/users/?type=${payload.type}${
        payload.status ? '&status=' + payload.status : ''
      }`,
    )
    commit('GotUsers', response.data ? response.data : [])
  },
  async createUser ({ commit }, payload) {
    const response = await http.post(
      `${process.env.VUE_APP_API}/users`,
      payload,
    )
    commit('userCreated', response.data ? response.data : [])
    return response
  },
  async blockUser ({ commit }, payload) {
    const response = await http.put(
      `${process.env.VUE_APP_API}/user/${payload}`,
      { status: 'blocked' },
    )
    // commit('userCreated', response.data ? response.data : [])
    return response
  },
}
const mutations = {
  GotSingleUser (state, payload) {
    state.singleUser = payload
  },
  userCreated (state, payload) {
    state.users.push(payload)
  },
  GotUsers (state, payload) {
    state.users = payload
  },
}
const getters = {
  singleUser (state) {
    return state.singleUser
  },
  allUsers (state) {
    return state.users
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
