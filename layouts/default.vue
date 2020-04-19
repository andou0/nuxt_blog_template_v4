<template>
  <v-app>
    <nuxt :style="nuxtbody" />
    <my-footer />
  </v-app>
</template>

<script>
import myFooter from '~/components/shared/myFooter'

export default {
  components: {
    myFooter
  },
  data: () => ({
    nuxtbody: { flex: '1', '-webkit-flex': '1' }
  })
}
</script>
