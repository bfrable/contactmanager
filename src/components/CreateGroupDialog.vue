<template>
  <v-dialog v-model="toggleDialog" width="800px">
    <v-card>
      <v-card-title class="blue">Create Group</v-card-title>
      <v-container>
        <v-row>
          <v-col class="align-center justify-space-between" cols="12">
              <v-text-field placeholder="Group Name"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text color="primary">More</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn text color="primary" @click="toggleDialog = false">Cancel</v-btn>
        <v-btn text @click="toggleDialog = false">Save</v-btn>
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
  })
};
</script>

<style scoped lang="scss">
.v-card {
    &__title {
        color: #ffffff;
    }
}
</style>