<template>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Contacts</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
          :src="require('../assets/logo.svg')"
        ></v-img></v-avatar>
          
      </v-btn>
    </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {
    //
  },
  data: () => ({
    //
  }),
  computed: {
      drawer() {
          return this.$store.state.drawer;
      }
  },
  methods:{ 
    ...mapMutations([
      'toggleDrawer',
    ]),
  }
};
</script>