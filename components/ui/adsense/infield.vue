<template>
  <div>
    <adsbygoogle
      v-if="env === 'production'"
      :ad-slot="slot"
      ad-format="fluid"
      ad-layout-key="-fn-38+5i-ir+ca"
      class="adslot-infield"
    />
    <div
      v-else
      class="adslot-infield adslot-div"
      style="height: 180px;"
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
.adslot-infield {
  display: block;
}
</style>
