<template>

  <!-- trigger -->
  <button @click="open()">    
    <slot name="trigger"></slot>
  </button>

  <!-- overlay -->
  <transition name="fade-in">
    <div class="fixed inset-0 bg-black bg-opacity-25 z-10" v-if="isOpen" @click="close()"></div>
  </transition>

  <!-- menu -->
  <transition name="slide-in">
    <aside class="fixed top-0 left-0 h-full w-full max-w-[260px] md:flex flex-col bg-primary-700 overflow-y-auto z-20" v-if="isOpen">
      <div class="p-6">
        <img src="/images/check-inn-pro-logo.svg" alt="Check-Inn Pro Logo" class="w-16 h-auto">
        <p class="leading-none font-black text-2xl text-white font-logo mt-2">Check-Inn Pro</p>
        <p class="leading-none mt-2 text-xs text-primary-200" v-if="client">{{ client.name }}</p>
      </div>
      <div>
  
        <!-- Dashboard -->
        <button @click="navigate('/')" class="flex w-full row-item">
          <div class="p-6 py-4 flex items-center" :class="isCurrent('/') ? 'text-yellow-500' : 'text-primary-300'">
            <msr-icon>dashboard</msr-icon>
            <p class="leading-none ml-2">Dashboard</p>
          </div>
        </button>
  
        <!-- checkIns -->
        <simple-toggle @toggle="toggle('checkIns')" :is-open="toggleStatus.checkIns" class="row-item">
          <template #title="titleProps">
            <div class="flex justify-between items-center cursor-pointer p-6 py-4">
              <p class="leading-none text-primary-300">Check Ins</p>
              <div class="text-primary-300">
                <msr-icon v-if="! toggleStatus.checkIns">expand_more</msr-icon>
                <msr-icon v-if="toggleStatus.checkIns">expand_less</msr-icon>
              </div>
            </div>
          </template>
          <template #default="simpleProps">
            <div class="my-4">
  
              <!-- Check Ins -->
              <button @click="navigate('/check-ins')" class="flex w-full">
                <div class="p-6 py-2 flex items-center relative" :class="isCurrent('/check-ins') ? 'text-yellow-500' : 'text-primary-300'">
                  <msr-icon>how_to_reg</msr-icon>
                  <p class="leading-none ml-2">All Check Ins</p>
                </div>
              </button>
  
              <!-- Old Bills -->
              <button @click="navigate('/old-bills')" class="flex w-full">
                <div class="p-6 py-2 flex items-center" :class="isCurrent('/old-bills') ? 'text-yellow-500' : 'text-primary-300'">
                  <msr-icon>how_to_reg</msr-icon>
                  <p class="leading-none ml-2">Old Bills</p>
                </div>
              </button>
            </div>
          </template>
        </simple-toggle>
  
        <!-- Adv. Booking -->
        <simple-toggle @toggle="toggle('advanceBooking')" :is-open="toggleStatus.advanceBooking" v-if="userAbilities.allowSome('view,bookings|view,otaBookings')" class="row-item">
          <template #title="titleProps">
            <div class="flex justify-between items-center cursor-pointer p-6 py-4">
              <p class="leading-none text-primary-300">Adv. Booking</p>
              <div class="text-primary-300">
                <msr-icon v-if="! toggleStatus.advanceBooking">expand_more</msr-icon>
                <msr-icon v-if="toggleStatus.advanceBooking">expand_less</msr-icon>
              </div>
            </div>
          </template>
          <template #default="simpleProps">
            <div class="my-4">
  
              <!-- Overall Bookings -->
              <button @click="navigate('/bookings')" class="flex w-full">
                <div class="p-6 py-2 flex items-center" :class="isCurrent('/bookings') ? 'text-yellow-500' : 'text-primary-300'">
                  <msr-icon>calendar_month</msr-icon>
                  <p class="leading-none ml-2">Overall Bookings</p>
                </div>
              </button>
  
              <!-- Today's Arrivals -->
              <button @click="navigate('/todays-arrivals')" class="flex w-full">
                <div class="p-6 py-2 flex items-center" :class="isCurrent('/todays-arrivals') ? 'text-yellow-500' : 'text-primary-300'">
                  <msr-icon>today</msr-icon>
                  <p class="leading-none ml-2">Today's Arrivals</p>
                </div>
              </button>
  
              <!-- Cancelled Bookings -->
              <button @click="navigate('/cancelled-bookings')" class="flex w-full">
                <div class="p-6 py-2 flex items-center" :class="isCurrent('/cancelled-bookings') ? 'text-yellow-500' : 'text-primary-300'">
                  <msr-icon>event_busy</msr-icon>
                  <p class="leading-none ml-2">Cancelled Bookings</p>
                </div>
              </button>
            </div>
          </template>
        </simple-toggle>
  
        <!-- Room Status -->
        <button @click="navigate('/room-status')" class="row-item flex w-full">
          <div class="p-6 py-4 flex items-center" :class="isCurrent('/room-status') ? 'text-yellow-500' : 'text-primary-300'">
            <msr-icon>check_circle</msr-icon>
            <p class="leading-none ml-2">Room Status</p>
          </div>
        </button>
  
        <!-- Reports -->
        <button @click="navigate('/reports')" class="row-item flex w-full">
          <div class="p-6 py-4 flex items-center" :class="isCurrent('/reports') ? 'text-yellow-500' : 'text-primary-300'">
            <msr-icon>summarize</msr-icon>
            <p class="leading-none ml-2">Reports</p>
          </div>
        </button>
      </div>
    </aside>
  </transition>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';
import { useUser } from '@/services/user.js';
import { App } from '@capacitor/app';

let isOpen = ref(false);
let router = useRouter();
let route = useRoute();
let userAbilities = useUserAbilities();
let {user, client, hasRole, isAmong} = useUser();
let req = reactive(useApi());
let statusReq = reactive(useApi());
let toggleStatus = reactive({
  'checkIns': false,
  'advanceBooking': false,
  'data': false,
  'setup': false,
  'templates': false,
  'reports': false
});

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function toggle(item) {
  toggleStatus[item] = ! toggleStatus[item];

  req.send(
    `/api/client/v1/menu-items/${item}`,
    'PATCH',
    { 
      active: toggleStatus[item] ? 1 : 0
    }
  );
}

function navigate(path) {
  isOpen.value = false;
  router.push(path);
}

function isCurrent(path) {
  return route.path === path;
}

onMounted(() => {
  statusReq.send(
    '/api/client/v1/menu-items',
  )
  .then (res => {
    if (res) {
      for (let toggle in toggleStatus) {
        let item = res.items.find(i => i.name === toggle);

        if (item) {
          toggleStatus[toggle] = (item.active === 1) ? true : false;
        }
      }
    }
  });
});
</script>
<style scoped>
.fade-in-enter-active, .fade-in-leave-active {
  @apply transition duration-150 opacity-100;
} 
.fade-in-enter-from, .fade-in-leave-to {
  @apply transition duration-150 opacity-0;
}
.slide-in-enter-active, .slide-in-leave-active {
  @apply transition duration-150 opacity-100 translate-x-0;
} 
.slide-in-enter-from, .slide-in-leave-to {
  @apply transition duration-150 opacity-0 -translate-x-24;
}

.row-item + .row-item {
  @apply border-t border-primary-600;
}
</style>