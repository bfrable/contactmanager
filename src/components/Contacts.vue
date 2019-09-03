<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="(contact,i) in this.$store.state.contacts" :key="i">
      <v-expansion-panel-header>{{contact.contactName}}</v-expansion-panel-header>
      <v-expansion-panel-content class="pa-20">

        <v-btn-toggle>
          <v-btn text @click="deleteContact(contact.contactUID)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn text>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-btn-toggle>

        <p>
          <strong>E-Mail: </strong>
          <a :href="`mailto:${contact.contactEmail}`"> {{ contact.contactEmail }}</a>
        </p>
        <p>
          <strong>Phone: </strong>
          <a :href="`tel:${contact.contactPhone}`"> {{ contact.contactPhone }}</a>
        </p>
      </v-expansion-panel-content>
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
    deleteContact(contactUID) {
      this.$store.dispatch('deleteContact', {
        contactUID: contactUID
      });
    },
  }
};
</script>

<style lang="scss">
    .v-expansion-panel-content {
        padding: 20px 0 0;
    }

    .v-item-group {
        float: right;
    }
</style>