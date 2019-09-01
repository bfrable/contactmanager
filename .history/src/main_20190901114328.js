import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import firebase from 'firebase';
import {store} from './store';
import router from './router';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false

 var firebaseConfig = {
  apiKey: "AIzaSyAl_3ub0die2r-JhFR_RSLwPTiMAl8SO0U",
  authDomain: "contact-manager-5e848.firebaseapp.com",
  databaseURL: "https://contact-manager-5e848.firebaseio.com",
  projectId: "contact-manager-5e848",
  storageBucket: "",
  messagingSenderId: "863242654524",
  appId: "1:863242654524:web:5858270aed532595"
};

firebase.initializeApp(firebaseConfig);

Vue.use(Vuex);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
