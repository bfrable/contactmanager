<template>
  <v-dialog v-model="toggleDialog" width="800px">
    <v-card>
      <v-card-title class="blue">Create Group</v-card-title>
      <v-container>
        <v-row>
          <v-col class="align-center justify-space-between" cols="12">
            <v-text-field placeholder="Group Name" v-model="groupName"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text color="primary" @click="toggleDialog = false">Cancel</v-btn>
        <v-btn text @click="createGroup()">Save</v-btn>
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
    groupName: ''
  }),
  methods: {
    createGroup() {
      this.$store.dispatch("createGroup", {
        groupName: this.groupName,
      })
      .then(() => {
          this.toggleDialog = false;
          this.groupName = '';
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