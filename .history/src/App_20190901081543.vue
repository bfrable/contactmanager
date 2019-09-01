<template>
  <v-app>

    <Toolbar />

    <v-content>
      <Drawer />
      <HelloWorld/>

      {{ store }}
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';
import Vuex from 'vuex'

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
});

export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
    Toolbar,
    Drawer,
  },
  data: () => ({
    //
  }),
};
</script>
