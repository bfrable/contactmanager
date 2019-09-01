import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
    user: null,
    isAuthenticated: false
  },
  mutations: {
    toggleDrawer (state) {
      state.drawer = !state.drawer
    }
  },
  getters: {

  },
  actions: {

  }
});