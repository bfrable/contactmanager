<template>
  <v-dialog v-model="toggleDialog" width="800px">
    <v-card>
      <v-card-title class="blue">Create Group</v-card-title>
      <v-container>
        <v-col class="align-center justify-space-between" cols="12">
          <v-text-field placeholder="Group Name" v-model="groupName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-combobox
            v-model="contacts"
            :filter="filter"
            :hide-no-data="!search"
            :items="this.$store.state.contacts"
            :search-input.sync="search"
            item-text="contactName"
            label="Search for an option"
            multiple
            hide-selected
            return-object
            small-chips
            solo
          >
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">{{ item.contactName }}</span>
                <v-icon small @click="parent.selectItem(item)">close</v-icon>
              </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
              <v-chip dark label small>{{ item.contactName }}</v-chip>
            </template>
          </v-combobox>
        </v-col>
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
    search: null,
    nonce: 1,
    contacts: [],
    toggleDialog: false,
    groupName: "",
  }),
  watch: {
    contacts (val, prev) {
        if (val.length === prev.length) return

        this.contacts = val.map(v => {
          if (typeof v === 'string') {
            v = {
              contactName: v,
            }

            this.contacts.push(v)

            console.log(this.contacts);
            this.nonce++
          }

          return v
        })
      },
  },
  methods: {
    filter(item, queryText, itemText) {
      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );

      console.log(this.contacts);
    },
    createGroup() {
      this.$store
        .dispatch("createGroup", {
          groupName: this.groupName,
          contacts: this.contacts
        })
        .then(() => {
          this.toggleDialog = false;
          this.groupName = "";
          this.contacts = [];
        })
        .catch(err => {
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