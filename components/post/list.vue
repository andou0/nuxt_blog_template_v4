<template>
  <div class="my-post-list">
    <template v-if="posts.length">
      <v-list
        class="py-0"
        style="border-radius: 0"
      >
        <template v-for="(post, i) in posts">
          <!-- hidden-mobile-and-up -->
          <v-list-item
            v-if="!small"
            :key="`img-${i}`"
            :to="linkTo('posts', post)"
            class="hidden-mobile-and-up pa-0"
          >
            <eye-catch
              :post="post"
            />
          </v-list-item>

          <v-list-item
            :key="`post-${i}`"
            :to="linkTo('posts', post)"
            active-class="primary--text"
          >
            <!-- avatar -->
            <v-list-item-avatar
              v-if="!small"
              tile
              :width="avatar.width"
              :height="avatar.height"
              class="hidden-mobile-and-down"
            >
              <eye-catch
                :post="post"
              />
            </v-list-item-avatar>

            <!-- content -->
            <v-list-item-content>
              <bread-crumbs
                :category="(showCategory ? category(post) : null)"
                :post="post"
              />
              <div :class="listClass.postTitle">
                {{ post.fields.title }}
              </div>
              <v-list-item-subtitle class="caption my-align-center">
                <template v-if="!small">
                  {{ post.fields.publishDate | ago }}に公開
                </template>
                <v-chip
                  v-if="isNewPublished(post)"
                  x-small
                  label
                  class="px-1 mx-1"
                >
                  新着
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action
              v-if="isActive(post)"
            >
              <v-icon
                size="18"
                color="red"
              >
                mdi-star
              </v-icon>
            </v-list-item-action>
          </v-list-item>

          <!-- divider -->
          <v-divider
            v-if="(posts.length - 1) !== i"
            :key="`divider-${i}`"
          />
        </template>
      </v-list>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eyeCatch from './eyeCatch'
import breadCrumbs from './breadCrumbs'

export default {
  components: {
    eyeCatch,
    breadCrumbs
  },
  props: {
    showCategory: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      default: () => []
    },
    small: {
      type: Boolean,
      default: false
    },
    activeLink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const width = 180
    return {
      avatar: {
        width,
        height: Math.round(width / 16 * 9)
      }
    }
  },
  computed: {
    ...mapGetters(['linkTo']),
    category () {
      return (post) => {
        return this.$store.getters.categoriesFind({ post })
      }
    },
    listClass () {
      return {
        postTitle: [
          'my-post-title',
          'my-list-hover-color',
          { 'subtitle-1': this.small },
          { 'py-1': this.small }
        ]
      }
    },
    isNewPublished () {
      return (post) => {
        if (!post.fields.publishDate) { return false }
        const today = this.$dayjs()
        const publishedAt = this.$dayjs(post.fields.publishDate).add(5, 'days')
        return today.isBefore(publishedAt)
      }
    },
    isActive () {
      return (post) => {
        return this.activeLink && post.fields.slug === this.$route.params.slug
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-post-list {
  .my-post-title {
    padding: 8px 0;
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.5rem;
    letter-spacing: 0.0125em;
    font-feature-settings: "palt";
    -webkit-font-feature-settings: "palt";
  }
  @media (max-width: 599px) {
    .my-post-title {
      font-size: 1rem;
    }
  }
}
</style>
