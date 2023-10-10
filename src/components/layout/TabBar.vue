<template>
  <div class="fixed bottom-0 right-0 w-full md:max-w-md p-2">
    <div class="flex bg-primary-700 text-white rounded-xl shadow-md">

      <!-- Dashboard -->
      <router-link to="/" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/'}">
        <msr-icon>dashboard</msr-icon>
        <p class="leading-none text-xxs mt-1 font-bold">Dashboard</p>
      </router-link>
  
      <!-- CheckIns -->
      <router-link to="/check-ins" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/check-ins'}">
        <msr-icon>how_to_reg</msr-icon>
        <p class="leading-none text-xxs mt-1 font-bold">Check-Ins</p>
      </router-link>
  
      <!-- Room Status -->
      <router-link to="/room-status" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/room-status'}">
        <msr-icon>check_circle</msr-icon>
        <p class="leading-none text-xxs mt-1 font-bold">Room Status</p>
      </router-link>
      
      <!-- Adv. Booking -->
      <router-link to="/bookings" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/bookings'}">
        <msr-icon>calendar_month</msr-icon>
        <p class="leading-none text-xxs mt-1 font-bold">Bookings</p>
      </router-link>
  
      <!-- Reports -->
      <router-link to="/reports" class="block text-center p-2 py-4 w-1/5" :class="{'text-amber-400': route.path === '/reports'}">
        <msr-icon>summarize</msr-icon>
        <p class="leading-none text-xxs mt-1 font-bold">Reports</p>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

let route = useRoute();
</script>