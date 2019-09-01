<template>
     <v-container class="fill-height" fluid>
        <v-form v-model="valid">
          <v-container>
            <v-row class="d-flex justify-center">
              <v-col cols="12" md="12">
                <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Normal with hint text"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" class="text-center">
                <v-btn large color="primary" dark class="ma-2">Login</v-btn>
                <v-btn large color="success" dark class="ma-2">Signup</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        show1: false,
        password: 'Password',
        rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
        },
    })
};
</script>