<template>
  <div
    class="my-bread-crumbs my-text-grey"
    :style="{ fontSize: `${font}px` }"
  >
    <template v-if="category">
      {{ category.fields.name }}
      <v-icon :size="iconSize">
        mdi-chevron-right
      </v-icon>
    </template>
    {{ post.fields.chapter.fields.sort }}.
    {{ post.fields.chapter.fields.name }}
    <template v-if="post.fields.sort">
      <v-icon :size="iconSize">
        mdi-chevron-right
      </v-icon>
      {{ post.fields.sort | zero }}
    </template>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => null
    },
    post: {
      type: Object,
      default: () => ({})
    },
    font: {
      type: Number,
      default: 12
    }
  },
  computed: {
    iconSize () {
      return (this.font + 6)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-bread-crumbs {
  display: flex;
  align-items: center;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  i { margin: 0 4px; }
}
</style>
