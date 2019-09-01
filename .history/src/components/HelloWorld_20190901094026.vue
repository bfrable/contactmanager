<template>
    <div>
      
      <v-content>
        <v-container
          class="fill-height"
          fluid
        >
        </v-container>
      </v-content>
      
    </div>
</template>

<script>

  export default {
    components: {
      //
    },
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
    }),
  }
</script>