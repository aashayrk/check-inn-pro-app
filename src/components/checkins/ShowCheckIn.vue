<template>
  <page>
    <page-topbar back-to="/check-ins" page-title="Check In Details"></page-topbar>
    <div class="two-col-grid gap-2">
      
      <!-- col 1 -->
      <div>
        <info-section section-title="Check In Summary" :actions="true">
          <template #actions>

            <!-- billing -->
            <!-- <a :href="`/check-ins/${route.params.id}/billing`" title="Go to Billing" class="btn btn-primary ml-1" v-if="userAbilities.allow('viewBilling', 'checkIns')">
              <span>View Billing</span>
              <msr-icon>arrow_forward</msr-icon>
            </a> -->

            <!-- other actions -->
            <dropdown-menu size="md" class="ml-1" v-if="checkIn && checkIn.checked_out === 0">
              <!-- <template #trigger>
                <button class="btn btn-round">
                  <msr-icon>more_vert</msr-icon>
                </button>
              </template> -->

              <!-- items -->
              <template #default="dropdownProps">
                <div class="p-2">
    
                  <!-- add room -->
                  <!-- <modal-dialog :disabled="userAbilities.deny('create', 'checkIns')" v-if="! checkIn.pending_check_out">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('create', 'checkIns')">
                        <msr-icon>bed</msr-icon>
                        <span>Add Rooms</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Add Rooms">
                        <add-rooms :check-in="checkIn" @close="onRoomsAdded(dropdownProps, modalProps, $event)"></add-rooms>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- change room -->
                  <!-- <modal-dialog :disabled="userAbilities.deny('changeRoom', 'checkIns')" v-if="! checkIn.pending_check_out">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('changeRoom', 'checkIns')">
                        <msr-icon>arrow_forward</msr-icon>
                        <span>Change Room</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Change Room">
                        <change-room :check-in="checkIn" @saved="onPackageSaved($event)" @close="onRoomChanged(dropdownProps, modalProps, $event)"></change-room>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- extend stay -->
                  <!-- <modal-dialog :disabled="userAbilities.deny('extendStay', 'checkIns')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('extendStay', 'checkIns')">
                        <msr-icon>add</msr-icon>
                        <span>Extend Stay</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Add Rooms">
                        <extend-stay :check-in="checkIn" @close="onCheckInUpdated(dropdownProps, modalProps, $event)"></extend-stay>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- apply tariff -->
                  <button class="btn btn-transparent w-full"  @click="applyTariff()" :disabled="applyTariffReq.progress || userAbilities.deny('applyTariff', 'checkIns')">
                    <msr-icon>add</msr-icon>
                    <span>Apply Tariff</span>
                  </button>

                  <!-- edit check in -->
                  <!-- <modal-dialog v-if="checkIn && ! checkIn.pending_check_out" :disabled="userAbilities.deny('modify', 'checkIns')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('modify', 'checkIns')">
                        <msr-icon>edit</msr-icon>
                        <span>Edit</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Edit Check In Record">
                        <edit-check-in :check-in="checkIn" @close="onCheckInUpdated(dropdownProps, modalProps, $event)"></edit-check-in>
                      </info-section>
                    </template>
                  </modal-dialog> -->

                  <!-- split folio -->
                  <!-- <modal-dialog v-if="! checkIn.supplimentary" :disabled="userAbilities.deny('splitFolio', 'checkIns')">
                    <template #trigger>
                      <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('splitFolio', 'checkIns')">
                        <msr-icon>call_split</msr-icon>
                        <span>Split Folio</span>
                      </button>
                    </template>
                    <template #default="modalProps">
                      <info-section section-title="Split Folio">
                        <split-folio :check-in="checkIn" @close="onFolioSplit($event, modalProps)"></split-folio>
                      </info-section>
                    </template>
                  </modal-dialog> -->
                </div>
              </template>
            </dropdown-menu>
          </template>

          <!-- check in details -->
          <div v-if="getCheckInReq.success && checkIn">
            <div class="p-6 -mt-6">
              <div>
                <p class="leading-none text-xl font-bold">Room {{ checkIn.room.number }}</p>
                <p class="leading-none mt-2">{{ checkIn.folio_number }} / {{ checkIn.reg_card_number }}</p>
              </div>
            </div>
            <div class="p-6 -mt-6">
              <div class="border border-primary-200 rounded-xl">
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
                    <p class="leading-none">Adults</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIn.adults + checkIn.extra_adults }}</p>
                  </div>
                </div>
                <div class="row tight"> 
                  <div class="col-2">
                    <p class="leading-none">Children</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIn.children + checkIn.extra_children}}</p>
                  </div>
                </div>
                <div class="row tight">
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
                    <p class="leading-none currency">{{ checkIn.sale_base }}</p>
                  </div>
                </div>
                <div class="row tight" v-if="checkIn.extra_adults > 0">
                  <div class="col-2">
                    <p class="leading-none">Extra Adult</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ checkIn.sale_extra_adult }}</p>
                  </div>
                </div>
                <div class="row tight"  v-if="checkIn.extra_children > 0">
                  <div class="col-2">
                    <p class="leading-none">Extra Child</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ checkIn.sale_extra_child }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Discount</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none currency">{{ checkIn.discount }}%</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Special Tariff</p>
                  </div>
                  <div class="col-2 col-tags">
                    <p class="tag bg-lime-300" v-if="checkIn.special_tariff">Special Tariff</p>
                    <p class="tag bg-lime-300" v-if="! checkIn.special_tariff">Rack Rate</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Plan</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIn.plan.name }} - {{ checkIn.plan.description }}</p>
                  </div>
                </div>

                <!-- updated upto -->
                <div class="row tight">
                  <div class="col-2">Tariff Applied Upto</div>
                  <div class="col-2">
                    <div>{{ checkIn.tariff_applied_upto }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- other info -->
            <div class="p-6 -mt-6">
              <div class="flex justify-between items-center">
                <p class="tag bg-primary-200">Other Info</p>

                <!-- edit other info -->
                <!-- <modal-dialog v-if="checkIn && ! checkIn.supplimentary && ! checkIn.checked_out" :disabled="userAbilities.deny('modify', 'checkIns')">
                  <template #trigger>
                    <button class="btn btn-round btn-small" :disabled="userAbilities.deny('modify', 'checkIns')">
                      <msr-icon>edit</msr-icon>
                    </button>
                  </template>
                  <template #default="modalProps">
                    <info-section section-title="Edit Info">
                      <edit-other-info :guest="checkIn.guests[0].guest" :check-in="checkIn" @close="onOtherInfoSaved($event, modalProps)"></edit-other-info>
                    </info-section>
                  </template>
                </modal-dialog> -->
              </div>
              <div class="border border-primary-200 rounded-xl mt-6">
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Billing To</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIn.billing_to === 'Company' ? checkIn.billing_to_company.name : 'Self' }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Vehicle Number</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIn.vehicle_number ?? '...' }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Market Segment</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIn.market_segment ? checkIn.market_segment.name : '...' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <loading-dots :progress="getCheckInReq.progress" :message="getCheckInReq.message"></loading-dots>
          </div>
        </info-section>
  
        <!-- transactions -->
        <check-in-transactions :check-in-id="route.params.id" :check-in="checkIn" ref="checkInTransactions" v-if="userAbilities.allow('view', 'transactions')"></check-in-transactions>
  
        <!-- receipts -->
        <check-in-receipts :check-in-id="route.params.id" :check-in="checkIn" @total="onReceiptsTotal($event)" ref="checkInReceipts" v-if="userAbilities.allow('view', 'receipts')"></check-in-receipts>
      </div>
  
      <!-- col2 -->
      <div>

        <!-- guests -->
        <checked-in-guests :check-in-id="route.params.id" :check-in="checkIn"></checked-in-guests>

        <!-- instructions -->
        <check-in-instructions :check-in-id="route.params.id" :check-in="checkIn" class="mt-2"></check-in-instructions>

        <!-- room change history -->
        <info-section section-title="Room Change History" class="mt-2" v-if="checkIn">
          <div v-if="checkIn.room_change_histories.length">
            <div class="py-4">
              <div v-for="record in checkIn.room_change_histories" :key="record.id" class="row-item">
                <div class="grid grid-cols-2 gap-2 items-center p-6 py-2">
                  <div>
                    <p class="leading-none">{{ record.old_room.number }} to {{ record.room.number }}</p>
                    <p class="leading-none text-xs mt-1">{{ record.created_at }}, by {{ record.user.username }}</p> 
                  </div>
                  <div class="col-tags">
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
// import EditCheckIn from './EditCheckIn.vue';
// import ExtendStay from './ExtendStay.vue';
// import ChangeRoom from './ChangeRoom.vue';
// import SplitFolio from './SplitFolio.vue';
import CheckedInGuests from './CheckedInGuests.vue';
import CheckInTransactions from './CheckInTransactions.vue';
import CheckInReceipts from './CheckInReceipts.vue';
import CheckInInstructions from './CheckInInstructions.vue';
// import EditOtherInfo from './EditOtherInfo.vue';
import { onMounted, provide, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';
import { useRoute } from 'vue-router';

let userAbilities = useUserAbilities();
provide('userAbilities', userAbilities);

let getCheckInReq = reactive(useApi());
let applyTariffReq = reactive(useApi());
let checkIn = ref();
let group = ref([]);
let extendStay = ref(false);
let checkInTransactions = ref(null);
let checkInReceipts = ref(null);
let receiptsTotal = ref(0);
let route = useRoute();

function getCheckIn() {
  getCheckInReq.send(
    `/api/client/v1/check-ins/${route.params.id}`
  )
  .then (res => {
    if (res) {
      checkIn.value = res.checkIn;
      group.value = res.group;
      extendStay.value = checkIn.value.stay_ends_today;
    }
  });
}

function onCheckInUpdated(dropdownProps, modalProps, e) {
  // dropdownProps.close();
  modalProps.close();

  getCheckIn();
  checkInTransactions.value.getTransactions();
  checkInReceipts.value.getReceipts();
}

function onOtherInfoSaved(data, modal) {
  modal.close();
  getCheckIn();
}

function applyTariff() {
  applyTariffReq.send(
    `/api/client/v1/check-ins/${route.params.id}/tariff`,
    'POST',
    {
      checkInIds: [
        route.params.id
      ],
      userInitiated: true,
    }
  )
  .then (res => {
    if (res) {
      getCheckIn();
    }
  });
}

function onRoomsAdded(dropdownProps, modalProps, e) {
  // dropdownProps.close();
  modalProps.close();

  getCheckIn();
  checkInTransactions.value.getTransactions();
  checkInReceipts.value.getReceipts();
}

function onRoomChanged(dropdownProps, slotProps, data) {
  slotProps.close();

  getCheckIn();
  checkInTransactions.value.getTransactions();
  checkInReceipts.value.getReceipts();
}

function onReceiptsTotal(value) {
  receiptsTotal.value = value;
}

function onFolioSplit(data, modal)
{
  getCheckIn();
  checkInTransactions.value.getTransactions();
  checkInReceipts.value.getReceipts();
  
  modal.close();
}

onMounted(() => {
  getCheckIn();
});
</script>