<template>
     <v-container class="fill-height" fluid>
        <v-form v-model="valid">
          <v-container>
            <v-row>
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

              <v-col cols="12" md="12">
                <v-btn large color="primary">Login</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
</template>