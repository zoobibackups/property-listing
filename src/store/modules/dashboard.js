import { http } from '@/services/http-common'

const state = {
  stats: {},
}
const actions = {
  async GetDashboardStats ({ commit }, payload) {
    const stats = await http.get(`${process.env.VUE_APP_API}/stats`)

    commit(
      'GotDashboardStats',
      stats.data
        ? stats.data
        : {
            users_count: {
              new_customers_count: 0,
              new_professionals_count: 0,
              professionals_active_count: 0,
              professionals_pending_count: 0,
            },
            bookings_count: {
              pending_requests_count: 0,
              declined_requests_count: 0,
              active_requests_count: 0,
              deleted_requests_count: 0,
            },
          },
    )
  },
}
const mutations = {
  GotDashboardStats (state, payload) {
    state.stats = payload
  },
}
const getters = {
  DashboardStats (state) {
    return state.stats
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
