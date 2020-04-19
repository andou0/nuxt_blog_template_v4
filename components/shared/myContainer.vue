<template>
  <v-container
    fluid
    class="my-container"
  >
    <slot name="content" />
    <v-container
      fluid
      class="px-4"
    >
      <v-row class="px-0 px-sm-4">
        <slot name="padding-content" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
// NG => style="max-width 1280px; adsenseのwidthが上書きされるためclassでwidth指定"
.my-container {
  max-width: 1280px !important;
  padding: 0 !important;
}
</style>
