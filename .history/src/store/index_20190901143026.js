import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
    user: null,
    isAuthenticated: false,
    name: null,
    employeeID: null,
    email: null
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
    },
    setName(state, payload) {

    },
    setEmployeeID(state, payload) {

    },
    setEmail(state, payload) {

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
          router.push('/');
        })
        .catch((err) => {
          alert(err.message);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userLogin({
      commit
    }, {
      email,
      password
    }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/');
        })
        .catch((err) => {
          alert(err.message);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    updateProfile({
      commit
    }, {
      email,
      name,
      employeeID
    }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/');
        })
        .catch((err) => {
          alert(err.message);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
  }
});