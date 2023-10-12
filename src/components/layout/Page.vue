<template>
  <div class="flex flex-col w-full min-h-screen bg-stone-200 overflow-y-auto">
    
    <!-- content -->
    <div class="content p-2 relative" :class="{'pb-24': props.tabBar}">

      <!-- dummy for page scroll detection -->
      <div class="absolute top-0 left-0 bg-stone-200 w-full h-96 dummy-0 -z-50"></div>
      <div class="absolute bottom-0 left-0 bg-stone-200 w-full h-96 dummy-1 -z-50"></div>
      <slot></slot>
    </div>

    <!-- tabs bar -->
    <transition>
      <tab-bar v-if="props.tabBar && showTabBar"></tab-bar>
    </transition>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import TabBar from './TabBar.vue';

let props = defineProps([
  'tabBar'
])

let pageObserver = null;
let showTabBar = ref(false);

function setupObserver() {

  // setup intersection observer
  pageObserver = reactive(
    new IntersectionObserver(
      (entries, observer) => {
        showTabBar.value = entries.some(entry => entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    )
  )
  
  pageObserver.observe(document.querySelector('.dummy-0'));
  pageObserver.observe(document.querySelector('.dummy-1'));
}

onMounted(() => {
  setupObserver();
})
</script>

<style scoped>
.v-enter-active, .v-leave-active {
  @apply transition duration-300 opacity-100 translate-y-0;
} 
.v-leave-to {
  @apply transition opacity-0 translate-y-4;
}
.v-enter-from {
  @apply transition opacity-0;
}
</style>