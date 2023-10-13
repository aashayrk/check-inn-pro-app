<template>
  <div class="rounded-xl h-full relative overflow-hidden bg-green-200">
    <div class="bg-green-200">
      <template v-for="(allocation, index) in props.room.allocations" :key="index">
        <div class="absolute flex top-0 h-full" 
          :class="{
            'bg-red-200': allocation.type === 'Check In',
            'bg-orange-200': allocation.type === 'Booking' && allocation.booking_type === 'Confirmed',
            'bg-lime-200': allocation.type === 'Booking' && allocation.booking_type === 'Tentative',
            'bg-stone-300': allocation.type === 'Blocking',
            'border-l border-white': allocation.starts, 
            'border-r border-white': allocation.ends, 
          }" 
          :style="placeAllocation(allocation)">
        </div>
      </template>
    </div>
    
    <!-- room info -->
    <div class="p-6 relative flex flex-col h-full">
      <div class="flex justify-between flex-grow">
        <div>
          <p class="leading-none text-2xl">{{ room.number }}</p>
          <p class="leading-none text-xs mt-1 hidden md:block">{{ room.type.name }}, {{ room.group.name }}</p>
        </div>
  
        <!-- allocation summaries -->
        <modal-dialog dialog-title="Allocation Summaries">
          <template #trigger>
            <button class="btn btn-round btn-transparent -m-4">
              <msr-icon>chevron_right</msr-icon>
            </button>
          </template>
          <template #default>
            <div v-for="(allocation, index) in props.room.allocations" :key="index">
              <div v-if="allocation.type === 'Booking'" class="row-item">
                <div class="px-6 mt-6">
                  <p class="tag bg-primary-200">Booking Summary</p>
                </div>
                <booking-summary :booking-id="allocation.booking_id"></booking-summary>
              </div>
              <div v-if="allocation.type === 'Check In' && allocation.checked_out === 0" class="row-item">
                <div class="px-6 mt-6">
                  <p class="tag bg-primary-200">CheckIn Summary</p>
                </div>
                <check-in-summary :check-in-id="allocation.check_in_id" @close="onSummaryClosed(defaultProps)"></check-in-summary>
              </div>
              <div v-if="allocation.type === 'Blocking'" class="row-item">
                <div class="px-6 mt-6">
                  <p class="tag bg-primary-200">Blocking Summary</p>
                </div>
                <blocking-summary :room="props.room" :allocation="props.room.allocations[0]"></blocking-summary>
              </div>
            </div>
          </template>
        </modal-dialog>
      </div>

      <!-- info -->
      <div class="p-4 -m-4 mt-6 rounded-xl bg-white bg-opacity-75">
        <template v-for="(allocation, index) in props.room.allocations" :key="index">
          <div v-if="allocation.type === 'Booking'" :class="{'mt-4': index}">
            <p class="leading-none mt-1">
              {{ truncate(allocation.booking.guests[0].guest.name) }}
            </p>
            <p class="leading-none text-xs mt-2">
              <span v-if="allocation.starts">In : {{ allocation.from }}</span>
              <span v-if="allocation.ends">Out : {{ allocation.upto }}</span>
            </p>
          </div>
          <div v-if="allocation.type === 'Check In'" :class="{'mt-4': index}">
            <p class="leading-none mt-1">
              {{ truncate(allocation.check_in.guests[0].guest.name) }}
            </p>
            <p class="leading-none text-xs mt-2">
              <span v-if="allocation.starts">In : {{ allocation.from }}</span>
              <span v-if="allocation.ends">Out : {{ allocation.upto }}</span>
            </p>
          </div>
          <div v-if="allocation.type === 'Blocking'" :class="{'mt-4': index}">
            <p class="leading-none mt-1">
              <span>Blocked : </span>
              {{ truncate(allocation.note) }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import CheckInSummary from './CheckInSummary.vue';
import BookingSummary from './BookingSummary.vue';
import BlockingSummary from './BlockingSummary.vue';
let props = defineProps([
  'room'
]);

function truncate(name) {
  if (name.length <= 16) {
    return name;
  }

  return name.substring(0, 16) + '...';
}

function placeAllocation(alln) {
  let left = 0;
  let width = 100;

  if (alln.starts) {
    left = alln.from_percentage;
  }
  if (alln.ends) {
    width = (alln.upto_percentage - left);
    
    if (width < 0) {
      width = 0;
    }
  }

  return {
    left: `${left}%`,
    width: `${width}%`,
  }
}

function paintRoom(room) {
  if (room.allocations[1].type === 'Booking') {
    if (room.allocations[1].booking_type === 'Confirmed') {
      return 'bg-orange-200 hover:bg-orange-300';
    }
    else {
      return 'bg-lime-200 hover:bg-lime-300';
    }
  }
  if (room.allocations[1].type === 'Check In') {
    return 'bg-red-200 hover:bg-red-300';
  }
  if (room.allocations[1].type === 'Blocking') {
    return 'bg-stone-300 hover:bg-stone-400';
  }
}
</script>