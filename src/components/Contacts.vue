<template>
  <v-card class="contacts-table">
    <v-card-title>
      Contacts
      <div class="flex-grow-1"></div>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="this.$store.state.contacts"
      :items-per-page="15"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2">edit</v-icon>
        <v-icon small @click="deleteContact(item.contactUID)">delete</v-icon>
      </template>
      <template v-slot:item.contactEmail="{ item }">
        <v-chip dark class="blue">
          <a :href="`mailto:${item.contactEmail}`" class="email-link">{{ item.contactEmail }}</a>
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    //
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Name",
        align: "left",
        value: "contactName"
      },
      { text: "Email", value: "contactEmail" },
      { text: "Phone", value: "contactPhone" },
      { text: 'Actions', value: 'action', sortable: false }
    ]
  }),
  methods: {
    deleteContact(contactUID) {
      confirm('Are you sure you want to delete this item?') && this.$store.dispatch("deleteContact", {
        contactUID: contactUID
      });
    }
  }
};
</script>

<style lang="scss">
.contacts-table {
  width: 100%;

  .email-link {
    color: #ffffff;
  }
}
</style>