<template>
  <div v-if="getBookingReq.success && booking">
    <div class="p-6">
      <div class="border border-primary-200 rounded-xl">
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Room No. / Res. No.</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.room.number }} / {{ booking.reservation_number }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Guest</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.guests[0].guest.name }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Booked At</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.reservation_date }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Check In at</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.in_time }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Check Out at</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.out_time }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Booking Type</p>
          </div>
          <div class="col-2">
            <div class="col-tags">
              <p class="tag" :class="booking.type === 'Confirmed' ? 'bg-lime-300' : 'bg-yellow-300'">{{ booking.type }}</p>
            </div>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Stay (Days)</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.stay }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Pax</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ booking.adults + booking.extra_adults }} + {{ booking.children + booking.extra_children }}</p>
          </div>
        </div>
        <div class="row tight" v-if="group && group.length > 1">
          <div class="col-2">
            <p class="leading-none">Bookings Group</p>
          </div>
          <div class="col-2 col-tags">
            <p class="tag" :class="item.parent_id ? 'bg-stone-300' : 'bg-lime-300'" v-for="(item, index) in group" :key="index">
              Room {{ item.room.number }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <router-link :to="`/bookings/${booking.id}`">
          <button class="btn btn-primary" title="View Details">
            <span>View Booking</span>
            <msr-icon>arrow_forward</msr-icon>
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <loading-dots :progress="getBookingReq.progress" :message="getBookingReq.message"></loading-dots>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let props = defineProps([
  'bookingId',
  'newBooking',
  'day'
]);

let emits = defineEmits([
  'close'
]);

let booking = ref();
let group = ref();
let getBookingReq = reactive(useApi());

function getBooking() {
  getBookingReq.send(
    `/api/client/v1/bookings/${props.bookingId}`
  )
  .then (res => {
    if (res) {
      booking.value = res.booking;
      group.value = res.group;
      // extendStay.value = booking.value.stay_ends_today;
    }
  });
}

function onBookingCreated(modal, e) {
  modal.close();
  emits('close');
}

onMounted(() => {
  getBooking();
});
</script>