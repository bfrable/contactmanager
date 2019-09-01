import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: null,
  },
  mutations: {
    toggleDrawer (state) {
      this.state.drawer = !this.state.drawer
    }
  },
  getters: {

  },
  actions: {

  }
});