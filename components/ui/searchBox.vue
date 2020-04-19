<template>
  <div>
    <div class="hidden-xs-only">
      <v-form
        :height="height"
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="setQuery"
          hide-details
          placeholder="キーワードを入力"
          dense
          class="px-2"
        />
      </v-form>
    </div>

    <div class="hidden-sm-and-up">
      <v-btn
        icon
        @click.stop="dialog = true"
      >
        <v-icon
          aria-hidden="false"
          aria-label="search"
        >
          mdi-magnify
        </v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="332"
      >
        <v-card>
          <v-card-title />
          <v-card-text>
            <v-form
              @submit.prevent="submit"
            >
              <v-text-field
                v-model="setQuery"
                placeholder="記事を検索する"
                autofocus
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data ({ $store }) {
    return {
      height: $store.state.layout.toolbarHeight,
      dialog: false
    }
  },
  computed: {
    query () {
      return this.$store.state.query
    },
    setQuery: {
      get () { return this.query },
      set (val) { return this.$store.dispatch('getQuery', val) }
    },
    searchValid () {
      return !!this.query && // 入力必須
        !/^\s+$/.test(this.query) && // 空白のみ禁止
        this.$route.query.q !== this.query // 値の変化
    }
  },
  methods: {
    submit () {
      if (this.searchValid) {
        this.dialog = false
        this.$router.push({ path: '/search', query: { q: this.query } })
      }
    }
  }
}
</script>
