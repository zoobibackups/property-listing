import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import users from './modules/users'
import Dashboard from './modules/dashboard'
import InviteCodes from './modules/inviteCodes'
import EDUEXP from './modules/eduexp'
import Bookings from './modules/bookings'
Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'))

const parseJwt = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export default new Vuex.Store({
  state: {
    loggedIn: !!user,
    user: user || {},
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'sidebar-2.32103624.jpg',
    drawer: null,

  },
  mutations: {
    loginSuccess(state, user) {
      state.loggedIn = true
      state.user = user
    },
    logoutSuccess(state) {
      state.loggedIn = false
      state.user = {}
    },
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },

  },
  getters: {
    loggedIn: state => {
      return state.loggedIn
    },
    currentUser: state => {
      return state.user
    },
  },
  actions: {
    loginUser({ commit }, payload) {
      console.log('payload', payload)
      const token = parseJwt(payload.jwtToken)
      const user = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: payload.role,
      }
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', payload.jwtToken)
      commit('loginSuccess', user)
      router.push('/')
    },
    logoutUser({ commit }) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      router.push('/')
      commit('logoutSuccess', user)
    },
  },
  modules: {
    users,
    Dashboard,
    InviteCodes,
    EDUEXP,
    Bookings,
  },
})
