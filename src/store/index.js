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
    drawerItems: [{
        icon: "contacts",
        text: "Contacts"
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Groups",
        model: true,
        children: [{
          icon: "add",
          text: "Create Group"
        }]
      }
    ]
  },
  mutations: {
    TOGGLE_DRAWER(state) {
      state.drawer = !state.drawer
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_IS_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },
    SET_NAME(state, payload) {
      state.name = payload;
    },
    SET_EMPLOYEE_ID(state, payload) {
      state.employeeID = payload;
    },
    SET_EMAIL(state, payload) {
      state.email = payload;
    },
    SET_GROUPS(state, payload) {
      state.groups.push(payload);
    },
    REMOVE_GROUP(state, payload) {
      const index = state.groups.indexOf(payload);
      if (index !== -1) state.groups.splice(index, 1);
    },
    SET_CONTACTS(state, payload) {
      state.contacts.push(payload)
    },
    SET_UID(state, payload) {
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
            .then(function (snapshot) {
              snapshot.forEach(function (group) {
                commit('SET_GROUPS', group.key);
              });
              router.push('/home');
            });
        })
        .then(() => {
          firebase.database().ref(`/users/${this.state.uid}/contacts`).once('value')
            .then(function (snapshot) {
              snapshot.forEach(function (contacts) {
                contacts.forEach(function(contact){
                  commit('SET_CONTACTS', {
                    contactName: contact.contactName,
                    contactEmail: contact.contactEmail,
                    contactPhone: contact.contactPhone,
                    contactUID: contact.contactUID
                  });
                })
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
    createContact({
      commit
    }, {
      contactName,
      contactUID,
      contactPhone,
      contactEmail
    }) {
      firebase.database().ref(`users/${this.state.uid}/contacts/`).child(contactUID).set({
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        contactUID: contactUID
      })
      .then(() => {
        commit('SET_CONTACTS', {
          contactName: contactName,
          contactEmail: contactEmail,
          contactPhone: contactPhone,
          contactUID: contactUID
        });
      })
      .then(() => {
        console.log(this.state.contacts);
      })
      .catch((err) => {
        alert(err.message);
      });
    },
    deleteGroup({
      commit
    }, {
      groupName
    }) {
      firebase.database().ref(`users/${this.state.uid}/groups`).child(groupName).remove()
        .then(() => {
          commit('REMOVE_GROUP', groupName);
        })
        .then(() => {
          this.state.drawerItems[1].children.splice(1);
          this.state.groups.forEach((groupName) => {
            this.state.drawerItems[1].children.push({
              icon: 'group',
              text: groupName,
              groupName: groupName
            });
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    },
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
        .then(() => {
          this.state.drawerItems[1].children.splice(1);
          this.state.groups.forEach((groupName) => {
            this.state.drawerItems[1].children.push({
              icon: 'group',
              text: groupName,
              groupName: groupName
            });
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  }
});