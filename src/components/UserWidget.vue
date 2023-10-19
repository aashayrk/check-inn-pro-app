<template>
  <dropdown-menu class="ml-2" v-if="authUser.user">
    <template #trigger>
      <div class="flex items-center">
        <div class="mr-2 text-right">
          <p class="leading-none" :title="authUser.user.username">{{ authUser.user.username }}</p>
          <p class="leading-none text-xs mt-1" :title="authUser.client.email_address">{{ truncate(authUser.client.email_address) }}</p>
        </div>
        <span class="btn btn-primary btn-round">
          <p class="leading-none text-3xl font-normal">{{ authUser.user.username.substring(0, 1).toUpperCase() }}</p>
        </span>
      </div>
    </template>
    <div>

      <!-- user profile -->
      <div class="row-item">
        <router-link to="/my-profile">
          <div class="flex justify-between items-center p-6 py-4">
            <div class="flex items-center">
              <msr-icon>person</msr-icon>
              <p class="leading-none ml-2">My Profile</p>
            </div>
            <msr-icon>arrow_forward</msr-icon>
          </div>
        </router-link>
      </div>

      <!-- logout -->
      <div class="row-item">
        <router-link to="/my-profile" class="row-item">
          <div class="flex justify-between items-center p-6 py-4">
            <div class="flex items-center">
              <msr-icon>logout</msr-icon>
              <p class="leading-none ml-2">Logout</p>
            </div>
            <msr-icon>arrow_forward</msr-icon>
          </div>
        </router-link>
      </div>
    </div>
  </dropdown-menu>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useUser } from '@/services/user.js';

let authUser = reactive(useUser());
let csrfToken = computed(() => {
  return document.querySelector('meta[name=csrf-token]').getAttribute('content');
});

function truncate(string, length = 16) {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }

  return string;
}
</script>