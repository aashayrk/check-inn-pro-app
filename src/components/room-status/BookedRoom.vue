<template>
  <div class="rounded-xl h-full relative overflow-hidden" :class="props.day.isToday && ! props.room.clean ? 'bg-yellow-200' : 'bg-green-200'">
    <div class="absolute top-0 flex h-full" 
      :class="{
        'border-l border-white': props.room.allocations[0].starts, 
        'border-r border-white': props.room.allocations[0].ends, 
        'bg-orange-200': props.room.allocations[0].booking_type === 'Confirmed', 
        'bg-lime-200': props.room.allocations[0].booking_type === 'Tentative'
      }" 
      :style="placeAllocation(props.room.allocations[0])">
    </div>

    <!-- room info -->
    <div class="p-6 relative">
      <div class="flex justify-between">
        <div>
          <p class="leading-none text-2xl">{{ room.number }}</p>
          <p class="leading-none text-xs mt-1 hidden md:block">{{ room.type.name }}, {{ room.group.name }}</p>
        </div>

        <!-- info -->
        <modal-dialog dialog-title="Booking Summary">
          <template #trigger>
            <button class="btn btn-round btn-transparent btn-white -m-4">
              <msr-icon>chevron_right</msr-icon>
            </button>
          </template>
          <template #default>
            <booking-summary :booking-id="props.room.allocations[0].booking_id"></booking-summary>

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
          </template>
        </modal-dialog>
      </div>
      
      <!-- allocation info -->
      <div class="p-4 -m-4 mt-6 rounded-xl bg-white bg-opacity-75">
        <p class="leading-none">{{ props.room.allocations[0].booking.guests[0].guest.name }}</p>
        <p class="leading-none text-xs mt-4">In : {{ props.room.allocations[0].in_time }}</p>
        <p class="leading-none text-xs mt-1">Out : {{ props.room.allocations[0].out_time }}</p>
        <p class="leading-none text-xs mt-1">Pax : {{ props.room.allocations[0].adults + props.room.allocations[0].extra_adults }} + {{ props.room.allocations[0].children + props.room.allocations[0].extra_children }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import BookingSummary from './BookingSummary.vue';
// import NewBooking from '@/vue/client/bookings/NewBooking.vue';
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

function allocationColor(alln) {
  if (alln.booking_type === 'Confirmed') {
    return 'bg-orange-200';
  }

  return 'bg-lime-200';
}

function truncate(name) {
  if (name.length <= 16) {
    return name;
  }

  return name.substring(0, 16) + '...';
}

function onBookingCreated(modal, e) {
  modal.close();
  emits('close');
}
</script>