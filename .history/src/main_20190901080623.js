import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    drawer: null
  },
  mutations: {
    toggleDrawer (state) {
      drawer = !drawer
    }
  },
  getters: {

  },
  actions: {

  }
})

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
