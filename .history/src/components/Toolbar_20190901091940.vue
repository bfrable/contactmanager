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
        {{ this.$store.state }}
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Contacts</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
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
import { toggleDrawer } from "../store/index";

export default {
  vuex: {
    mutations: { toggleDrawer }
  },
  components: {
    //
  },
  data: () => ({
    //
  }),
  methods:{ 
    toggleDrawer: () => {
        this.$store.commit("toggleDrawer")
    }  
  }
};
</script>