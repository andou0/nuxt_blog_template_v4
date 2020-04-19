<template>
  <div id="home">
    <my-drawer>
      <template #drawer>
        <default-sidebar />
        <twitter-timeline />
      </template>
      <template #main>
        <my-card>
          <template #h1>
            新着記事
          </template>

          <template #h2>
            独学でも、ここまでできるってよ。
          </template>

          <template #main-content>
            <!-- tabs -->
            <v-tabs
              v-model="tab"
              fixed-tabs
              background-color="transparent"
              slider-color="primary"
            >
              <v-tab
                v-for="(cat, i) in categories"
                :key="`cat-${i}`"
                class="my-font-bold"
                @click="tabClick(i)"
              >
                {{ cat.fields.name }}
              </v-tab>
            </v-tabs>

            <!-- transition -->
            <v-fade-transition group>
              <template v-if="!transition">
                <v-card
                  key="transition-1"
                  flat
                  color="transparent"
                >
                  <v-card-title
                    class="justify-center subtitle-2"
                  >
                    {{ currentCategory.fields.details }}
                  </v-card-title>

                  <v-card-text
                    v-if="currentCategory.fields.link"
                    class="text-center"
                  >
                    <v-btn
                      :href="currentCategory.fields.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      outlined
                      color="primary"
                      class="px-4"
                    >
                      これが作れます
                      <small>(デモアプリ)</small>
                    </v-btn>
                  </v-card-text>
                </v-card>

                <post-list
                  key="transition-2"
                  show-category
                  :posts="posts"
                />
              </template>
            </v-fade-transition>
          </template>

          <template #footer-content>
            <v-btn
              large
              block
              color="primary"
              class="my-font-bold"
              :to="$store.getters.linkTo('categories', currentCategory)"
            >
              {{ currentCategory.fields.name }}をもっと見る
            </v-btn>
          </template>
        </my-card>
      </template>
    </my-drawer>
  </div>
</template>

<script>
import twitterTimeline from '~/components/ui/twitterTimeline'

export default {
  components: {
    twitterTimeline
  },
  data: () => ({
    tab: 0,
    limit: process.env.POSTLIMIT,
    transition: false
  }),
  computed: {
    categories () {
      return this.$store.getters.mainCategories()
    },
    currentCategory () {
      return this.categories[this.tab]
    },
    posts () {
      return this.$store.getters.postsWhere({ category: this.currentCategory })
        .slice(0, this.limit).sort((a, b) => {
          switch (true) {
            case (a.fields.publishDate > b.fields.publishDate): return -1
            case (a.fields.publishDate < b.fields.publishDate): return 1
            default: return 0
          }
        })
    }
  },
  methods: {
    tabClick (index) {
      if (this.tab === index) { return }
      this.transition = true
      setTimeout(() => (this.transition = false), 100)
    }
  },
  head: () => ({
    titleTemplate: null,
    meta: [{ hid: 'og:type', property: 'og:type', content: 'website' }]
  })
}
</script>
