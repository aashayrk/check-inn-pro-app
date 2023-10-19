<template>
  <div class="flex items-center justify-between bg-primary-50 mb-2 rounded-b-xl sticky top-0 shadow-md z-10 p-2">
    <div>

      <!-- main menu -->
      <client-sidebar v-if="props.menu">
        <template #trigger>
          <span class="btn btn-transparent">
            <msr-icon>menu</msr-icon>
          </span>
        </template>
      </client-sidebar>

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
    <div>
      <user-widget></user-widget>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import UserWidget from '@/components/UserWidget.vue';
import ClientSidebar from '@/components/ClientSidebar.vue';

let props = defineProps([
  'menu',
  'pageTitle'
])

let router = useRouter();

function goBack() {
  router.go(-1);
}
</script>