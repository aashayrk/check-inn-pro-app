<template>
  <div class="flex items-center justify-between mb-2">
      
    <!-- Back Button -->
    <div>
      <button @click="goBack()" class="btn btn-round btn-white btn-small">
        <msr-icon>arrow_back</msr-icon>
      </button>
    </div>

    <!-- Page Title -->
    <div class="p-2 pr-4">
      <p class="leading-none">{{ props.pageTitle ?? 'Page' }}</p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

let props = defineProps([
  'backTo',
  'pageTitle'
])

let router = useRouter();

function goBack() {
  router.go(-1);
}
</script>