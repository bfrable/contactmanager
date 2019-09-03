<template>
  <v-navigation-drawer v-if="this.$store.state.drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list dense>
      <template v-for="item in this.$store.state.drawerItems">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            @click="i == 0 ? toggleCreateGroupDialog() : openGroupContacts(child.groupName)"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                  {{ child.text }}
                  <span v-if="!i == 0" class="delete-group" @click.stop="deleteGroup(child.text || child.groupName)"><i aria-hidden="true" class="v-icon notranslate material-icons theme--light">delete</i></span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <template v-slot:append>
        <div class="pa-2">
            <v-btn block @click="logout()">Logout</v-btn>
        </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    //
  },
  data: () => ({
    //
  }),
  methods: {
    toggleCreateGroupDialog() {
      this.$root.$children[0].$children[0].$children[0].$refs.createGroupDialog.toggleDialog = !this.$root.$children[0].$children[0].$children[0].$refs.createGroupDialog.toggleDialog;
    },
    deleteGroup(groupName) {
      confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteGroup', {
        groupName: groupName
      });
    },
    openGroupContacts(groupName) {
      this.$store.dispatch('loadGroupContacts', {
        groupName: groupName
      });
    },
    logout() {
        this.$store.dispatch('logOut');
    }
  }
};
</script>

<style scoped lang="scss">

    .delete-group {
        float: right;

        i {
            font-size: 18px;
        }
    }

</style>
