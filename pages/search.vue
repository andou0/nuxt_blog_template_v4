<template>
  <div id="search">
    <my-drawer>
      <template #drawer>
        <default-sidebar />
      </template>
      <template #main>
        <v-container
          v-if="loading"
          fluid
          text-center
        >
          <v-card-text>
            <v-progress-circular
              indeterminate
              color="grey lighten-1"
            />
          </v-card-text>
        </v-container>
        <my-card v-else>
          <template #h1>
            検索
          </template>
          <template #h2>
            {{ title }}
          </template>
          <template #main-content>
            <template v-if="posts.length">
              <post-list
                :posts="currentPosts"
              />
            </template>
            <template v-else>
              <div class="text-center">
                <v-icon size="32">
                  mdi-emoticon-cry-outline
                </v-icon>
                <div class="my-text-grey">
                  Sorry...
                </div>
              </div>
            </template>
          </template>
          <template
            v-if="showNextBtn"
            #footer-content
          >
            <v-btn
              large
              block
              color="primary"
              class="my-font-bold"
              :disabled="disabledNextBtn"
              @click="nextClick"
            >
              次の{{ nextCount }}件を表示
            </v-btn>
          </template>
        </my-card>
      </template>
    </my-drawer>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import meta from '~/assets/mixins/meta'

export default {
  async middleware ({ store, query }) {
    return await store.dispatch('getQuery', query.q || '')
  },
  mixins: [meta],
  data ({ $store }) {
    return {
      posts: [],
      loading: false,
      limit: Number(process.env.POSTLIMIT),
      clickCount: 1,
      notQueryMsg: '検索クエリが設定されていません'
    }
  },
  computed: {
    query () {
      return this.$route.query.q || ''
    },
    q () {
      return this.query.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ',')
    },
    title () {
      if (!this.query) { return this.notQueryMsg }
      return `${this.query} の検索結果:${this.posts.length}件`
    },
    showNextBtn () {
      return this.posts.length > this.limit
    },
    disabledNextBtn () {
      return this.clickCount >= Math.ceil(this.posts.length / this.limit)
    },
    currentPosts () {
      return this.posts.slice(0, (this.clickCount * this.limit))
    },
    nextCount () {
      const remainingPosts = this.posts.length - this.currentPosts.length
      return (remainingPosts < this.limit) ? remainingPosts : this.limit
    }
  },
  watch: {
    q: {
      async handler (newVal) {
        if (newVal) {
          this.loading = true
          this.dataReset()
          await client.getEntries({ content_type: 'blogPost', query: newVal })
            .then(({ items }) => (this.posts = items))
            .catch(console.error)
          this.loading = false
        }
      },
      immediate: true
    }
  },
  async beforeDestroy () {
    await this.$store.dispatch('getQuery', '')
  },
  methods: {
    dataReset () {
      this.posts = []
      this.clickCount = 1
    },
    nextClick () {
      this.clickCount += 1
    }
  }
}
</script>
