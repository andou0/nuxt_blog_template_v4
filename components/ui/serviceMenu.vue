<template>
  <div v-if="posts.length">
    <div class="my-title">
      力になれること
    </div>
    <div class="my-text-content">
      私自身が独学でプログラミングを勉強してきたので、一人で学び続ける苦しみは痛いほど分かります。そこで、当時の私がこんなのあったら良いのにな、と思っていたサービスを立ち上げました。周りに質問できる人がいない、答えの調べ方が分からない、ここを聞きたいだけなのにスクールは高額すぎる...。そんな方に向けた単発・短期間メンターサービスを行っています。下の{{ category.fields.name }}へお進みください。
    </div>
    <div class="my-title">
      {{ category.fields.name }}
    </div>
    <ul class="my-list my-2">
      <li
        v-for="(post, i) in posts"
        :key="`post-${i}`"
        class="my-subtitle"
      >
        <nuxt-link
          :to="$store.getters.linkTo('posts', post)"
          class="my-link"
        >
          {{ post.fields.title }}
          <small v-if="post.fields.subTitle">
            {{ post.fields.subTitle }}
          </small>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    category () {
      return this.$store.getters.categoriesFind({ slug: 'service' })
    },
    posts () {
      return this.category ? this.$store.getters.postsWhere({ category: this.category }) : []
    }
  }
}
</script>
