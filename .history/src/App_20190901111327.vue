<template>
  <v-app>    
    <router-view></router-view>
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
