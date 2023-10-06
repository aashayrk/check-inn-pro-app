<template>
  <div class="relative">

    <!-- pages -->
    <div>
      <router-view v-slot="{ Component }">
        <transition name="fade-scale">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  @apply transition opacity-100 duration-500;
  animation-timing-function: ease-in-out;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  @apply opacity-25;
}
</style>