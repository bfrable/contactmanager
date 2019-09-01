<template>
  <v-app>

    <Toolbar />

    <v-content>

      {{ store }}
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';
import store from './store/index';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Toolbar,
    Drawer,
    store
  },
  data: () => ({
    //
  }),
};
</script>
