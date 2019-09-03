<template>
  <v-dialog v-model="toggleDialog" width="800px">
    <v-card>
      <v-card-title class="blue">Create Contact</v-card-title>
      <v-container>
          <v-form v-model="valid" class="login-form">
            <v-col cols="12">
                <v-text-field prepend-icon="person" v-model="name" label="Name" :rules="[rules.required,]"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mail" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="phone" v-model="phone" placeholder="(000) 000 - 0000" :rules="[rules.required]"></v-text-field>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="toggleDialog = false">Cancel</v-btn>
            <v-btn text @click.stop="createContact()">Save</v-btn>
          </v-form>
      </v-container>
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
    valid: false,
    toggleDialog: false,
    name: '',
    email: '',
    phone: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    }
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