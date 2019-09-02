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

        <CreateContactDialog />
    </v-content>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Drawer from "@/components/Drawer";
import CreateContactDialog from '@/components/CreateContactDialog'

export default {
  name: "Home",
  props: {
    //
  },
  components: {
    Toolbar,
    Drawer,
    CreateContactDialog
  },
  data: () => ({
    //
  })
};
</script>
