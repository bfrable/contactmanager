<template>
    <v-content>
        <Toolbar />  
        <Drawer />

        <v-container class="fill-height" fluid>
            <Contacts />
        </v-container>

        <v-btn bottom color="pink" dark fab fixed right @click="toggleCreateContactDialog()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <CreateGroupDialog ref="createGroupDialog" />
        <CreateContactDialog ref="createContactDialog" />
    </v-content>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Drawer from "@/components/Drawer";
import CreateContactDialog from '@/components/CreateContactDialog';
import CreateGroupDialog from '@/components/CreateGroupDialog';
import Contacts from '@/components/Contacts';

export default {
  name: "Home",
  props: {
    //
  },
  components: {
    Toolbar,
    Drawer,
    CreateContactDialog,
    CreateGroupDialog,
    Contacts
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
