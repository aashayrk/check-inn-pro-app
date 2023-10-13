<template>
  <div>

    <!-- screen filler -->
    <div class="fixed inset-0 w-full h-full bg-stone-200 -z-50"></div>
    
    <!-- content -->
    <div class="content p-2 relative">

      <!-- dummy for page scroll detection -->
      <div class="absolute top-0 left-0 bg-stone-200 w-full h-96 dummy-0 -z-50"></div>
      <!-- <div class="absolute bottom-0 left-0 bg-stone-200 w-full h-96 dummy-1 -z-50"></div> -->
      <slot></slot>
    </div>
    
    <!-- tabs bar -->
    <tab-bar v-if="props.tabBar" :show="showTabBar" class="mt-2">
      
      <!-- provisioned area above tab-bar -->
      <slot name="bottom"></slot>
    </tab-bar>
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
  // pageObserver.observe(document.querySelector('.dummy-1'));
}

onMounted(() => {
  setupObserver();
})
</script>