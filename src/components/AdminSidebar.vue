<template>
  <aside class="fixed top-0 left-0 h-full hidden w-3/4 md:w-60 md:flex flex-col bg-primary-700 overflow-y-auto">
    <div class="p-6 flex flex-col">
      <img src="/images/check-inn-pro-logo.svg" alt="Check-Inn Pro Logo" class="w-24 h-auto">
      <p class="leading-none font-black text-2xl text-white font-logo mt-2">Check-Inn Pro</p>
    </div>
    <div class="p-2">

      <!-- dashboard -->
      <a href="/admin/dashboard" class="btn btn-transparent hover:bg-primary-600 hover:text-white text-base" :class="isSelected('/dashboard') ? 'text-yellow-500' : 'text-primary-400'">
        <span class="flex-grow">Dashboard</span>
      </a>

      <!-- clients -->
      <a href="/admin/clients" class="btn btn-transparent hover:bg-primary-600 hover:text-white text-base" :class="isSelected('/clients') ? 'text-yellow-500' : 'text-primary-400'">
        <span class="flex-grow">Clients</span>
      </a>

      <!-- Users -->
      <a href="/admin/users" class="btn btn-transparent hover:bg-primary-600 hover:text-white text-base" :class="isSelected('/users') ? 'text-yellow-500' : 'text-primary-400'">
        <span class="flex-grow">System Users</span>
      </a>

      <simple-toggle @toggle="toggle('config')" :is-open="toggleStatus.config">
        <template #title="titleProps">
          <div class="flex justify-between items-center cursor-pointer h-12 px-4">
            <p class="leading-none font-bold text-primary-400">Config</p>
            <div class="text-primary-400">
              <msr-icon v-if="! toggleStatus.config">expand_more</msr-icon>
              <msr-icon v-if="toggleStatus.config">expand_less</msr-icon>
            </div>
          </div>
        </template>
        <template #default="simpleProps">
          <div class="mb-8">

            <!-- Emails -->
            <a href="/admin/mail-configs" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/mail-configs')}">
              <span class="material-icons-round">email</span>
              <span class="flex-grow mx-4">Emails</span>
            </a>

            <!-- Channel Manager -->
            <!-- <a href="/admin/channel-managers" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/channel-managers')}">
              <span class="material-icons-round">email</span>
              <span class="flex-grow mx-4">Channel Manager</span>
            </a> -->
          </div>
        </template>
      </simple-toggle>
    </div>
  </aside>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';
import { useUser } from '@/services/user.js';

let userAbilities = useUserAbilities();
let authUser = useUser();
let req = reactive(useApi());
let statusReq = reactive(useApi());
let toggleStatus = reactive({
  'frontOffice': false,
  'advanceBooking': false,
  'data': false,
  'setup': false,
  'templates': false,
  'reports': false
});

function navigate(path = '/') {
  window.location.href = path;
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

function isSelected(path) {
  let exp = `${path}`;
  return window.location.href.match(exp);
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