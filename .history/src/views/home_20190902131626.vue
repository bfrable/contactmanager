<template>
    <v-content>
        <Toolbar />  
        <Drawer />

        <v-container class="fill-height" fluid>
            This is the contacts

            {{ this.$store.state.user.user.email }}
        </v-container>

        <v-btn bottom color="pink" dark fab fixed right @click="toggleCreateContactDialog()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <CreateContactDialog ref="createContactDialog" />
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
  }),
  methods: {
      toggleCreateContactDialog() {
          this.$refs.createContactDialog.toggleDialog = !this.$refs.createContactDialog.toggleDialog
      }
  }
};
</script>
