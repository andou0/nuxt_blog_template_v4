<template>
  <v-img
    :src="$store.getters.eyeCatchUrl(post)"
    :alt="post.fields.title"
    :lazy-src="lazy"
    :aspect-ratio="(16 / 9)"
    :max-width="imgWidth"
  >
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-3"
          width="3"
          :size="imgWidth / 20"
        />
      </v-row>
    </template>
  </v-img>
</template>

<script>
import lazy from '~/assets/image/lazy.png'

export default {
  props: {
    post: {
      type: Object,
      default: () => ({})
    },
    imgWidth: {
      type: Number,
      default: 480
    }
  },
  data: () => ({
    lazy
  })
}
</script>
