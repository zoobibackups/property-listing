import { http } from '@/services/http-common'

const state = {
  bookings: [],
}
const actions = {
  async getAllBookings ({ commit }) {
    const callRequests = await http.get(
      `${process.env.VUE_APP_API}/admin-bookings`,
    )
    console.log(callRequests.data.message)
    commit('setInitialBookings', callRequests.data.message)
  },
}
const mutations = {
  setInitialBookings (state, payload) {
    state.bookings = payload
  },
}
const getters = {
  Bookings (state) {
    return state.bookings
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
