import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getter from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: window.localStorage.getItem('access_token'),
  },
  mutations,
  actions
})