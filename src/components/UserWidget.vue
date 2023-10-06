<template>
  <dropdown-menu size="lg" class="ml-2" v-if="authUser.user">
    <template #trigger>
      <div class="flex items-center">
        <span class="btn btn-primary btn-round">
          <p class="leading-none text-3xl font-black">{{ authUser.user.username.substring(0, 1).toUpperCase() }}</p>
        </span>
        <div class="ml-2 hidden md:block">
          <p class="leading-none" :title="authUser.user.username">{{ authUser.user.username }}</p>
          <p class="leading-none text-xs mt-1" :title="authUser.user.name">{{ truncate(authUser.user.name) }}</p>
        </div>
      </div>
    </template>
    <div class="p-2">

      <!-- user profile -->
      <a href="/my-profile" class="btn btn-transparent w-full">
        <msr-icon>person</msr-icon>
        <span>My Profile</span>
      </a>

      <!-- app profile -->
      <a href="/app-profile" class="btn btn-transparent w-full">
        <msr-icon>apartment</msr-icon>
        <span>App Profile</span>
      </a>

      <!-- logout -->
      <form action="/logout" method="POST">
        <input type="hidden" name="_token" :value="csrfToken">
        <button class="btn btn-transparent w-full" type="submit">
          <msr-icon>power_rounded</msr-icon>
          <span>Logout</span>
        </button>
      </form>
    </div>
  </dropdown-menu>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useUser } from '@/services/user';

let authUser = reactive(useUser());
let csrfToken = computed(() => {
  return document.querySelector('meta[name=csrf-token]').getAttribute('content');
});

function truncate(string, length = 8) {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }

  return string;
}
</script>