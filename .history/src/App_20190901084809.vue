<template>
  <v-app>

    <Toolbar />

    <v-content>
      <Drawer />
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';
import { store } from './store/index';

export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
    Toolbar,
    Drawer,
  },
  computed: {
    drawer () {
      return this.$.store.state.drawer
    }
  },
  data: () => ({
    //
  }),
};
</script>
