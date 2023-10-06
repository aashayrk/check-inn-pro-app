<template>
  <div class="flex items-center justify-between mb-2">
      
    <!-- Back Button -->
    <div v-if="props.backTo" class="">
      <router-link :to="props.backTo" class="btn btn-round btn-white btn-small">
        <msr-icon>arrow_back</msr-icon>
      </router-link>
    </div>

    <!-- Page Title -->
    <div class="p-2 pr-4">
      <p class="leading-none">{{ props.pageTitle ?? 'Page' }}</p>
    </div>
  </div>
</template>
<script setup>
let props = defineProps([
  'backTo',
  'pageTitle'
])
</script>