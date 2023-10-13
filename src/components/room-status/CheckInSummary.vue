<template>
  <div v-if="getCheckInReq.success && checkIn">
    <div class="p-6">
      <div class="border border-primary-200 rounded-xl">
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Room No. / Folio No.</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ checkIn.room.number }} / {{ checkIn.folio_number }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Guest</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ checkIn.guests[0].guest.name }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Checked In at</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ checkIn.in_time }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Check Out at</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ checkIn.out_time }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Stay (Days)</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ checkIn.stay }}</p>
          </div>
        </div>
        <div class="row tight"> 
          <div class="col-2">
            <p class="leading-none">Pax</p>
          </div>
          <div class="col-2">
            <p class="leading-none">{{ checkIn.adults + checkIn.extra_adults }} + {{ checkIn.children + checkIn.extra_children }}</p>
          </div>
        </div>
        <div class="row tight" v-if="group && group.length > 1">
          <div class="col-2">
            <p class="leading-none">Check Ins Group</p>
          </div>
          <div class="col-2 col-tags">
            <p class="tag" :class="item.parent_id ? 'bg-stone-300' : 'bg-lime-300'" v-for="(item, index) in group" :key="index">
              Room {{ item.room.number }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <router-link :to="`/check-ins/${checkIn.id}`">
          <button class="btn btn-primary" title="View Details">
            <span>View CheckIn</span>
            <msr-icon>arrow_forward</msr-icon>
          </button>
        </router-link>
      </div>
    </div>
    
  </div>
  <div v-else>
    <loading-dots :progress="getCheckInReq.progress" :message="getCheckInReq.message"></loading-dots>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
// import NewBooking from '@/vue/client/bookings/NewBooking.vue';
// import CheckInForm from '@/vue/client/check-ins/create-check-in/CheckInForm.vue';

let props = defineProps([
  'checkInId',
  'newCheckIn',
  'newBooking',
  'day'
]);

let emits = defineEmits([
  'close'
]);

let checkIn = ref();
let group = ref();
let getCheckInReq = reactive(useApi());

function getCheckIn() {
  getCheckInReq.send(
    `/api/client/v1/check-ins/${props.checkInId}`
  )
  .then (res => {
    if (res) {
      checkIn.value = res.checkIn;
      group.value = res.group;
      // extendStay.value = checkIn.value.stay_ends_today;
    }
  });
}

function onCheckInCreated(modal, e) {
  modal.close();
  emits('close');
}

function onBookingCreated(modal, e) {
  modal.close();
  emits('close');
}

onMounted(() => {
  getCheckIn();
});
</script>