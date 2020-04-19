<template>
  <div class="my-card-content">
    <div class="px-4">
      <div class="my-align-center">
        <h1 class="my-h1">
          <!-- slot h1 -->
          <slot name="h1" />
        </h1>
        <v-spacer />
        <!-- slot header right -->
        <slot name="header-right" />
      </div>

      <h2 class="my-h2 my-text-grey py-2">
        <!-- slot h2 -->
        <slot name="h2" />
      </h2>
    </div>

    <div class="py-4">
      <!-- slot content -->
      <slot name="main-content" />
    </div>

    <div class="pa-4">
      <!-- slot footer -->
      <slot name="footer-content" />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.my-card-content {
  .my-h1 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: normal;
  }
  .my-h2 {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.375rem;
    letter-spacing: 0.0071428571em;
  }
}
</style>
