<template>
  <v-menu
    bottom
    nudge-width="100"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon
          aria-hidden="false"
          aria-label="vertical"
        >
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(cat, i) in categories"
        :key="i"
        exact
        :to="$store.getters.linkTo('categories', cat)"
      >
        <v-list-item-title>
          {{ cat.fields.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  }
}
</script>
