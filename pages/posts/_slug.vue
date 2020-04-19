<template>
  <div id="post">
    <my-drawer
      hide-on-scroll
    >
      <!-- drawer -->
      <template #drawer>
        <eye-catch
          :post="post"
          :img-width="$store.state.layout.drawerWidth"
        />
        <v-list-item class="my-toc-title">
          <v-icon>
            mdi-format-list-bulleted
          </v-icon>
          目次
        </v-list-item>

        <v-list-item class="my-toc-container">
          <div v-html="toc" />
        </v-list-item>
      </template>

      <!-- content -->
      <template #main>
        <v-sheet
          tile
          class="my-sheet"
        >
          <!-- bread crumbs -->
          <bread-crumbs
            :category="postCategory"
            :post="post"
            :font="14"
          />

          <!-- date -->
          <v-list-item class="px-0 subtitle-2">
            <template v-if="isPostUpdated">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span class="my-text-grey" v-on="on">
                    {{ updatedAt | date }}に更新
                  </span>
                </template>
                <span>{{ publishedAt | date }}に公開</span>
              </v-tooltip>
            </template>
            <template v-else>
              <span class="my-text-grey">
                {{ publishedAt | date }}に公開
              </span>
            </template>
          </v-list-item>

          <!-- title -->
          <h1 class="my-post-title">
            {{ post.fields.title }}
          </h1>

          <ad-inpost />

          <!-- body -->
          <vue-markdown
            :source="post.fields.body"
            toc
            :postrender="postrender"
            :toc-anchor-link="false"
            toc-class="my-toc"
            class="my-post-body"
            @toc-rendered="tocAllRight"
          />
        </v-sheet>

        <v-card
          tile
          flat
          class="my-6 pa-4"
        >
          <service-menu />
        </v-card>

        <ad-inline />

        <v-list color="transparent">
          <v-list-item class="my-title">
            次の記事はこちら
          </v-list-item>

          <template v-for="(cat, i) in mainCategories()">
            <v-list-group
              v-if="cat.sys.id === postCategory.sys.id"
              :key="`cat-${i}`"
              eager
              value="true"
            >
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon size="16">
                    mdi-folder-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title class="my-subtitle">
                  {{ postCategory.fields.name }}の記事一覧
                </v-list-item-title>
              </template>

              <post-list
                small
                active-link
                :posts="relatedPosts"
              />
            </v-list-group>

            <v-list-item
              v-else
              :key="`cat-${i}`"
              :to="linkTo('categories', cat)"
            >
              <v-list-item-icon>
                <v-icon size="16">
                  mdi-folder-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="my-list-hover-color my-subtitle">
                {{ cat.fields.name }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </my-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueMarkdown from 'vue-markdown'
import Prism from '~/plugins/prism'
import meta from '~/assets/mixins/meta'
import breadCrumbs from '~/components/post/breadCrumbs'
import postList from '~/components/post/list'
import eyeCatch from '~/components/post/eyeCatch'
import adInline from '~/components/ui/adsense/inline'
import adInpost from '~/components/ui/adsense/inpost'
import serviceMenu from '~/components/ui/serviceMenu'

export default {
  components: {
    VueMarkdown,
    breadCrumbs,
    postList,
    eyeCatch,
    adInline,
    adInpost,
    serviceMenu
  },
  validate ({ params }) {
    return /^[A-Za-z0-9-_]+$/.test(params.slug)
  },
  mixins: [meta],
  asyncData ({ params, payload, store, error }) {
    const post = payload ||
      store.state.posts.find(post => post.fields.slug === params.slug)
    if (post) {
      const title = post.fields.title
      const body = post.fields.body.substring(0, 300)
      const desc = body.replace(/<.+?>|[#!`*+\-()[\]\s|]/g, '').substring(0, 160)
      const ogImg = store.getters.eyeCatchUrl(post)
      return { post, title, desc, ogImg }
    } else {
      return error({ statusCode: 404, message: 'Post Not found' })
    }
  },
  data: () => ({
    toc: ''
  }),
  computed: {
    ...mapGetters(['categoriesFind', 'postsWhere', 'mainCategories', 'linkTo']),
    publishedAt () {
      return this.$dayjs(this.post.fields.publishDate)
    },
    updatedAt () {
      return this.$dayjs(this.post.sys.updatedAt)
    },
    isPostUpdated () {
      return this.publishedAt.add(1, 'days') < this.updatedAt
    },
    postCategory () {
      return this.categoriesFind({ post: this.post })
    },
    relatedPosts () {
      return this.postCategory
        ? this.postsWhere({ category: this.postCategory })
          .sort((a, b) =>
            a.fields.chapter.fields.sort - b.fields.chapter.fields.sort
          )
        : []
    }
  },
  async mounted () {
    await Prism.highlightAll()
  },
  methods: {
    tocAllRight (tocHtmlStr) {
      this.toc = tocHtmlStr
    },
    postrender (body) {
      const url = /href="http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%@#&=]*)?"/gi
      const reBody =
        body.replace(url, "$& target='_blank' rel='noopener noreferrer'")
          .replace(/<f>/g, '<span class="my-file">')
          .replace(/<\/f>/g, '</span>')
          .replace(/<code>/g, '<code class="my-code">')
      return reBody
    }
  }
}
</script>

<style lang="scss">
$black: rgba(0, 0, 0, 0.87);
$grey: rgba(0, 0, 0, 0.54);
$border: 1px solid rgba(0, 0, 0, .12);

// post
$sheetPa: 32px;
$mt: .5em;
$mb: 1.5em;
$h1: 2.5rem;
$h2: 1.6em;
$p: 1.125rem;
// toc
$tocX: 8px;

#post {
  // .my-sheet ////////////////////////
  .my-sheet {
    padding: $sheetPa;
  }
  // .my-toc ///////////////////////////////
  .my-toc-title {
    padding: 0 $tocX;
    margin-bottom: $tocX;
    border-bottom: $border;
    font-size: .875rem;
    font-weight: 600;
    color: $grey !important;
    i {
      font-size: 1.125rem;
      margin-right: 4px;
    }
  }
  .my-toc-container {
    padding: 0;
    ul.my-toc, ul.my-toc > li > ul {
      list-style: none;
      padding-left: 0 !important;
    }
    // h2
    ul.my-toc {
      font-size: .875rem;
      li {
        margin: 4px 0;
        a {
          display: block;
          padding: 4px $tocX;
          line-height: 1.3;
          color: $grey;
          text-decoration: none;
          &:hover {
            color: $black;
            background: rgba(0, 0, 0, .04);
          }
        }
        // h3
        ul > li { padding-left: 1em; }
      }
    }
  }
  // .my-post ////////////////////////
  h1.my-post-title {
    margin-bottom: 1em;
    font-size: $h1;
    font-weight: 600;
    font-feature-settings: "palt";
    -webkit-font-feature-settings: "palt";
    line-height: 1.4;
    word-wrap: break-word;
  }
  .my-post-body {
    h2, h3, h4, h5, h6 {
      margin: 2.2em 0 1em;
      line-height: 1.5;
      font-weight: 600;
      font-feature-settings: "palt";
      -webkit-font-feature-settings: "palt";
    }
    h2 {
      font-size: $h2;
      padding-bottom: .15em;
      border-bottom: $border;
    }
    h3 {
      font-size: ($h2 - .2em);
    }
    h4 {
      font-size: ($h2 - .4em);
    }
    h5, h6 {
      font-size: ($h2 - .6em);
    }
    p {
      margin: 1em 0;
    }
    p, ul, ol, li, code {
      font-size: $p;
      line-height: 2;
    }
    ul, ol {
      padding-left: 1.5em;
      margin: $mt 0 $mb;
      li {
        p, ul, ol {
          margin: 0;
          li {
            p, ul, ol {
              margin: 0;
            }
          }
        }
      }
    }
    blockquote {
      color: #666;
      padding-left: 1em;
      margin: $mt 0 $mb;
      border-left: 5px solid #ddd;
      p {
        margin: 0;
      }
    }
    a {
      text-decoration: none;
      &:hover { text-decoration: underline; }
      &:visited { color: #6200ac; }
    }
    a.v-btn {
      text-decoration: none;
    }
    img {
      max-width: 100%;
      margin: $mt auto $mb;
      vertical-align: middle;
      filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .1));
    }
    code {
      box-shadow: none;
      font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
      &:before { content: none; }
      &:after { content: none; }
    }
    code.my-code {
      padding: .2em .4em .1em;
      color: $black;
      font-weight: 400;
    }
    // code block
    pre {
      margin: $mt (-$sheetPa) $mb;
      padding: 1em $sheetPa;
      code {
        font-size: .9em;
        line-height: 1.4;
        font-weight: 600;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
      display: block;
      overflow-x: scroll;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      font-size: 1em;
      tr th, tr td {
        padding: .5em 1em;
        border: 1px solid #E0E0E0;
      }
      tr th {
        font-size: 1em;
        background: #f5f5f5;
      }
    }
    u {
      text-decoration:none;
      background: linear-gradient(transparent 70%, #ff9a9e, #fad0c4);
    }
    .my-file {
      color: DarkGreen;
      font-weight: 600;
      padding: 0 .1em;
    }
  }
  // 599以下 ///////////////////////////////
  @media (max-width: 599px) {
    .my-sheet {
      margin-top: -24px;
      padding: $sheetPa 16px;
      border-top: $border;
    }
    h1.my-post-title {
      font-size: ($h1 - 0.5rem);
    }
    .my-post-body {
      h2 {
        font-size: ($h2 - .2em);
      }
      h3 {
        font-size: ($h2 - .4em);
      }
      h4 {
        font-size: ($h2 - .6em);
      }
      p, ul, ol, li, code {
        font-size: ($p - .125rem);
      }
      // code block
      pre {
        margin: $mt calc((100vw - 100%) / -2) $mb;
        padding: 1em calc((100vw - 100%) / 2);
      }
      table {
        font-size: .9em;
      }
    }
  }
}
</style>
