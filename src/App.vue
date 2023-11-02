<template>
  <div class="relative">

    <!-- pages -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useModal } from './services/modal.js';
import { onMounted, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();
let route = useRoute();
let tabs = [
  '/',
  '/check-ins',
  '/room-status',
  '/bookings',
  '/reports',
]

let modal = useModal();
provide('modal', modal);

App.addListener('backButton', e => {

  // close any closables / modals first
  if (! modal.close()) {
    
    // if its a tab (main routes)
    if (tabs.some(path => (path === route.fullPath))) {

      // if its the default tab (dashboard)
      if (route.fullPath === '/') {
        App.exitApp();
      }

      // else go to default path (dashboard)
      else {
        router.push('/');
      }
    }

    // else go back in history
    else {
      router.go(-1);
    }
  }
})

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      modal.close();
    }
  });

  StatusBar.setBackgroundColor({
    color: '#F6FAFE',
  })

  StatusBar.setStyle({
    style: Style.Light,
  })
})
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