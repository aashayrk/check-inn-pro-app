<template>
  <div class="rounded-xl h-full" :class="roomColor()">

    <!-- room info -->
    <div class="flex justify-between">
      <div class="p-6">
        <p class="leading-none text-2xl">{{ room.number }}</p>
        <p class="leading-none text-xs mt-1">{{ room.type.name }}, {{ room.group.name }}</p>
      </div>
      <!-- <modal-dialog>
        <template #trigger>
          <button class="btn btn-round btn-small btn-white m-4">
            <msr-icon>chevron_right</msr-icon>
          </button>
        </template>
        <template #default="defaultProps">
          <info-section section-title="Actions"> -->
  
            <!-- new booking -->
            <!-- <new-booking :room="props.room.id" :in-time="props.day.date" @close="onBookingCreated(defaultProps, $event)" v-if="props.day.isFuture"></new-booking> -->
  
            <!-- new checkIn -->
            <!-- <check-in-form :room="props.room.id" @close="onCheckInCreated(defaultProps, $event)" v-if="props.day.isToday && props.room.clean"></check-in-form>
            <div class="p-6" v-if="props.day.isToday && ! props.room.clean">
              <p class="leading-none">Room {{ props.room.number }} is Dirty! Clean before Check-In.</p>
            </div>
  
            <div class="p-6" v-if="day.isPast">
              <p class="leading-none">Room {{ props.room.number }} was available on {{ day.date }}</p>
            </div>
          </info-section>
        </template>
      </modal-dialog> -->
    </div>
  </div>
</template>
<script setup>
// import CheckInForm from '@/vue/client/check-ins/create-check-in/CheckInForm.vue';
// import NewBooking from '@/vue/client/bookings/NewBooking.vue';
let props = defineProps([
  'room',
  'day',
]);

let emits = defineEmits([
  'close'
]);

function roomColor() {
  if (props.day.isToday && ! props.room.clean) {
    return 'bg-yellow-200';
  }
  return 'bg-green-200';
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