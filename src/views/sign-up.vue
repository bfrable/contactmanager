<template>
  <v-container class="fill-height">
    <v-container>
      <v-form v-model="valid" class="login-form">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="name" label="Name" required></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field v-model="employeeID" label="Employee ID" required></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Pasword"
              hint="At least 8 characters"
              counter
              @click:append="show = !show"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12" class="text-center">
            <v-btn large color="success" dark class="ma-2" @click.stop="signUp()">Signup</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: false,
    email: '',
    name: '',
    employeeID: '',
    show: false,
    password: '',
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
    signUp() {
      this.$store.dispatch('userJoin', {
        name: this.name,
        email: this.email,
        employeeID: this.employeeID,
        password: this.password
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-form {
  margin: 0 auto;
  max-width: 420px;
}
</style>