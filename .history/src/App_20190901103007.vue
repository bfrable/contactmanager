<template>
  <v-app>
    <Toolbar />

    <v-content>

      <router-view></router-view>

    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",
  props: {
    source: String
  },
  components: {
    Toolbar,
    Drawer
  },
  data: () => ({
    dialog: false,
  })
};
</script>
