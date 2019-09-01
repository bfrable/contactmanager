import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    toggleDrawer (state) {
        state.drawer = !state.drawer
    }
  }
});