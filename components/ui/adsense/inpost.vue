<template>
  <div>
    <adsbygoogle
      v-if="env === 'production'"
      :ad-slot="slot"
      ad-layout="in-article"
      ad-format="fluid"
      class="adslot-inpost"
    />
    <div
      v-else
      class="adslot-inpost adslot-div"
      style="height: 176px;"
    >
      AD
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slot: '0000000000',
      env: process.env.NODE_ENV
    }
  }
}
</script>

<style lang="scss" scoped>
.adslot-inpost {
  display: block;
  text-align: center;
}
</style>
