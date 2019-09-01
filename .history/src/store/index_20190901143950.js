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
        .createUserWithEmailAndPassword(email, password, name, employeeID)
        .then(user => {
          alert('success');
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          if (user) {
            user.updateProfile({
              displayName: name,
              employeeID: employeeID
            }).then(function() {
              alert('profile updated');
              commit('setName', user.displayName);
              commit('setEmployeeID', user.employeeID);
              router.push('/');
            }, function(err) {
              alert(err.message);
              commit('setName', null);
              commit('setEmployeeID', null);
            });
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
    }
  }
});