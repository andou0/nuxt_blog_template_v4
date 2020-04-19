<template>
  <div>
    <adsbygoogle
      v-if="env === 'production'"
      :ad-slot="slot"
      ad-format="auto"
      data-full-width-responsive="true"
      class="adslot-responsive"
    />
    <div
      v-else
      class="adslot-responsive adslot-div"
      style="height: 280px;"
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
$px: 16px;
$drawer: 300px;

.adslot-responsive {
  display: block;
  margin: 16px auto;
  @media (max-width: 599px) {
    min-width: 300px;
    max-width: 599px;
  }
  @media screen and (600px <= width < 960px) {
    min-width: (600px - ($px * 2));
    max-width: 768px;
  }
  @media screen and (min-width: 960px) {
    min-width: (960px - ($drawer + $px * 4));
    max-width: 916px;
  }
}
</style>
