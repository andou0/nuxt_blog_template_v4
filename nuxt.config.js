// $ yarn generate実行時にenvを読み込むために本番環境でも有効にしておく
require('dotenv').config()
const primary = '#0053A3' // 'Contrast NG => #4080BE'

export default {
  mode: 'universal',
  head: {
    title: process.env.SITE_NAME,
    titleTemplate: `%s - ${process.env.SITE_NAME}`,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.BASE_DESC },
      { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:title', property: 'og:title', content: process.env.SITE_NAME },
      { hid: 'og:description', property: 'og:description', content: process.env.BASE_DESC },
      { hid: 'og:image', property: 'og:image', content: `${process.env.BASE_URL}/grobal.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: `@${process.env.TWITTER_ACCOUNT}` },
      { property: 'fb:app_id', content: process.env.FB_APP_ID }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon16.png' }
    ]
  },

  loading: { color: primary },

  css: [
    '~/assets/sass/main.scss'
  ],

  plugins: [
    // { src: 'plugins/vuetify', mode: 'client' },  // fontawesome
    'plugins/components',
    'plugins/filters',
    'plugins/inject'
  ],

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-adsense'
  ],

  env: {
    // meta
    BASE_URL: process.env.BASE_URL,
    SITE_NAME: process.env.SITE_NAME,
    BASE_DESC: process.env.BASE_DESC,
    // contentful
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    POSTLIMIT: process.env.POSTLIMIT,
    // google
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    // sns
    TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT,
    SLACK_LINK: process.env.SLACK_LINK,
    EMAIL: process.env.EMAIL
  },

  router: {
    middleware: [
      'getCategories',
      'getPosts'
    ]
  },

  build: {
    extend (config, ctx) {
    }
  },

  // Doc: https://www.npmjs.com/package/@nuxtjs/vuetify
  vuetify: {
    treeShake: true, // 開発環境でもcustomVariablesを有効にするフラグ
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      themes: {
        light: {
          primary,
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678',
          background: 'f6f6f4'
        }
      }
    }
  },

  // Doc: https://www.npmjs.com/package/@nuxtjs/google-analytics
  googleAnalytics: {
    id: process.env.GA_TRACKING_ID
    // debug mode
    // ,debug: {
    //   enabled: true,
    //   sendHitTask: true
    // }
  },

  // Doc: https://www.npmjs.com/package/@nuxtjs/google-adsense
  'google-adsense': {
    id: process.env.GA_ADSENSE_ID,
    analyticsUacct: process.env.GA_TRACKING_ID,
    analyticsDomainName: process.env.BASE_URL.replace(/^http(s)?:\/\/|\/+$/g, ''),
    test: process.env.NODE_ENV === 'development'
  },

  // Doc: https://www.npmjs.com/package/@nuxtjs/sitemap
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: [
      '/404*' // 404ページは除く
    ],
    routes: () => {
      const client = require('./plugins/contentful')
      return Promise.all([
        client.getEntries({ content_type: 'category' }),
        client.getEntries({ content_type: 'blogPost' })
      ]).then(([categories, posts]) => {
        console.log('Create Sitemap!!')
        return [
          ...categories.items.map(cat => `categories/${cat.fields.slug}`),
          ...posts.items.map(post => `posts/${post.fields.slug}`)
        ]
      })
    }
  },

  generate: {
    fallback: true,
    routes () {
      const client = require('./plugins/contentful')
      return Promise.all([
        client.getEntries({ content_type: 'category' }),
        client.getEntries({ content_type: 'blogPost' })
      ]).then(([categories, posts]) => {
        return [
          ...categories.items.map((cat) => {
            return { route: `categories/${cat.fields.slug}`, payload: cat }
          }),
          ...posts.items.map((post) => {
            return { route: `posts/${post.fields.slug}`, payload: post }
          })
        ]
      })
    }
  }
}
