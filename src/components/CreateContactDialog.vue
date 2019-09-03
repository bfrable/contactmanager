<template>
  <v-dialog v-model="toggleDialog" width="800px">
    <v-card>
      <v-card-title class="blue">Create Contact</v-card-title>
      <v-container>
          <v-col class="align-center justify-space-between" cols="12">
            <v-row align="center">
              <v-avatar size="40px" class="mr-4">
                <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
              </v-avatar>
              <v-text-field placeholder="Name" v-model="name"></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-text-field prepend-icon="mail" v-model="email" placeholder="Email"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field type="tel" prepend-icon="phone" v-model="phone" placeholder="(000) 000 - 0000"></v-text-field>
          </v-col>
      </v-container>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text color="primary" @click="toggleDialog = false">Cancel</v-btn>
        <v-btn text @click="createContact()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    //
  },
  components: {
    //
  },
  data: () => ({
    toggleDialog: false,
    name: '',
    email: '',
    phone: ''
  }),
  methods: {
    createContact() {
      this.$store.dispatch("createContact", {
        contactName: this.name,
        contactEmail: this.email,
        contactPhone: this.phone,
        contactUID: this.name + Date.now()
      })
      .then(() => {
          this.toggleDialog = false;
          this.name = '';
          this.email = '';
          this.phone = '';
      })
      .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.v-card {
  &__title {
    color: #ffffff;
  }
}
</style>