<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="(contact,i) in this.$store.state.contacts" :key="i">
      <v-expansion-panel-header>{{contact.contactName}}</v-expansion-panel-header>
      <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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
    // deleteContact(groupName) {
    //   this.$store.dispatch('deleteContact', {
    //     contactUID: contactUID
    //   });
    // },
  }
};
</script>