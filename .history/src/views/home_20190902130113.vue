<template>
    <v-content>
        <Toolbar />  
        <Drawer />

        <v-container class="fill-height" fluid>
            This is the contacts

            {{ this.$store.state.user.user.email }}
        </v-container>

        <v-btn bottom color="pink" dark fab fixed right @click="createContactDialog = !createContactDialog">
            <v-icon>mdi-plus</v-icon>
        </v-btn>


    </v-content>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Drawer from "@/components/Drawer";
import createContactDialog from '@/components/CreateContactDialog'

export default {
  name: "Home",
  props: {
    source: String
  },
  components: {
    Toolbar,
    Drawer,
    createContactDialog
  },
  data: () => ({
    dialog: false,
  })
};
</script>
