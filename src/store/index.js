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
    REMOVE_CONTACT(state, payload) {
      console.log(payload);
      state.contacts.filter(contact => contact.contactUID !== payload)
    },
    SET_UID(state, payload) {
      state.uid = payload;
    }
  },
  getters: {
    filterData: (state) => (search) =>{
      let query = new RegExp(search , 'i');
      console.log(query);  
      return state.contacts.filter(data =>{      
        return data.contactName.toLowerCase().includes(search.toLowerCase()) || data.contactPhone.toLowerCase().includes(search.toLowerCase())|| data.contactEmail.toLowerCase().includes(search.toLowerCase());
      });
     }
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
            .then((snapshot) => {
              snapshot.forEach((group) => {
                if (!this.state.groups.length) {
                  commit('SET_GROUPS', group.key);
                }
              });
            });
        })
        .then(() => {
          this.state.contacts.length = 0;
          firebase.database().ref(`/users/${this.state.uid}/contacts`).once('value')
            .then((snapshot) => {
              snapshot.forEach((contacts) => {
                commit('SET_CONTACTS', {
                  contactName: contacts.val().contactName,
                  contactEmail: contacts.val().contactEmail,
                  contactPhone: contacts.val().contactPhone,
                  contactUID: contacts.val().contactUID
                });
              });
              router.push('/home');
            });
        })
        .catch((err) => {
          alert(err.message);
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
        .catch((err) => {
          alert(err.message);
        });
    },
    deleteContact({
      commit
    }, {
      contactUID
    }) {
      firebase.database().ref(`users/${this.state.uid}/contacts`).child(contactUID).remove()
        .then(() => {
          let newArr = this.state.contacts.filter(contact => contact.contactUID !== contactUID)

          this.state.contacts = newArr;
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
      groupName,
      contacts
    }) {
      firebase.database().ref(`users/${this.state.uid}/groups`).child(groupName).set({
          groupName,
          contacts
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
    logOut({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
});