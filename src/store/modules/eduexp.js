import { http } from '@/services/http-common'

const state = {
  classRequests: {},
}
const actions = {
  async createEducation ({ commit }, payload) {
     await http.post(
      `${process.env.VUE_APP_API}/education`,
      payload,
    )
  },
  async createExperience ({ commit }, payload) {
    await http.post(
      `${process.env.VUE_APP_API}/experience`,
      payload,
    )
  },
}
const mutations = {}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters,
}
