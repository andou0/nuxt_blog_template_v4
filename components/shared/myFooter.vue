<template>
  <div id="footer">
    <v-card
      tile
      flat
      :style="cardStyles"
      color="grey darken-3"
    >
      <my-container #padding-content>
        <v-col
          cols="12"
          sm="4"
        >
          <div class="my-footer-title">
            {{ siteName }}
          </div>
          <div class="my-footer-content">
            独学でも、ここまでできるってよ。
          </div>
          <div class="my-footer-subcontent flex">
            <v-btn
              v-for="(sns, i) in snsItems"
              :key="`sns-${i}`"
              :href="sns.link"
              target="_blank"
              rel="noopener noreferrer"
              icon
            >
              <v-icon
                size="20"
                aria-hidden="false"
                :aria-label="sns.icon"
              >
                mdi-{{ sns.icon }}
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <div class="my-footer-title">
            ABOUT
          </div>
          <ul class="my-footer-content">
            <template v-if="posts.length">
              <li
                v-for="(post, i) in posts"
                :key="`post-${i}`"
                :class="{ 'mt-4': (i !== 0) }"
              >
                <nuxt-link
                  :to="$store.getters.linkTo('posts', post)"
                  class="my-link"
                >
                  {{ post.fields.subTitle }}
                </nuxt-link>
              </li>
            </template>
            <li
              v-for="(link, i) in linkItems"
              :key="`link-${i}`"
              class="mt-4"
            >
              <nuxt-link
                :to="link.to"
                class="my-link"
              >
                {{ link.title }}
              </nuxt-link>
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <div class="my-footer-title">
            CONTACT
          </div>
          <div class="my-footer-content">
            お仕事のご依頼や記事の編集リクエストなどのお問い合わせは、こちらのメールアドレスまでお送りください。
          </div>
          <div class="my-footer-subcontent">
            <a :href="`mailto:${email}`" class="my-link subtitle-2">
              {{ email }}
            </a>
          </div>
        </v-col>
      </my-container>
    </v-card>
    <v-footer
      app
      absolute
      dark
      :height="copyHeight"
      color="my-footer-bgcolor"
      class="justify-center"
    >
      <div class="caption">
        &copy;{{ copy.start }} - {{ copy.end }} —
        <strong class="ml-1">{{ siteName }}</strong>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  data ({ $store }) {
    const copyHeight = 32
    return {
      copyHeight,
      siteName: process.env.SITE_NAME,
      copy: {
        start: 2019,
        end: new Date().getFullYear()
      },
      cardStyles: {
        zIndex: 4,
        marginBottom: `${copyHeight}px`
      },
      snsItems: [
        { icon: 'twitter', link: `https://twitter.com/${process.env.TWITTER_ACCOUNT}` },
        { icon: 'slack', link: process.env.SLACK_LINK }
      ],
      linkItems: [
        { title: 'プライバシーポリシー', to: '/privacy' }
      ],
      email: process.env.EMAIL
    }
  },
  computed: {
    posts () {
      const category = this.$store.getters.categoriesFind({ slug: 'about' })
      return category ? this.$store.getters.postsWhere({ category }) : []
    }
  }
}
</script>

<style lang="scss" scoped>
#footer {
  ul {
    list-style: none;
    padding: 0;
  }
  a, i, .my-footer-content {
    color: #ddd;
  }
  .my-footer-title {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    color: #fff;
  }
  .my-footer-content {
    margin-top: 8px;
    font-size: 13px;
    font-weight: 600;
  }
  .my-footer-subcontent {
    margin-top: 8px;
  }
  .my-footer-bgcolor {
    background: #0053A3;
    background: linear-gradient(to left, #0053A3, #021b79);
    background: -webkit-linear-gradient(to left, #0053A3, #021b79);
    background: -moz-linear-gradient(to left, #0053A3, #021b79);
  }
}
</style>
