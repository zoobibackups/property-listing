import { http } from '@/services/http-common'

const state = {
  callRequests: {},
}
const actions = {
  async GetCallRequests ({ commit }, payload) {
    const callRequests = await http.get(`${process.env.VUE_APP_API}/stats`)

    commit('GotCallRequests', callRequests.data ? callRequests.data : [])
  },
}
const mutations = {
  GotCallRequests (state, payload) {
    state.callRequests = payload
  },
}
const getters = {
  AllCallRequest (state) {
    return state.callRequests
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
