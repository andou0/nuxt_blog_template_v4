<template>
  <div class="text-center my-4">
    <template v-for="n in 2">
      <adsbygoogle
        v-if="env === 'production'"
        :key="`ad-${n}`"
        :ad-slot="slot"
        ad-format="auto"
        data-full-width-responsive="true"
        class="adslot-inline"
      />
      <div
        v-else
        :key="`div-${n}`"
        class="adslot-inline adslot-div"
      >
        AD
      </div>
    </template>
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
.adslot-inline {
  display: inline-block !important;
  @media (max-width: 335px) { width: 300px; height: 250px; }
  @media (min-width: 336px) { width: 336px; height: 280px; }
}
</style>
