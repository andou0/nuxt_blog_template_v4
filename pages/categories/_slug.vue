<template>
  <div id="category">
    <my-drawer>
      <template #drawer>
        <v-card
          flat
          class="px-4 pb-4"
        >
          <div class="my-title">
            {{ title }}
          </div>
          <div class="my-text-content">
            {{ desc }}
          </div>
          <template v-if="category.fields.technologies">
            <div class="my-subtitle">
              採用している技術
            </div>
            <ul class="my-list">
              <li
                v-for="(tec, i) in category.fields.technologies"
                :key="`tec-${i}`"
                class="my-list-content"
              >
                {{ tec.fields.name }}
                <small>
                  {{ tec.fields.details }}
                </small>
              </li>
            </ul>
          </template>
        </v-card>

        <v-list class="mt-4">
          <v-list-item class="my-title">
            {{ title }}のチャプター
          </v-list-item>
          <v-list-item
            v-for="(chap, i) in chapters"
            :key="`drawer-${i}`"
            class="subtitle-2 my-font-bold"
            @click="scrollTo(chap)"
          >
            <v-list-item-icon class="mr-1">
              {{ chap.fields.sort }}.
            </v-list-item-icon>
            <v-list-item-content>
              {{ chap.fields.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template #main>
        <my-card>
          <template #h1>
            {{ title }}
          </template>

          <template
            v-if="category.fields.link"
            #header-right
          >
            <v-btn
              :href="category.fields.link"
              outlined
              :small="$vuetify.breakpoint.xsOnly"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              デモアプリを見る
            </v-btn>
          </template>

          <template #h2>
            {{ category.fields.details }}
          </template>

          <template #main-content>
            <v-list
              v-for="(chap, chapI) in chapters"
              :id="`chapter-${chap.fields.sort}`"
              :key="`chap-${chapI}`"
              color="transparent"
            >
              <ad-infield
                v-if="[3, 7].includes(chap.fields.sort)"
              />
              <v-list-item class="subtitle-1 my-font-bold">
                <v-list-item-icon class="mr-2">
                  {{ chap.fields.sort }}.
                </v-list-item-icon>
                <v-list-item-content>
                  {{ chap.fields.name }}
                </v-list-item-content>
              </v-list-item>

              <post-list
                :posts="postsWhere(chap)"
              />
              </ad-infeild>
            </v-list>
          </template>
        </my-card>
      </template>
    </my-drawer>
  </div>
</template>

<script>
import adInfield from '~/components/ui/adsense/infield'
import meta from '~/assets/mixins/meta'

export default {
  components: {
    adInfield
  },
  validate ({ params }) {
    return /^[A-Za-z0-9-]+$/.test(params.slug)
  },
  mixins: [meta],
  asyncData ({ params, payload, store, error }) {
    const slug = params.slug
    const category = payload ||
      store.state.categories.find(cat => cat.fields.slug === slug)
    if (category) {
      const title = category.fields.name
      const desc = category.fields.details + (category.fields.subDetails || '')
      return { slug, category, title, desc }
    } else {
      return error({ statusCode: 404, message: 'Category Not found' })
    }
  },
  computed: {
    chapters () {
      return this.$store.state.chapters[this.slug]
    },
    postsWhere () {
      return (chap) => {
        return this.$store.getters.postsWhere({ chapter: chap })
      }
    }
  },
  methods: {
    scrollTo (chap) {
      this.$vuetify.goTo(`#chapter-${chap.fields.sort}`)
    }
  }
}
</script>
