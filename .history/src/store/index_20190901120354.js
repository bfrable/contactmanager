import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
    user: null,
    isAuthenticated: false
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  getters: {

  },
  actions: {
    userJoin({
      commit
    }, {
      email,
      password
    }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          alert('success');
          commit('setUser', user);
          commit('setIsAuthenticated', true);
        })
        .catch((err) => {
          alert(err.message);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    }
  }
});