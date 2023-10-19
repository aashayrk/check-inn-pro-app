<template>
  <transition appear>
    <div class="min-h-screen overscroll-y-contain w-full">
      
      <!-- content -->
      <div class="relative" :class="{'pb-[80px]': props.tabBar}">
  
        <!-- dummy for page scroll detection -->
        <div class="absolute top-0 left-0 w-full h-96 dummy-0 -z-50"></div>
        <!-- <div class="absolute bottom-0 left-0 bg-stone-200 w-full h-96 dummy-1 -z-50"></div> -->
        <slot></slot>
      </div>
      
      <!-- tabs bar -->
      <tab-bar v-if="props.tabBar" :show="showTabBar" class="mt-2">
        
        <!-- provisioned area above tab-bar -->
        <slot name="bottom"></slot>
      </tab-bar>
    </div>
  </transition>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import TabBar from './TabBar.vue';

let props = defineProps([
  'tabBar'
])

let pageObserver = null;
let showTabBar = ref(true);

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
  // pageObserver.observe(document.querySelector('.dummy-1'));
}

onMounted(() => {
  // setupObserver();
})
</script>
<style scoped>
.v-enter-active, .v-leave-active {
  @apply transition opacity-100 translate-y-0 duration-150;
}
.v-enter-from, .v-leave-to {
  @apply transition opacity-0 translate-y-4 duration-150;
}
</style>