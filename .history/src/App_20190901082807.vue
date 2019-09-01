<template>
  <v-app>

    <Toolbar />

    <v-content>
      <Drawer />
      <HelloWorld/>

      {{ $this.store }}
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';
import store from './store/store';

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
