<template>
  <div class="my-drawer">
    <v-app-bar
      app
      tite
      :clipped-left="isPointDown"
      :clipped-right="!isPointDown"
      :hide-on-scroll="hideOnScroll"
      :scroll-threshold="barHeight"
      :height="barHeight"
      elevate-on-scroll
      color="white"
    >
      <my-container #padding-content>
        <v-row class="my-align-center ma-0">
          <v-app-bar-nav-icon
            :class="hiddenClass"
            aria-hidden="false"
            aria-label="nav"
            @click.stop="drawer = !drawer"
          />
          <nuxt-link
            to="/"
            class="my-site-title my-link-black"
          >
            {{ siteName }}
          </nuxt-link>
          <v-spacer />
          <search-box />
          <v-toolbar-items
            class="hidden-ipad-and-down"
            :style="{ height: `${barHeight}px` }"
          >
            <v-btn
              v-for="(cat, i) in categories"
              :key="i"
              text
              exact
              class="my-font-bold"
              :to="linkTo('categories', cat)"
            >
              {{ cat.fields.name }}
            </v-btn>
          </v-toolbar-items>
          <div
            class="hidden-ipad-and-up"
            style="width: 48px"
          >
            <menu-btn :categories="categories" />
          </div>
        </v-row>
      </my-container>
    </v-app-bar>

    <my-container #content>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        floating
        :right="!isPointDown"
        :mobile-break-point="breakpoint"
        :color="drawerlayout.color"
        :width="drawerlayout.width"
        :style="drawerlayout.style"
      >
        <v-card-text :class="hiddenClass">
          <v-btn
            block
            text
            @click.stop="drawer = false"
          >
            <v-icon
              aria-hidden="false"
              aria-label="close"
            >
              mdi-chevron-left
            </v-icon>
            close
          </v-btn>
        </v-card-text>
        <div class="my-drawer-content">
          <ad-fixed />
          <slot name="drawer" />
        </div>
      </v-navigation-drawer>
      <v-content>
        <loading v-if="loading" />
        <!-- v-else => _post.vue/Syntaxhighlight(Prism) NG!! d-none => OK!! -->
        <div :class="['my-main-content', { 'd-none': loading }]">
          <slot name="main" />
          <ad-responsive v-if="!loading" />
        </div>
      </v-content>
    </my-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import searchBox from '../ui/searchBox'
import menuBtn from '../ui/menuBtn'
import loading from '../ui/loading'
import adFixed from '../ui/adsense/fixed'
import adResponsive from '../ui/adsense/responsive'

export default {
  components: {
    searchBox,
    menuBtn,
    loading,
    adFixed,
    adResponsive
  },
  props: {
    hideOnScroll: {
      type: Boolean,
      default: false
    }
  },
  data ({ $store }) {
    return {
      siteName: process.env.SITE_NAME,
      drawer: null,
      breakpoint: 960,
      hiddenClass: 'hidden-md-and-up',
      barHeight: $store.state.layout.toolbarHeight,
      loading: false
    }
  },
  computed: {
    ...mapState(['layout']),
    ...mapGetters(['linkTo']),
    categories () {
      return this.$store.getters.mainCategories()
    },
    windowWidth () {
      return this.$vuetify.breakpoint.width
    },
    isPointDown () {
      return this.breakpoint > this.windowWidth
    },
    isMaxWidthUp () {
      return this.windowWidth > this.layout.width
    },
    drawerlayout () {
      const width = (this.layout.drawerWidth + this.layout.padding * 2)
      const color = this.isPointDown ? 'background' : 'transparent'
      const right = this.isMaxWidthUp
        ? Math.round((this.windowWidth - this.layout.width) / 2) : 0
      return { width, color, style: { right: `${right}px` } }
    }
  },
  created () {
    this.loading = true
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="scss">
$py: 48px;
$px: 16px;

.my-drawer {
  .v-toolbar__content {
    padding: 4px 0 !important;
  }
  a.my-site-title {
    font-size: .875rem;
    letter-spacing: 0.9px;
    text-decoration: none;
    font-weight: 600;
  }
  .my-main-content,
  .my-drawer-content {
    padding: $py $px;
  }
  // 959以下
  @media (max-width: 959px) {
    .my-drawer-content {
      padding: 0 $px $py;
    }
    .my-main-content {
      max-width: (768px + $px * 2);
      margin: 0 auto;
    }
  }
  // 599以下
  @media (max-width: 599px) {
    .my-main-content {
      padding: ($py / 2) 0 $py;
    }
  }
}
</style>
