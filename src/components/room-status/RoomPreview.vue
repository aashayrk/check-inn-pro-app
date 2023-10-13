<template>
  <div>
    <div v-if="props.status">
      <modal-dialog>
        <template #trigger>

          <!-- room preview -->
          <div class="rounded-xl overflow-hidden h-full flex flex-col" :class="paintRoom()">
            <div class="p-6 flex justify-between items-center">
              <div>
                <p class="leading-none text-2xl font-bold">{{ props.room.number }}</p>
                <p class="leading-none mt-1">{{ props.room.type.name }}</p>
              </div>
              <a :href="`/check-ins/${props.room.check_in.id}`" class="btn btn-small btn-round btn-transparent -my-4" title="Go to Check In Record" v-if="props.room.check_in">
                <msr-icon>chevron_right</msr-icon>
              </a>
            </div>
            <div class="mt-auto">

              <!-- info -->
              <div v-if="props.room.check_in">
                <div class="p-4 grid grid-cols-2">
                  <div class="p-2">
                    <p class="leading-none text-xs">Guests</p>
                    <p class="leading-none mt-1 text-sm font-bold">
                      {{ props.room.check_in.guests[0].guest.name }}
                      <span class="leading-none text-xs" v-if="(props.room.check_in.guests.length > 1)"> with {{ (props.room.check_in.guests.length - 1) }} Others</span>
                    </p>
                  </div>
                  <div class="p-2">
                    <p class="leading-none text-xs">Pax</p>
                    <p class="leading-none mt-1 text-sm font-bold">
                      {{ props.room.check_in.adults + props.room.check_in.extra_adults }} + {{ props.room.check_in.children + props.room.check_in.extra_children }}
                    </p>
                  </div>
                </div>
                <div class="p-4 grid grid-cols-2 -mt-6">
                  <div class="p-2">
                    <p class="leading-none text-xs">In Time</p>
                    <p class="leading-none font-bold text-sm mt-2">
                      {{ moment(props.room.check_in.in_time_ymd_his).format('DD MMM YYYY') }}
                    </p>
                    <p class="leading-none mt-1 text-sm font-bold">
                      {{ moment(props.room.check_in.in_time_ymd_his).format('hh:mm a') }}
                    </p>
                  </div>
                  <div class="p-2">
                    <p class="leading-none text-xs">Out Time</p>
                    <p class="leading-none font-bold text-sm mt-2">
                      {{ moment(props.room.check_in.out_time_ymd_his).format('DD MMM YYYY') }}
                    </p>
                    <p class="leading-none mt-1 text-sm font-bold">
                      {{ moment(props.room.check_in.out_time_ymd_his).format('hh:mm a') }}
                    </p>
                  </div>
                </div>
              </div>
                
              <!-- flags -->
              <div :class="paintStatus()">
                <div class="h-6 px-4 flex items-center justify-end">
                  <p class="leading-none text-xs font-bold text-right">{{ props.status.blocked ? 'Blocked' : props.status.length ? props.status : '...' }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #default>
          
          <!-- checkin/checkout summary for occupied rooms -->
          <div v-if="props.status === 'Occupied' || props.status === 'Checkout'">
            <info-section :section-title="`Check In Details for Room ${props.room.number}`">
              <check-in-summary :check-in-id="props.room.check_in.id"></check-in-summary>
            </info-section>
          </div>
          
          <!-- new checkin -->
          <div v-if="props.status === 'Available' && isToday()">
            <info-section :section-title="`Check In into Room ${props.room.number}`">

              <!-- new checkin -->
              <check-in-form :room="props.room"></check-in-form>
            </info-section>
          </div>

          <!-- new booking (adv) -->
          <div v-if="props.status === 'Available' && isFutureDay()">
            <info-section :section-title="`Advance Booking for Room ${props.room.number}`">
              <div class="p-6">
                <p class="leading-tight">
                  Advance Booking ... Feature under development.
                </p>
              </div>
            </info-section>
          </div>
        </template>
      </modal-dialog>
    </div>
    <div v-else>

      <!-- room preview -->
      <div class="rounded-xl overflow-hidden h-full flex flex-col" :class="paintRoom()">
        <div class="p-6 flex justify-between items-center">
          <div>
            <p class="leading-none text-2xl font-bold">{{ props.room.number }}</p>
            <p class="leading-none mt-1">{{ props.room.type.name }}</p>
          </div>
          <a :href="`/check-ins/${props.room.check_in.id}`" class="btn btn-small btn-round btn-transparent -my-4" title="Go to Check In Record" v-if="props.room.check_in">
            <msr-icon>chevron_right</msr-icon>
          </a>
        </div>
        <div class="mt-auto">

          <!-- info -->
          <div v-if="props.room.check_in">
            <div class="p-4 grid grid-cols-2">
              <div class="p-2">
                <p class="leading-none text-xs">Guests</p>
                <p class="leading-none mt-1 text-sm font-bold">
                  {{ props.room.check_in.guests[0].guest.name }}
                  <span class="leading-none text-xs" v-if="(props.room.check_in.guests.length > 1)"> with {{ (props.room.check_in.guests.length - 1) }} Others</span>
                </p>
              </div>
              <div class="p-2">
                <p class="leading-none text-xs">Pax</p>
                <p class="leading-none mt-1 text-sm font-bold">
                  {{ props.room.check_in.adults + props.room.check_in.extra_adults }} + {{ props.room.check_in.children + props.room.check_in.extra_children }}
                </p>
              </div>
            </div>
            <div class="p-4 grid grid-cols-2 -mt-6">
              <div class="p-2">
                <p class="leading-none text-xs">In Time</p>
                <p class="leading-none font-bold text-sm mt-2">
                  {{ moment(props.room.check_in.in_time_ymd_his).format('DD MMM YYYY') }}
                </p>
                <p class="leading-none mt-1 text-sm font-bold">
                  {{ moment(props.room.check_in.in_time_ymd_his).format('hh:mm a') }}
                </p>
              </div>
              <div class="p-2">
                <p class="leading-none text-xs">Out Time</p>
                <p class="leading-none font-bold text-sm mt-2">
                  {{ moment(props.room.check_in.out_time_ymd_his).format('DD MMM YYYY') }}
                </p>
                <p class="leading-none mt-1 text-sm font-bold">
                  {{ moment(props.room.check_in.out_time_ymd_his).format('hh:mm a') }}
                </p>
              </div>
            </div>
          </div>
            
          <!-- flags -->
          <div :class="paintStatus()">
            <div class="h-6 px-4 flex items-center justify-end">
              <p class="leading-none text-xs font-bold text-right">{{ props.status.blocked ? 'Blocked' : props.status.length ? props.status : '...' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from 'moment';
// import CheckInSummary from '../room-chart/CheckInSummary.vue';
// import CheckInForm from '@/vue/client/check-ins/create-check-in/CheckInForm.vue';

let props = defineProps([
  'room',
  'status',
  'day'
]);

function paintRoom() {
  if (props.room.blocked) {
    return 'bg-stone-300 cursor-not-allowed';
  }
  if (! props.room.clean && isToday()) {
    return 'bg-yellow-100 hover:bg-yellow-200 cursor-pointer';
  }
  if (props.status === 'Occupied') {
    return 'bg-red-100 hover:bg-red-200 cursor-pointer';
  }
  if (props.status === 'Checkout') {
    return 'bg-cyan-100 hover:bg-cyan-200 cursor-pointer';
  }
  if (props.status === '') {
    return 'bg-primary-100';
  }

  return 'bg-primary-100 hover:bg-primary-200 cursor-pointer';
}

function paintStatus() {
  if (props.room.blocked) {
    return 'bg-stone-300 cursor-not-allowed';
  }
  if (! props.room.clean && isToday()) {
    return 'bg-yellow-200 cursor-pointer';
  }
  if (props.status === 'Occupied') {
    return 'bg-red-200 text-red-800';
  }
  if (props.status === 'Checkout') {
    return 'bg-cyan-200 text-cyan-800';
  }
  if (props.status === '') {
    return 'bg-primary-200 text-primary-800';
  }

  return 'bg-primary-200 text-primary-800';
}

function isToday() {
  return props.day.clone().startOf('day').isSame(moment().startOf('day'));
}

function isFutureDay() {
  return props.day.clone().startOf('day').isAfter(moment().startOf('day'));
}

function isPastDay() {
  return props.day.clone().startOf('day').isBefore(moment().endOf('day'));
}
</script>