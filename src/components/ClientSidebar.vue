<template>
  <aside class="fixed top-0 left-0 h-full hidden w-3/4 md:w-60 md:flex flex-col bg-primary-700 overflow-y-auto">
    <div class="p-6">
      <img src="/images/check-inn-pro-logo.svg" alt="Check-Inn Pro Logo" class="w-24 h-auto">
      <p class="leading-none font-black text-2xl text-white font-logo mt-2">Check-Inn Pro</p>
      <p class="leading-none mt-2 text-xs text-primary-200" v-if="client">{{ client.name }}</p>
      <!-- <p class="leading-none text-xs mt-1 text-primary-200 break-all" v-if="client">{{ client.email_address }}</p> -->
    </div>
    <div class="p-2">

      <!-- dashboard -->
      <a href="/dashboard" class="btn btn-transparent hover:bg-primary-600 hover:text-white text-base" :class="isSelected('/dashboard') ? 'text-yellow-500' : 'text-primary-400'">
        <!-- <span class="material-icons-round">dashboard</span> -->
        <span class="flex-grow">Dashboard</span>
      </a>

      <simple-toggle @toggle="toggle('frontOffice')" :is-open="toggleStatus.frontOffice" v-if="userAbilities.allowSome('view,checkIns|viewOldBills,checkIns|view,roomStatus|view,roomChart|view,roomBlocking|view,roomCleaning')">
        <template #title="titleProps">
          <div class="flex justify-between items-center cursor-pointer h-12 px-4">
            <p class="leading-none font-bold text-primary-400">Front Office</p>
            <div class="text-primary-400">
              <msr-icon v-if="! toggleStatus.frontOffice">expand_more</msr-icon>
              <msr-icon v-if="toggleStatus.frontOffice">expand_less</msr-icon>
            </div>
          </div>
        </template>
        <template #default="simpleProps">
          <div class="mb-8">

            <!-- checkins -->
            <a href="/check-ins" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/check-ins')}" v-if="userAbilities.allow('view', 'checkIns')">
              <span class="material-icons-round">how_to_reg</span>
              <span class="flex-grow mx-4">Check-Ins</span>
            </a>

            <!-- old bills -->
            <a href="/old-bills" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/old-bills')}" v-if="userAbilities.allow('viewOldBills', 'checkIns')">
              <span class="material-icons-round">how_to_reg</span>
              <span class="flex-grow mx-4">Old Bills</span>
            </a>

            <!-- room status -->
            <a href="/room-status" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/room-status')}" v-if="userAbilities.allow('view', 'roomStatus')">
              <span class="material-icons-round">check_circle</span>
              <span class="flex-grow mx-4">Room Status</span>
            </a>

            <!-- room chart -->
            <a href="/room-chart" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/room-chart')}" v-if="userAbilities.allow('view', 'roomChart')">
              <span class="material-icons-round">table_chart</span>
              <span class="flex-grow mx-4">Room Chart</span>
            </a>

            <!-- room blocking -->
            <a href="/room-blocking" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/room-blocking')}" v-if="userAbilities.allow('view', 'roomBlocking')">
              <span class="material-icons-round">block</span>
              <span class="flex-grow mx-4">Room Blocking</span>
            </a>

            <!-- room cleaning -->
            <a href="/room-cleaning" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/room-cleaning')}" v-if="userAbilities.allow('view', 'roomCleaning')">
              <span class="material-icons-round">cleaning_services</span>
              <span class="flex-grow mx-4">Room Cleaning</span>
            </a>
          </div>
        </template>
      </simple-toggle>

      <!-- adv booking -->
      <simple-toggle @toggle="toggle('advanceBooking')" :is-open="toggleStatus.advanceBooking" v-if="userAbilities.allowSome('view,bookings|view,otaBookings')">
        <template #title="titleProps">
          <div class="flex justify-between items-center cursor-pointer h-12 px-4">
            <p class="leading-none font-bold text-primary-400">Adv. Booking</p>
            <div class="text-primary-400">
              <msr-icon v-if="! toggleStatus.advanceBooking">expand_more</msr-icon>
              <msr-icon v-if="toggleStatus.advanceBooking">expand_less</msr-icon>
            </div>
          </div>
        </template>
        <template #default="simpleProps">
          <div class="mb-8">

            <!-- bookings -->
            <a href="/bookings/overall-bookings" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('bookings/overall-bookings')}" v-if="userAbilities.allow('view', 'bookings')">
              <span class="material-icons-round">calendar_month</span>
              <span class="flex-grow mx-4">Overall Bookings</span>
            </a>

            <!-- today's arrivals -->
            <a href="/bookings/todays-arrivals" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('bookings/todays-arrivals')}" v-if="userAbilities.allow('view', 'bookings')">
              <span class="material-icons-round">today</span>
              <span class="flex-grow mx-4">Today's Arrivals</span>
            </a>

            <!-- cancelled bookings -->
            <a href="/bookings/cancelled" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('bookings/cancelled')}" v-if="userAbilities.allow('view', 'bookings')">
              <span class="material-icons-round">event_busy</span>
              <span class="flex-grow mx-4">Cancelled Bookings</span>
            </a>

            <!-- ota bookings -->
            <a href="/ota-bookings" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('ota-bookings')}" v-if="userAbilities.allow('view', 'bookings')">
              <span class="material-icons-round">calendar_month</span>
              <span class="flex-grow mx-4">OTA Bookings</span>
            </a>
          </div>
        </template>
      </simple-toggle>

      <!-- reports -->
      <a href="/reports" class="btn btn-transparent hover:bg-primary-600 hover:text-white text-base" :class="isSelected('/reports') ? 'text-yellow-500' : 'text-primary-400'" v-if="userAbilities.allow('view', 'reports')">
        <!-- <span class="material-icons-round">summarize</span> -->
        <span class="flex-grow">Reports</span>
      </a>

      <!-- profiles -->
      <simple-toggle @toggle="toggle('data')" :is-open="toggleStatus.data" v-if="userAbilities.allowSome('view,guestProfiles|view,companyProfiles')">
        <template #title="titleProps">
          <div class="flex justify-between items-center cursor-pointer h-12 px-4">
            <p class="leading-none font-bold text-primary-400">Data</p>
            <div class="text-primary-400">
              <msr-icon v-if="! toggleStatus.data">expand_more</msr-icon>
              <msr-icon v-if="toggleStatus.data">expand_less</msr-icon>
            </div>
          </div>
        </template>
        <template #default="simpleProps">
          <div class="mb-8">

            <!-- guest profiles -->
            <a href="/guest-profiles" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/guest-profiles')}" v-if="userAbilities.allow('view', 'guestProfiles')">
              <span class="material-icons-round">account_circle</span>
              <span class="flex-grow mx-4">Guest Profiles</span>
            </a>

            <!-- company profiles -->
            <a href="/company-profiles" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/company-profiles')}" v-if="userAbilities.allow('view', 'companyProfiles')">
              <span class="material-icons-round">business</span>
              <span class="flex-grow mx-4">Company Profiles</span>
            </a>
          </div>
        </template>
      </simple-toggle>
      
      <!-- setup -->
      <simple-toggle @toggle="toggle('setup')" :is-open="toggleStatus.setup" v-if="userAbilities.allowSome('view,packages|view,packageCategories|view,rooms|view,transactionTypes|view,paymentModes|view,users|view,preferences')">
        <template #title="titleProps">
          <div class="flex justify-between items-center cursor-pointer h-12 px-4">
            <p class="leading-none font-bold text-primary-400">Setup</p>
            <div class="text-primary-400">
              <msr-icon v-if="! toggleStatus.setup">expand_more</msr-icon>
              <msr-icon v-if="toggleStatus.setup">expand_less</msr-icon>
            </div>
          </div>
        </template>
        <template #default="simpleProps">
          <div class="mb-8">
            <a href="/packages" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/packages')}" v-if="userAbilities.allow('view', 'packages')">
              <span class="material-icons-round">cases</span>
              <span class="flex-grow mx-4">Packages</span>
            </a>
            <a href="/rooms" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/rooms')}" v-if="userAbilities.allow('view', 'rooms')">
              <span class="material-icons-round">bed</span>
              <span class="flex-grow mx-4">Rooms</span>
            </a>
            <a href="/trans-types" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/trans-types')}" v-if="userAbilities.allow('view', 'transactionTypes')">
              <span class="material-icons-round">receipt_long</span>
              <span class="flex-grow mx-4">Transaction Types</span>
            </a>
            <a href="/payment-modes" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/payment-modes')}" v-if="userAbilities.allow('view', 'paymentModes')">
              <span class="material-icons-round">currency_rupee</span>
              <span class="flex-grow mx-4">Payment Modes</span>
            </a>
            <a href="/users" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/users')}" v-if="isAmong('System Administrator|Administrator')">
              <span class="material-icons-round">manage_accounts</span>
              <span class="flex-grow mx-4">Users</span>
            </a>

            <!-- channel manager -->
            <a href="/channel-manager" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/channel-manager')}" v-if="userAbilities.allow('view', 'channelManagers')">
              <span class="material-icons-round">hub</span>
              <span class="flex-grow mx-4">Channel Manager</span>
            </a>

            <!-- preferences -->
            <a href="/preferences" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/preferences')}" v-if="isAmong('System Administrator|Administrator')">
              <span class="material-icons-round">tune</span>
              <span class="flex-grow mx-4">Preferences</span>
            </a>
          </div>
        </template>
      </simple-toggle>

      <!-- templates -->
      <simple-toggle @toggle="toggle('templates')" :is-open="toggleStatus.templates" v-if="userAbilities.allowSome('view,emailTemplates')">
        <template #title="titleProps">
          <div class="flex justify-between items-center cursor-pointer h-12 px-4">
            <p class="leading-none font-bold text-primary-400">Templates</p>
            <div class="text-primary-400">
              <msr-icon v-if="! toggleStatus.templates">expand_more</msr-icon>
              <msr-icon v-if="toggleStatus.templates">expand_less</msr-icon>
            </div>
          </div>
        </template>
        <template #default="simpleProps">
          <div class="mb-8">

            <!-- email templates -->
            <a href="/email-templates" class="btn btn-transparent hover:bg-primary-600 text-white" :class="{'text-yellow-500': isSelected('/email-templates')}" v-if="userAbilities.allow('view', 'emailTemplates')">
              <span class="material-icons-round">email</span>
              <span class="flex-grow mx-4">Email Templates</span>
            </a>
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
let {user, client, hasRole, isAmong} = useUser();
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