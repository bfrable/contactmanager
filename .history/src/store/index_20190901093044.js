import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
  },
  mutations: {
    toggleDrawer (state) {
        console.log('test');
      state.drawer = !state.drawer
    }
  },
  getters: {

  },
  actions: {

  }
});