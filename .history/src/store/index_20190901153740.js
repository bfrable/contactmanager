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
      state.name = payload;
    },
    setEmployeeID(state, payload) {
      state.employeeID = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    }
  },
  getters: {

  },
  actions: {
    userJoin({
      commit
    }, {
      email,
      password,
      name,
      employeeID,
    }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          alert('success');
          commit('setUser', user);
          commit('setEmail', user.user.email);
          commit('setIsAuthenticated', true);
        })
        .then(user => {
          user = firebase.auth().currentUser;

          if (user) {
            user.updateProfile({
              displayName: name,
            })
            .then(() => {
              alert('profile updated' + user.displayName);
              commit('setName', user.displayName);
              router.push('/');
            })
            .then(() => {
              firebase.database().ref('users/' + user.uid).set({
                employeeID: employeeID,
              });              
            })
            .catch((err) => {
              alert(err.message);
              commit('setName', null);
            })
          }
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
  }
});