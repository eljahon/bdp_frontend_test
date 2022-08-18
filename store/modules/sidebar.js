/* eslint-disable no-console */
// import Vue from 'vue'
export default {
  state: {
    sidebar: [],
  },
  getters: {
    sidebar: (state) => state.sidebar,
  },
  mutations: {
    SET_SIDEBAR(state, payload) {
      state.sidebar = payload
    },
    CHANGE_SIDEBAR(state, payload) {
      state.sidebar = payload
    },
  },
  actions: {
    setSidebar({ commit }, payload) {
      commit('SET_SIDEBAR', payload)
    },
    changeSidebar({ commit }, data) {
      commit('CHANGE_SIDEBAR', data)
    },
  },
}
