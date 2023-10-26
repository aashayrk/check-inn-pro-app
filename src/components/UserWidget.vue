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
        <router-link to="/user-profile">
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
        <modal-dialog dialog-title="Confirm Logout">
          <template #trigger>
            <div class="flex justify-between items-center p-6 py-4">
              <div class="flex items-center">
                <msr-icon>logout</msr-icon>
                <p class="leading-none ml-2">Logout</p>
              </div>
              <msr-icon>arrow_forward</msr-icon>
            </div>
          </template>
          <template #default="defaultProps">
            <div class="p-6">
              <p class="leading-tight">Are you sure you want to Logout!</p>
              <div class="flex justify-end mt-6">
                <button class="btn" @click="defaultProps.close()">Cancel</button>
                <button class="btn ml-1" @click="logout(defaultProps)">
                  <span>Yes, Log me out</span>
                  <msr-icon>arrow_forward</msr-icon>
                </button>
              </div>
            </div>
          </template>
        </modal-dialog>
      </div>
    </div>
  </dropdown-menu>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useUser } from '@/services/user.js';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';

let authUser = reactive(useUser());

async function logout(dialog) {
  Preferences.clear();
  dialog.close();
  App.exitApp();
}

function truncate(string, length = 16) {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }

  return string;
}
</script>