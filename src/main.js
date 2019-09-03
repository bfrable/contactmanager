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
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('SET_USER', user);
          this.$store.commit('SET_UID', user.uid);
          this.$store.commit('SET_NAME', user.displayName);
          this.$store.commit('SET_EMAIL', user.email);
          this.$store.commit('SET_IS_AUTHENTICATED', true);

          firebase.database().ref(`/users/${user.uid}/groups`).once('value')
          .then((snapshot) => {
            snapshot.forEach((group) => {
              this.$store.commit('SET_GROUPS', group.key);
            });
          })
          .then(() => {
            this.$store.state.groups.forEach((groupName) => {
              this.$store.state.drawerItems[1].children.push({
                icon: 'group',
                text: groupName
              });
            });
          });
        } else {
            router.push('/');
        }
    });
  },
}).$mount('#app')
