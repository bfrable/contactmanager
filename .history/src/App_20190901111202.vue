<template>
  <v-app>
    <Toolbar />

      
      <v-container>
      <router-view></router-view>
      </v-container>

  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",
  props: {
    //
  },
  components: {
    Toolbar,
  },
  data: () => ({
    //
  })
};
</script>
