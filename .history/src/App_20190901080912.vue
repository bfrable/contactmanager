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
