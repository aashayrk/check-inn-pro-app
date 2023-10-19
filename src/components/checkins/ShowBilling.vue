<template>
  <page>
    <page-topbar page-title="Billing"></page-topbar>
    <div class="grid md:grid-cols-2 gap-2 items-start">

      <!-- col1 -->
      <div>

        <!-- check ins summary -->
        <info-section section-title="Check In Summary">
          <!-- <div class="actions p-6"> -->

            <!-- check out -->
            <!-- <modal-dialog :disabled="currentCheckIn && currentCheckIn.supplimentary === 1">
              <template #trigger>
                <button class="btn btn-primary ml-1" :disabled="currentCheckIn && currentCheckIn.supplimentary === 1">
                  <span>Check Out</span>
                  <msr-icon>arrow_forward</msr-icon>
                </button>
              </template>
              <template #default="modalProps">
                <info-section section-title="Check Ins">
                  <list-check-ins :check-in-id="route.params.id" @close="onCheckedOut($event, modalProps)"></list-check-ins>
                </info-section>
              </template>
            </modal-dialog> -->

            <!-- other options -->
            <!-- <dropdown-menu size="lg" class="ml-1" v-if="checkIns.length > 1">
              <template #trigger>
                <button class="btn btn-round btn-transparent">
                  <msr-icon>more_vert</msr-icon>
                </button>
              </template>
              <div class="p-2"> -->
    
                <!-- manage folio groups -->
                <!-- <modal-dialog @close="onGroupsManaged()">
                  <template #trigger>
                    <button class="btn btn-transparent w-full">
                      <msr-icon>arrow_forward</msr-icon>
                      <span>Manage Groups</span>
                    </button>
                  </template>
                  <template #default="modalProps">
                    <info-section section-title="Manage Folio Groups">
                      <manage-check-in-groups></manage-check-in-groups>
                    </info-section>
                  </template>
                </modal-dialog>
              </div>
            </dropdown-menu>
          </div> -->
          <div v-if="getCheckInsReq.success && summary">
            
            <!-- rooms -->
            <div class="p-6 col-1 col-tags">
              <p class="tag" v-for="(checkIn, index) in checkIns" :key="index" :class="checkIn.parent_id ? 'bg-primary-100' : 'bg-primary-200' ">
                Room {{ checkIn.room.number }}
              </p>
            </div>
            <div class="p-6 -mt-6">
              <div class="border border-primary-200 rounded-xl">
                <div class="row tight"> 
                  <div class="col-2">
                    <p class="leading-none">Checked In at</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ parentCheckIn.in_time }}</p>
                  </div>
                </div>
                <div class="row tight"> 
                  <div class="col-2">
                    <p class="leading-none">Check Out at</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ parentCheckIn.out_time }}</p>
                  </div>
                </div>
                <div class="row tight"> 
                  <div class="col-2">
                    <p class="leading-none">Stay (Days)</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ parentCheckIn.stay }}</p>
                  </div>
                </div>
                <div class="row tight"> 
                  <div class="col-2">
                    <p class="leading-none">Rooms</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ checkIns.length }}</p>
                  </div>
                </div>
                <div class="row tight"> 
                  <div class="col-2">
                    <p class="leading-none">Pax</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">
                      {{ summary.totalAdults + summary.extraAdults }} + {{ summary.totalChildren + summary.extraChildren }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <loading-dots :progress="getCheckInsReq.progress"></loading-dots>
          </div>
        </info-section>
    
        <!-- transctions -->
        <info-section section-title="Transactions" class="mt-2">
          <div v-if="getCheckInsReq.success">
          
            <!-- check ins -->
            <div class="py-4">
              <toggle-section v-for="(checkIn, index) in checkIns" :key="index" class="row-item">
                <template #title>
                  <div class="row tight">
                    <div class="col-2">
                      <p class="leading-none">Room {{ checkIn.room.number }}</p>
                      <p class="leading-none text-xs mt-1">{{ checkIn.folio_number }}</p>
                    </div>
                    <div class="col-2">
                      <p class="leading-none text-right currency">{{ checkIn.transactionsTotal }}</p>
                    </div>
                  </div>
                </template>
    
                <!-- transaction groups -->
                <div v-if="checkIn.transactionGroups" class="ml-2">
                  <div v-if="checkIn.transactionGroups.length" class="py-4">
                    <div class="data-row row-item" v-for="(group, index) in checkIn.transactionGroups" :key="index">
                      <div class="data-info">
                        <div class="row tight">
                          <div class="col-2">
                            <p class="leading-none">
                              {{ group.type.code }} - {{ group.type.name }}
                            </p>
                            <p class="leading-none text-xs mt-1">{{ group.transactions.length }} Transactions</p>
                          </div>
                          <div class="col-2">
                            <p class="leading-none text-right currency">{{ group.amount }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="data-actions">
        
                        <!-- list transactions -->
                        <modal-dialog :dialog-title="`Transactions for Room ${checkIn.room.number} - #${checkIn.folio_number}`">
                          <template #trigger>
                            <button class="btn btn-small btn-round btn-transparent">
                              <msr-icon>chevron_right</msr-icon>
                            </button>
                          </template>
                          <template #default="defaultProps">
                            <list-transactions :check-in="checkIn" :group="group" :transactions="group.transactions" :key="checkIn.id">
                            </list-transactions>
                          </template>
                        </modal-dialog>
                      </div>
                    </div>
                  </div>
                  <div v-else class="p-6">
                    <p class="leading-none">No transactions found!</p>
                  </div>
                </div>
                <div v-else>
                  <loading-dots :progress="! checkIn.transactionGroups"></loading-dots>
                </div>
              </toggle-section>
            </div>
            <div class="p-6">
              <div class="rounded-xl bg-primary-100 p-6 py-4 grid grid-cols-2 gap-2">
                <p class="leading-none">Total Transactions</p>
                <p class="leading-none text-right text-xl currency">{{ billingSummary.transactionsTotal }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <loading-dots :progress="getCheckInsReq.progress" :message="getCheckInsReq.message"></loading-dots>
          </div>
        </info-section>

        <!-- receipts -->
        <info-section section-title="Receipts" class="mt-2">
          <div v-if="getCheckInsReq.success" class="py-4">
            <template v-for="(checkIn, index) in checkIns" :key="index" class="row-item">
              <toggle-section v-if="checkIn.receiptsTotal > 0" class="row-item">
                <template #title>
                  <div class="row tight">
                    <div class="col-2">
                      <p class="leading-none">Room {{ checkIn.room.number }}</p>
                      <p class="leading-none text-xs mt-1">{{ checkIn.folio_number }}</p>
                    </div>
                    <div class="col-2">
                      <p class="leading-none text-right currency">{{ checkIn.receiptsTotal }}</p>
                    </div>
                  </div>
                </template>
      
                <!-- receipts -->
                <div v-if="checkIn.receiptGroups" class="ml-2">
                  <div v-if="checkIn.receiptGroups.length" class="py-4">
                    <div class="data-row row-item" v-for="(item, index) in checkIn.receiptGroups" :key="index">
                      <div class="data-info">
                        <div class="row tight">
                          <div class="col-2">
                            <p class="leading-none">{{ item.mode }}</p>
                            <p class="leading-none text-xs mt-1">{{ item.receipts.length }} Receipts</p>
                          </div>
                          <div class="col-2">
                            <p class="leading-none text-right currency">{{ item.sum }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="data-actions">
                        <modal-dialog>
                          <template #trigger>
                            <button class="btn btn-small btn-round btn-transparent">
                              <msr-icon>chevron_right</msr-icon>
                            </button>
                          </template>
                          <template #default="defaultProps">
                            <info-section :section-title="`Receipts for Room ${checkIn.room.number} - #${checkIn.folio_number}`">
                              <list-receipts :check-in="checkIn" :receipts="item.receipts" :mode="item.mode"></list-receipts>
                            </info-section>
                          </template>
                        </modal-dialog>
                      </div>
                    </div>
                  </div>
                  <div class="p-6" v-else>
                    <p class="leading-none">No receipts found!</p>
                  </div>
                </div>
                <div v-else>
                  <loading-dots :progress="! checkIn.receiptGroups"></loading-dots>
                </div>
              </toggle-section>
            </template>

            <!-- receipts summary -->
            <div class="p-6">
              <div class="rounded-xl bg-lime-100 p-6 py-4 grid grid-cols-2 gap-2">
                <p class="leading-none">Total Receipts</p>
                <p class="leading-none text-right text-xl currency">{{ billingSummary.receiptsTotal }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <loading-dots :progress="getCheckInsReq.progress" :message="getCheckInsReq.message"></loading-dots>
          </div>
        </info-section>
      </div>

      <!-- col2 -->
      <div>
        <info-section section-title="Billing Summary">
          <div class="actions p-6">

            <!-- bills -->
            <modal-dialog dialog-title="Bills and Estimates">
              <template #trigger>
                <button class="btn btn-primary">
                  <span>Bills and Estimates</span>
                  <msr-icon>arrow_forward</msr-icon>
                </button>
              </template>
              <template #default="defaultProps">
                <show-bill :check-in="checkIns.find(item => ! item.parent_id)" @close="getCheckIns()"></show-bill>
              </template>
            </modal-dialog>
          </div>

          <!-- totals -->
          <div class="p-6 -mt-6">
            <div class="grid gap-2">
              <div class="p-6 py-4 bg-stone-100 rounded-xl grid grid-cols-2 gap-2" v-if="parentCheckIn && parentCheckIn.bill_number">
                <p class="leading-none">Bill Number</p>
                <p class="leading-none text-right text-xl">{{ parentCheckIn.bill_number }}</p>
              </div>
              <div class="rounded-xl bg-primary-100 p-6 py-4 grid grid-cols-2 gap-2">
                <p class="leading-none">Total Transactions</p>
                <p class="leading-none text-xl text-right currency">{{ billingSummary.transactionsTotal }}</p>
              </div>
              <div class="rounded-xl bg-lime-100 p-6 py-4 grid grid-cols-2 gap-2">
                <p class="leading-none">Total Receipts</p>
                <p class="leading-none text-xl text-right currency">{{ billingSummary.receiptsTotal }}</p>
              </div>
              <div class="rounded-xl bg-red-100 p-6 py-4 grid grid-cols-2 gap-2">
                <p class="leading-none">Balance</p>
                <p class="leading-none text-xl text-right currency">
                  {{ billingSummary.balance }}
                </p>
              </div>
            </div>
          </div>
        </info-section>
      </div>
    </div>
  </page>
</template>
<script setup>
import { ref, reactive, onMounted, computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';
// import ListCheckIns from '@/vue/client/check-outs/ListCheckIns.vue';
import ListTransactions from './ListTransactions.vue';
import ListReceipts from './ListReceipts.vue';
// import ManageCheckInGroups from './ManageCheckInGroups.vue';
import ShowBill from './ShowBill.vue';

let route = useRoute();

let props = defineProps([
  'checkInId',
  'receiptsTotal'
]);

let userAbilities = useUserAbilities();
provide('userAbilities', userAbilities);

let getCheckInsReq = reactive(useApi());
let allCheckIns = ref([]);
let checkIns = ref([]);
let parentCheckIn = ref();
let currentCheckIn = ref();
let getReceiptsReq = reactive(useApi());
let getTransactionsReq = reactive(useApi());
let summary = ref();
let billingSummary = reactive({
  receiptsTotal: 0,
  transactionsTotal: 0,
  balance: 0,
});

let filters = reactive({
  room: ''
});

let filtersActive = computed(() => {
  for (let filter in filters) {
    if (filters[filter]) {
      return true;
    }

    return false;
  }
});

function getCheckIns() {
  getCheckInsReq.send(
    `/api/client-app/v1/check-ins/${route.params.id}/billing`,
    'GET',
    null,
    filters
  )
  .then (res => {
    if (res) {
      allCheckIns.value = res.allCheckIns;
      checkIns.value = res.checkIns;
      parentCheckIn.value = res.parentCheckIn;
      currentCheckIn.value = res.checkIn;
      summary.value = res.summary;
      billingSummary.transactionsTotal = res.transactionsTotal;
      billingSummary.receiptsTotal = res.receiptsTotal;
      billingSummary.balance = res.balance;

      checkIns.value.forEach(item => {
        getTransactions(item);
        getReceipts(item);
      });
    }
  });
}

function getReceipts(checkIn) {
  getReceiptsReq.send(
    `/api/client-app/v1/check-ins/${checkIn.id}/receipts`
  )
  .then (res => {
    if (res) {
      checkIn.receiptGroups = res.receiptGroups;
      checkIn.receipts = res.receipts;
    }
  });
}

function getTransactions(checkIn) {
  getTransactionsReq.send(
    `/api/client/v1/check-ins/${checkIn.id}/transactions`
  )
  .then (res => {
    if (res) {
      checkIn.transactionGroups = res.transactionGroups;
      checkIn.transactions = res.transactions;
    }
  });
}

function calculateSummary() {
  billingSummary.receiptsTotal = 0;
  billingSummary.cancelledSum = 0;
  billingSummary.transactionsTotal = 0;
  billingSummary.balance = 0;

  checkIns.value.forEach(checkIn => {
    billingSummary.receiptsTotal += checkIn.receiptsTotal;
    billingSummary.cancelledSum += checkIn.cancelledSum;
    billingSummary.transactionsTotal += checkIn.transactionsTotal;
    billingSummary.balance = checkIn.transactionsTotal - checkIn.receiptsTotal;
  });

  console.log(billingSummary)
}

provide('getTransactions', getTransactions);

function onFiltersApplied(props, data) {
  props.close();

  getCheckIns();
}

function onGroupsManaged() {
  getCheckIns();
}

function onCheckedOut(data, modal) {
  getCheckIns();
  modal.close();

  if (data) {
    window.location.href = '/check-ins';
  }
}

defineExpose({
  getCheckIns
});

onMounted(() => {
  getCheckIns();
});
</script>