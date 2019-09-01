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

export default {
  name: 'App',
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
