<template>
  <div class="rounded-xl h-full relative overflow-hidden" :class="props.day.isToday && ! props.room.clean ? 'bg-yellow-200' : 'bg-green-200'">
    <div class="absolute top-0 flex h-full bg-stone-200" :class="{'border-l border-white': props.room.allocations[0].starts, 'border-r border-white': props.room.allocations[0].ends}" :style="placeAllocation(props.room.allocations[0])"></div>
    
    <!-- room info -->
    <div class="p-6 relative flex flex-col h-full">
      <div class="flex justify-between flex-grow">
        <div>
          <p class="leading-none text-2xl">{{ room.number }}</p>
          <p class="leading-none text-xs mt-1 hidden md:block">{{ room.type.name }}, {{ room.group.name }}</p>
        </div>

        <!-- info -->
        <modal-dialog dialog-title="Blocking Summary">
          <template #trigger>
            <button class="btn btn-round btn-transparent -m-4">
              <msr-icon>chevron_right</msr-icon>
            </button>
          </template>
          <template #default>
            <blocking-summary :room="props.room" :allocation="props.room.allocations[0]"></blocking-summary>

            <!-- new booking -->
            <!-- <div class="actions p-6" v-if="props.room.allocations[0].ends && props.day.isFuture">
              <modal-dialog>
                <template #trigger>
                  <button class="btn btn-primary">
                    <span>New Booking</span>
                    <msr-icon>arrow_forward</msr-icon>
                  </button>
                </template>
                <template #default="defaultProps">
                  <info-section section-title="Check In Summary">
                    <new-booking :room="props.room.id" :in-time="props.day.date" @close="onBookingCreated(defaultProps, $event)"></new-booking>
                  </info-section>
                </template>
              </modal-dialog>
            </div> -->

            <!-- new checkIn -->
            <!-- <div class="actions p-6" v-if="props.room.allocations[0].ends && props.day.isToday">
              <modal-dialog :disabled="props.room.allocations[0].type === 'Check In' && props.room.allocations[0].checked_out === 0">
                <template #trigger>
                  <button class="btn btn-primary" :disabled="props.room.allocations[0].type === 'Check In' && props.room.allocations[0].checked_out === 0">
                    <span>New Check In</span>
                    <msr-icon>arrow_forward</msr-icon>
                  </button>
                </template>
                <template #default="defaultProps">
                  <info-section section-title="Check In Summary">
                    <check-in-form :room="props.room.id" @close="onCheckInCreated(defaultProps, $event)"></check-in-form>
                  </info-section>
                </template>
              </modal-dialog>
            </div> -->
          </template>
        </modal-dialog>
      </div>
      
      <!-- allocation info -->
      <div class="p-4 -m-4 mt-6 rounded-xl bg-white bg-opacity-75">
        <p class="leading-none text-xs">From : {{ props.room.allocations[0].from }}</p>
        <p class="leading-none text-xs mt-1">To : {{ props.room.allocations[0].upto }}</p>
        <p class="leading-none text-xs mt-1">Blocked for : {{ props.room.allocations[0].note }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import BlockingSummary from './BlockingSummary.vue';
// import NewBooking from '@/vue/client/bookings/NewBooking.vue';
// import CheckInForm from '@/vue/client/check-ins/create-check-in/CheckInForm.vue';
let props = defineProps([
  'room',
  'day'
]);

let emits = defineEmits([
  'close'
]);

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

function onBookingCreated(modal, e) {
  modal.close();
  emits('close');
}

function onCheckInCreated(modal, e) {
  modal.close();
  emits('close');
}
</script>