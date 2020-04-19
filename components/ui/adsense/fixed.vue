<template>
  <div class="d-none d-md-block">
    <adsbygoogle
      v-if="env === 'production'"
      :ad-slot="slot"
      ad-format=""
      class="adslot-fixed"
    />
    <div
      v-else
      class="adslot-fixed adslot-div"
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
.adslot-fixed {
  display: block;
  width: 300px;
  height: 250px;
  margin: 0 auto 16px;
}
</style>
