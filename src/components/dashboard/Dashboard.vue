<template>
  <div>
    <p class="leading-none">Dashboard</p>
  </div>
  
  <!-- tabs -->
  <div class="fixed bottom-0 left-0 w-full flex bg-primary-600 text-white">

    <!-- Dashboard -->
    <router-link to="/login" class="block text-center p-2 py-4 w-1/5">
      <msr-icon>dashboard</msr-icon>
      <p class="leading-none text-xxs mt-1">Login</p>
    </router-link>

    <!-- CheckIns -->
    <router-link to="/check-ins" class="block text-center p-2 py-4 w-1/5">
      <msr-icon>how_to_reg</msr-icon>
      <p class="leading-none text-xxs mt-1">Check-Ins</p>
    </router-link>

    <!-- Adv. Booking -->
    <router-link to="/bookings" class="block text-center p-2 py-4 w-1/5">
      <msr-icon>calendar_month</msr-icon>
      <p class="leading-none text-xxs mt-1">Bookings</p>
    </router-link>

    <!-- Room Status -->
    <router-link to="/room-status" class="block text-center p-2 py-4 w-1/5">
      <msr-icon>check_circle</msr-icon>
      <p class="leading-none text-xxs mt-1">Room Status</p>
    </router-link>

    <!-- Reports -->
    <router-link to="/reports" class="block text-center p-2 py-4 w-1/5">
      <msr-icon>summarize</msr-icon>
      <p class="leading-none text-xxs mt-1">Reports</p>
    </router-link>
  </div>
</template>