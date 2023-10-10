<template>
  <page page-title="Bookings" tab-bar="true">
    <page-topbar page-title="Bookings" menu="true"></page-topbar>
    <div v-if="getBookingsReq.success">
      <info-section section-title="Bookings">
        <!-- <template #actions>
          <modal-dialog :disabled="! userAbilities.allow('create', 'bookings')">
            <template #trigger>
              <button class="btn btn-primary" :disabled="! userAbilities.allow('create', 'bookings')">
                <span>New Booking</span>
                <msr-icon>add</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <info-section section-title="New Booking">
                <new-booking @close="onBookingCreated(defaultProps, $event)"></new-booking>
              </info-section>
            </template>
          </modal-dialog>
        </template> -->
        <div v-if="bookings.length" :req="getBookingsReq">
          <div v-for="(booking, index) in bookings" :key="index" class="row-item">

            <!-- parent booking -->
            <div class="data-row">
              <div class="data-info">
                <div class="grid md:grid-cols-2 gap-6 items-center p-6 py-4">
                  <div class="flex items-center">

                    <!-- avatar/photo -->
                    <preview-document :documents="booking.guests[0].guest.documents" type="Photo">
                      <template #trigger>
                        <img :src="`${booking.guests[0].guest.avatar}`" class="w-16 h-16 rounded-full ring ring-primary-200 cursor-pointer">
                      </template>
                    </preview-document>

                    <!-- info -->
                    <div class="ml-4">
                      <p class="leading-none text-xl">Room {{ booking.room.number }}</p>
                      <p class="leading-none text-xs mt-1">
                        <span v-if="booking.guests[0].guest.title">{{ booking.guests[0].guest.title.name }}. </span>
                        <span>{{ booking.guests[0].guest.name }}</span>
                        <span>, {{ booking.registration_number }}</span>
                      </p>
                      <p class="leading-none text-xs mt-1">{{ booking.reservation_number }}</p>
                    </div>
                  </div>
                  <div class="col-tags">
                    <p class="tag" :class="booking.can_mark_as_no_show ? 'bg-red-200' : 'bg-primary-200'">{{ booking.in_time }}</p>
                    <p class="tag bg-primary-200">{{ booking.out_time }}</p>
                    <p class="tag bg-red-200" v-if="booking.cancelled === 1">Cancelled</p>
                    <p class="tag bg-red-200" v-if="booking.no_show">No Show</p>
                    <p class="tag bg-lime-300" v-if="booking.house_guest">House Guest</p>
                  </div>
                </div>
              </div>
              <div class="data-actions flex">
      
                <!-- details -->
                <router-link class="btn btn-round btn-small" :to="`/bookings/${booking.id}`" v-if="userAbilities.allow('view', 'bookings')">
                  <msr-icon>chevron_right</msr-icon>
                </router-link>
              </div>
            </div>
  
            <!-- sub booking -->
            <div v-for="(subBooking, index) in booking.subBookings" :key="index" class="row-item">
              <div class="data-row ml-2">
                <div class="data-info">
                  <div class="grid md:grid-cols-2 gap-6 items-center p-6 py-4">
                    <div class="flex items-center">

                      <!-- avatar/photo -->
                      <preview-document :documents="subBooking.guests[0].guest.documents" type="Photo">
                        <template #trigger>
                          <img :src="`${subBooking.guests[0].guest.avatar}`" class="w-12 h-12 rounded-full ring ring-primary-100 cursor-pointer">
                        </template>
                      </preview-document>

                      <!-- info -->
                      <div class="ml-4">
                        <p class="leading-none">Room {{ subBooking.room.number }}</p>
                        <p class="leading-none text-xs mt-1">
                          <span v-if="subBooking.guests[0].guest.title">{{ subBooking.guests[0].guest.title.name }}. </span>
                          <span>{{ subBooking.guests[0].guest.name }}</span>
                          <span>, {{ subBooking.registration_number }}</span>
                        </p>
                        <p class="leading-none text-xs mt-1">{{ subBooking.reservation_number }}</p>
                      </div>
                    </div>
                    <div class="col-tags">
                      <p class="tag" :class="subBooking.can_mark_as_no_show ? 'bg-red-200' : 'bg-primary-200'">{{ subBooking.in_time }}</p>
                      <p class="tag bg-primary-200">{{ subBooking.out_time }}</p>
                      <p class="tag bg-red-200" v-if="subBooking.cancelled === 1">Cancelled</p>
                      <p class="tag bg-red-200" v-if="subBooking.no_show">No Show</p>
                      <p class="tag bg-lime-300" v-if="subBooking.house_guest">House Guest</p>
                    </div>
                  </div>
                </div>
                <div class="data-actions flex">
        
                  <!-- details -->
                  <router-link class="btn btn-round btn-small" :to="`/bookings/${subBooking.id}`" v-if="userAbilities.allow('view', 'bookings')">
                    <msr-icon>chevron_right</msr-icon>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6" v-else>
          <p class="leading-none">No booking yet!</p>
        </div>
      </info-section>
    </div>
    <div v-else>
      <loading-dots :progress="getBookingsReq.progress" :message="getBookingsReq.message"></loading-dots>
    </div>
  </page>
</template>
<script setup>
// import NewBooking from './NewBooking.vue';
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';

let getBookingsReq = reactive(useApi());
let bookings = ref([]);
let userAbilities = useUserAbilities();

function getBookings() {
  getBookingsReq.send('/api/client-app/v1/bookings')
    .then (res => {
      if (res) {
        bookings.value = res.bookings;
      }
    });
}

function onBookingCreated(props, data) {
  props.close();
  getBookings();
}

onMounted(() => {
  getBookings();
});
</script>