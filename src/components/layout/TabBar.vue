<template>
  <div class="fixed bottom-0 right-0 w-full md:max-w-md p-2">
    <div class="bg-white shadow-md" :class="props.show ? 'rounded-t-xl -mb-2 pb-2' : 'rounded-xl'">
      <slot></slot>
    </div>

    <!-- tabs -->
    <transition>
      <div class="flex bg-primary-700 text-white rounded-xl shadow-md" v-if="props.show">

        <!-- Dashboard -->
        <router-link to="/" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/'}">
          <msr-icon size="lg">dashboard</msr-icon>
          <p class="leading-none text-xxs mt-2 font-bold">Dashboard</p>
        </router-link>
    
        <!-- CheckIns -->
        <router-link to="/check-ins" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/check-ins'}">
          <msr-icon size="lg">how_to_reg</msr-icon>
          <p class="leading-none text-xxs mt-2 font-bold">Check-Ins</p>
        </router-link>
    
        <!-- Room Status -->
        <router-link to="/room-status" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/room-status'}">
          <msr-icon size="lg">check_circle</msr-icon>
          <p class="leading-none text-xxs mt-2 font-bold">Room Status</p>
        </router-link>
        
        <!-- Adv. Booking -->
        <router-link to="/bookings" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/bookings'}">
          <msr-icon size="lg">calendar_month</msr-icon>
          <p class="leading-none text-xxs mt-2 font-bold">Bookings</p>
        </router-link>
    
        <!-- Reports -->
        <router-link to="/reports" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/reports'}">
          <msr-icon size="lg">summarize</msr-icon>
          <p class="leading-none text-xxs mt-2 font-bold">Reports</p>
        </router-link>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

let props = defineProps([
  'show'
])

let route = useRoute();
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