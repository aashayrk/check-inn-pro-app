<template>
  <page>
    <page-topbar page-title="Booking Details"></page-topbar>
    <div class="grid md:grid-cols-2 gap-2">
      
      <!-- col 1 -->
      <div>
        <info-section section-title="Booking Summary">
          <div class="actions p-6" v-if="booking && booking.checked_in === 1 && userAbilities.allow('view', 'checkIns')">

            <!-- go to checkIn -->
            <router-link :to="`/check-ins/${booking.check_in_id}`" class="btn btn-primary">
              <span>Go to CheckIn</span>
              <msr-icon>arrow_forward</msr-icon>
            </router-link>

            <!-- checkin -->
            <!-- <modal-dialog v-if="booking && booking.can_check_in" :disabled="! userAbilities.allow('create', 'checkIns')">
              <template #trigger>
                <button class="btn btn-primary w-full" :disabled="! userAbilities.allow('create', 'checkIns')">
                  <span>Check In</span>
                  <msr-icon>arrow_forward</msr-icon>
                </button>
              </template>
              <template #default="modalProps">
                <info-section section-title="Check In">
                  <check-in :booking="booking" @close="onCheckIn(modalProps, $event)"></check-in>
                </info-section>
              </template>
            </modal-dialog> -->

            <!-- other actions -->
            <!-- <dropdown-menu size="md" class="ml-1" v-if="booking && (booking.checked_in === 0 && booking.no_show === 0 && booking.cancelled === 0)">
              <template #trigger>
                <button class="btn btn-round">
                  <msr-icon>more_vert</msr-icon>
                </button>
              </template> -->

              <!-- items -->
              <!-- <template #default="dropdownProps">
                <div class="p-2"> -->
    
                  <!-- add rooms -->
                  <!-- <modal-dialog :disabled="! userAbilities.allow('create', 'bookings')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="! userAbilities.allow('create', 'bookings')">
                        <msr-icon>bed</msr-icon>
                        <span>Add Rooms</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Add Rooms">
                        <add-rooms :booking="booking" @close="onRoomsAdded(dropdownProps, modalProps, $event)"></add-rooms>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- change room -->
                  <!-- <modal-dialog v-if="booking" :disabled="! userAbilities.allow('changeRoom', 'bookings')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="! userAbilities.allow('changeRoom', 'bookings')">
                        <msr-icon>arrow_forward</msr-icon>
                        <span>Change Room</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Change Room">
                        <change-room @close="onRoomChanged($event, modalProps)" :booking="booking"></change-room>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- extend stay -->
                  <!-- <modal-dialog :disabled="! userAbilities.allow('extendStay', 'bookings')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="! userAbilities.allow('extendStay', 'bookings')">
                        <msr-icon>add</msr-icon>
                        <span>Extend Stay</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Add Rooms">
                        <extend-stay :booking="booking" @close="onBookingUpdated($event, modalProps)"></extend-stay>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- edit booking -->
                  <!-- <modal-dialog v-if="booking" :disabled="! userAbilities.allow('modify', 'bookings')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="! userAbilities.allow('modify', 'bookings')">
                        <msr-icon>edit</msr-icon>
                        <span>Edit</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Edit Check In Record">
                        <edit-booking :booking="booking" @close="onBookingUpdated($event, modalProps)"></edit-booking>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- cancel booking -->
                  <!-- <modal-dialog v-if="booking" :disabled="! userAbilities.allow('cancel', 'bookings')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="! userAbilities.allow('cancel', 'bookings')">
                        <msr-icon>delete</msr-icon>
                        <span>Cancel</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Edit Check In Record">
                        <list-booking-group :booking="booking" @close="onBookingCancelled($event, modalProps)"></list-booking-group>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- no show -->
                  <!-- <modal-dialog v-if="booking && booking.can_mark_as_no_show" :disabled="! userAbilities.allow('markAsNoShow', 'bookings')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="! userAbilities.allow('markAsNoShow', 'bookings')">
                        <msr-icon>person_off</msr-icon>
                        <span>No Show</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Check In">
                        <no-show :booking="booking" @close="onMarkedAsNoShow(modalProps, $event)"></no-show>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- confirmation letter -->
                  <!-- <button class="btn btn-transparent w-full" @click="viewConfirmationLetter()">
                    <msr-icon>receipt</msr-icon>
                    <span>Conf. Letter</span>
                  </button> -->
                <!-- </div>
              </template>
            </dropdown-menu> -->
          </div>

          <!-- booking details -->
          <div v-if="getBookingReq.success && booking">
            <div class="p-6">
              <div>
                <p class="leading-none text-xl font-bold">
                  Room {{ booking.room.number }}
                </p>
                <p class="leading-none mt-2">{{ booking.reservation_number }}</p>
              </div>
            </div>
            <div class="p-6 -mt-6">
              <div class="border border-primary-200 rounded-xl">
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
                    <p class="leading-none">Reserved On</p>
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
                    <p class="leading-none">{{ booking.adults + booking.extra_adults }} + {{ booking.children + booking.extra_children}}</p>
                  </div>
                </div>
                <div class="row tight" v-if="bookings.length > 1">
                  <div class="col-2">
                    <p class="leading-none">Rooms bookings</p>
                  </div>
                  <div class="col-2 col-tags">
                    <p class="tag" :class="item.parent_id ? 'bg-stone-300' : 'bg-lime-300'" v-for="(item, index) in bookings" :key="index">
                      Room {{ item.room.number }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- tariff -->
            <div class="p-6 -mt-6">
              <div class="flex justify-between items-center">
                <p class="tag bg-primary-200">Applied Tariff</p>
              </div>
              <div class="border border-primary-200 rounded-xl mt-6">
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Room Tariff</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ booking.base_tariff }}</p>
                  </div>
                </div>
                <div class="row tight" v-if="booking.extra_adults > 0">
                  <div class="col-2">
                    <p class="leading-none">Extra Adult</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ booking.extra_adult_tariff }}</p>
                  </div>
                </div>
                <div class="row tight"  v-if="booking.extra_children > 0">
                  <div class="col-2">
                    <p class="leading-none">Extra Child</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ booking.extra_child_tariff }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Discount</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ booking.discount }}%</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Special Tariff</p>
                  </div>
                  <div class="col-2 col-tags">
                    <p class="tag bg-lime-300" v-if="booking.special_tariff">Special Tariff</p>
                    <p class="tag bg-lime-300" v-if="! booking.special_tariff">Rack Rate</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Plan</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ booking.plan.name }} - {{ booking.plan.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <loading-dots :progress="getBookingReq.progress" :message="getBookingReq.message"></loading-dots>
          </div>
        </info-section>

        <!-- transactions -->
        <booking-transactions :bookings="bookings" :taxableAmount="taxableAmount" :totalCgst="totalCgst" :totalSgst="totalSgst" :totalAmount="totalAmount" :req="getBookingReq" class="mt-2"></booking-transactions>
  
        <!-- receipts -->
        <booking-receipts :booking-id="route.params.id" :booking="booking" @total="onReceiptsTotal($event)" ref="bookingReceipts"></booking-receipts>
      </div>
  
      <!-- col2 -->
      <div>

        <!-- guests -->
        <booked-guests :booking-id="route.params.id" :booking="booking" v-if="booking"></booked-guests>

        <!-- instructions -->
        <booking-instructions :booking-id="route.params.id" :booking="booking" v-if="booking" class="mt-2"></booking-instructions>

        <!-- room change history -->
        <info-section section-title="Room Change History" class="mt-2" v-if="booking">
          <div v-if="booking.room_change_histories.length">
            <div class="py-4">
              <div v-for="record in booking.room_change_histories" :key="record.id" class="row-item">
                <div class="grid grid-cols-2 gap-2 items-center p-6 py-2">
                  <div>
                    <p class="leading-none">{{ record.old_room.number }} to {{ record.room.number }}</p>
                    <p class="leading-none text-xs mt-1">{{ record.created_at }}, by {{ record.user.username }}</p> 
                  </div>
                  <div class="col-tags justify-end">
                    <span class="tag" v-if="record.reason">{{ record.reason }}</span> 
                    <!-- <span class="tag">to {{ record.upto }}</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="p-6">
              <p class="leading-none">No room change history yet!</p>
            </div>
          </div>
        </info-section>
      </div>
    </div>
  </page>
</template>
<script setup>
// import AddRooms from './AddRooms.vue';
// import EditBooking from './EditBooking.vue';
// import ChangeRoom from './ChangeRoom.vue';
// import ExtendStay from './ExtendStay.vue';
// import ListBookingGroup from './ListBookingGroup.vue';
// import CheckIn from './check-in/CheckIn.vue';
// import NoShow from './NoShow.vue';
import BookingTransactions from './BookingTransactions.vue';
import BookingReceipts from './BookingReceipts.vue';
import BookedGuests from './BookedGuests.vue';
import BookingInstructions from './BookingInstructions.vue';
import { onMounted, provide, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';
import { useRoute } from 'vue-router';

let props = defineProps([
  'bookingId'
]);

let userAbilities = useUserAbilities();
provide('userAbilities', userAbilities);

let getBookingReq = reactive(useApi());
let applyTariffReq = reactive(useApi());
let booking = ref();
let bookings = ref([]);
let taxableAmount = ref(0);
let totalCgst = ref(0);
let totalSgst = ref(0);
let totalAmount = ref(0);
let extendStay = ref(false);
let bookingReceipts = ref(null);
let receiptsTotal = ref(0);
let confirmationLetterReq = reactive(useApi());
let route = useRoute();

function getBooking() {
  getBookingReq.send(
    `/api/client-app/v1/bookings/${route.params.id}`
  )
  .then (res => {
    if (res) {
      booking.value = res.booking;
      bookings.value = res.bookings;
      taxableAmount.value = res.taxableAmount;
      totalCgst.value = res.totalCgst;
      totalSgst.value = res.totalSgst;
      totalAmount.value = res.totalAmount;
    }
  });
}

function onBookingUpdated(e, modalProps) {
  modalProps.close();

  getBooking();
  bookingReceipts.value.getReceipts();
}

function onBookingCancelled(e, modalProps) {
  modalProps.close();

  getBooking();
  bookingReceipts.value.getReceipts();
}

function onRoomsAdded(dropdownProps, modalProps, e) {
  modalProps.close();

  getBooking();
  bookingReceipts.value.getReceipts();
}

function onRoomChanged(dropdownProps, slotProps, data) {
  slotProps.close();

  getBooking();
  bookingReceipts.value.getReceipts();
}

function onReceiptsTotal(value) {
  receiptsTotal.value = value;
}

function onCheckIn(modal) {
  modal.close();
  getBooking();
}

function onMarkedAsNoShow(modal, data) {
  modal.close();
  getBooking();
}

function viewConfirmationLetter() {
  confirmationLetterReq.send(
    `/api/client/v1/bookings/${route.params.id}/confirmation-letter`,
    'POST',
  )
  .then (res => {
    window.open(res.previewUrl, 'BLANK');
  });
}

onMounted(() => {
  getBooking();
});
</script>