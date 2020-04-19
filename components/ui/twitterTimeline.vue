<template>
  <client-only>
    <div>
      <div class="my-title">
        今日のさえずり
      </div>
      <div class="text-center my-4">
        <timeline
          :id="twitterId"
          :source-type="type"
          :options="options"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-1"
          />
        </timeline>
      </div>
    </div>
  </client-only>
</template>

<script>
import { Timeline } from 'vue-tweet-embed'

export default {
  components: {
    Timeline
  },
  data ({ $store }) {
    const width = $store.state.layout.drawerWidth
    return {
      twitterId: process.env.TWITTER_ACCOUNT,
      type: 'profile',
      options: {
        height: 280,
        width: (width - 32),
        chrome: 'nofooter' // noheader or transparent or noscrollbar or noborders
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
