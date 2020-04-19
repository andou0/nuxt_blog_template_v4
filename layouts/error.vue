<template>
  <div id="error">
    <my-drawer>
      <template #drawer>
        <default-sidebar />
      </template>
      <template #main>
        <v-container
          fluid
          text-center
        >
          <v-card flat color="transparent" class="text-center">
            <h2>Error</h2>
            <v-card-title class="display-2 justify-center my-font-bold">
              {{ error.statusCode }}
            </v-card-title>
            <v-card-text class="subtitle-1">
              {{ message }}
            </v-card-text>
            <v-icon size="32">
              mdi-emoticon-dead-outline
            </v-icon>
          </v-card>
        </v-container>
      </template>
    </my-drawer>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    message () {
      return this.error.message
    }
  },
  head () {
    return { title: this.message }
  }
}
</script>
