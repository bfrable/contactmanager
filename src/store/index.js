import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
    user: null,
    uid: null,
    isAuthenticated: false,
    name: null,
    employeeID: null,
    email: null,
    contacts: [],
    groups: [],
  },
  mutations: {
    TOGGLE_DRAWER (state) {
      state.drawer = !state.drawer
    },
    SET_USER (state, payload) {
      state.user = payload;
    },
    SET_IS_AUTHENTICATED (state, payload) {
      state.isAuthenticated = payload;
    },
    SET_NAME (state, payload) {
      state.name = payload;
    },
    SET_EMPLOYEE_ID (state, payload) {
      state.employeeID = payload;
    },
    SET_EMAIL (state, payload) {
      state.email = payload;
    },
    SET_GROUPS (state, payload) {
      state.groups.push(payload);
    },
    SET_UID (state, payload) {
      state.uid = payload;
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
          commit('SET_USER', user);
          commit('SET_EMAIL', user.user.email);
          commit('SET_UID', user.user.uid);
          commit('SET_IS_AUTHENTICATED', true);
        })
        .then(user => {
          user = firebase.auth().currentUser;

          if (user) {
            user.updateProfile({
                displayName: name,
              })
              .then(() => {
                commit('SET_NAME', user.displayName);
              })
              .then(() => {
                firebase.database().ref('users/' + user.uid).set({
                  employeeID: employeeID,
                });
              })
              .then(() => {
                firebase.database().ref(`/users/${user.uid}`).once('value').
                then(function (snapshot) {
                  commit('SET_EMPLOYEE_ID', snapshot.val().employeeID);
                  router.push('/');
                });
              })
              .catch((err) => {
                alert(err.message);
                commit('SET_NAME', null);
                commit('SET_EMPLOYEE_ID', null);
              })
          }
        })
        .catch((err) => {
          alert(err.message);
          commit('SET_USER', null);
          commit('SET_IS_AUTHENTICATED', false);
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
          commit('SET_USER', user);
          commit('SET_UID', user.user.uid);
          commit('SET_NAME', user.user.displayName);
          commit('SET_EMAIL', user.user.email);
          commit('SET_IS_AUTHENTICATED', true);
        })
        .then(() => {
          firebase.database().ref(`/users/${this.state.uid}/groups`).once('value')
          .then(function(snapshot) {                
            snapshot.forEach(function(group) {
              commit('SET_GROUPS', group.key);
            });
            router.push('/home');
          });
        })
        .catch((err) => {
          alert(err.message);
          commit('SET_USER', null);
          commit('SET_IS_AUTHENTICATED', false);
        });
    },
    // createContact({
    //   commit
    // }, {
    //   contactName,
    //   contactUID,
    //   contactPhone,
    //   contactEmail,
    //   contactGroups
    // }) {
    //   firebase.database().ref(`users/${user.uid}/contacts/${contactUID}`).set({
    //     contactName: contactName,
    //     contactEmail: contactEmail,
    //     contactPhone: contactPhone,
    //     contactGroups: contactGroups || []
    //   })
    //   .then(() => {
        
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //     commit('setUser', null);
    //     commit('setIsAuthenticated', false);
    //   });
    // },
    createGroup({
        commit
      }, {
        groupName
      }) {
        firebase.database().ref(`users/${this.state.uid}/groups`).child(groupName).set({
          groupName
        })
        .then(() => {
          commit('SET_GROUPS', groupName);
        })
        .catch((err) => {
          alert(err.message);
        });
      },
  }
});