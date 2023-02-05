import { http } from '@/services/http-common'

const state = {
  inviteCodes: [],
}
const actions = {
  async fetchInitialData ({ commit }, payload) {
    const response = await http.get(
      `${process.env.VUE_APP_API}/invite_code${
        payload.status ? '&status=' + payload.status : ''
      }`,
    )
    commit('GotResponse', {
      data: response.data ? response.data : [],
    })
  },
  async createInviteCode ({ commit }, payload) {
    const response = await http.post(
      `${process.env.VUE_APP_API}/invite_code`,
      payload,
    )
    commit('GotResponse', {
      data: response.data ? response.data : [],
    })
  },
}
const mutations = {
  GotResponse (state, payload) {
    state.inviteCodes = payload.data
  },
}
const getters = {
  AllInviteCodes (state) {
    return state.inviteCodes
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
