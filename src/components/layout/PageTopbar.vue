<template>
  <div class="flex items-center justify-between mb-2">
    <div>

      <!-- menu button -->
      <button class="btn btn-round btn-transparent" v-if="props.menu">
        <msr-icon>menu</msr-icon>
      </button>

      <!-- page info -->
      <div class="flex items-center" v-else>

        <!-- Back Button -->
        <button @click="goBack()" class="btn btn-round btn-transparent">
          <msr-icon>arrow_back</msr-icon>
        </button>
        
        <!-- Page Title -->
        <div class="px-2">
          <p class="leading-none">{{ props.pageTitle ?? 'Page' }}</p>
        </div>
      </div>
    </div>

    <!-- client info -->
    <div class="flex items-center">
      <div class="mr-2 text-right">
        <p class="leading-none">Parth Resorts</p>
        <p class="leading-none text-xs mt-1">jagdish</p>
      </div>
      <button class="btn btn-primary btn-round">
        <span class="text-3xl font-normal">S</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

let props = defineProps([
  'menu',
  'pageTitle'
])

let router = useRouter();

function goBack() {
  router.go(-1);
}
</script>