<template>
  <info-section section-title="Transactions">
    <div v-if="props.req.success">
      <div class="py-4">
        <toggle-section v-for="(booking, index) in bookings" :key="index" class="row-item">
          <template #title>
            <div class="row tight">
              <div class="col-2">
                <p class="leading-none">Room {{ booking.room.number }}</p>
              </div>
              <div class="col-2">
                <p class="leading-none text-right currency" v-if="booking.cancelled === 0">{{ booking.totalAmount }}</p>
              </div>
            </div>
          </template>
          
          <!-- transgroups -->
          <div class="py-2">
            <template v-for="(type, index) in booking.transGroups" :key="index">
              <div v-if="+type.sum !== 0" class="data-row pl-2 row-item">
                <div class="data-info">
                  <div class="row tight">
                    <div class="col-2">
                      <p class="leading-none">{{ type.name }}</p>
                      <p class="leading-none text-xs mt-1">{{ type.transactions.length }} Transactions</p>
                    </div>
                    <div class="col-2">
                      <p class="leading-none text-right">{{ type.sum }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- view transactions -->
                <div class="data-actions">
                  <modal-dialog :dialog-title="`Transactions for ${type.code} - ${type.name}`">
                    <template #trigger>
                      <button class="btn btn-small btn-round">
                        <msr-icon>chevron_right</msr-icon>
                      </button>
                    </template>
                    <template #default="defaultProps">
                      <list-transactions :transactions="type.transactions"></list-transactions>
                    </template>
                  </modal-dialog>
                </div>
              </div>
            </template>
          </div>
        </toggle-section>
      </div>
        
      <!-- summary -->
      <div class="grid gap-2 p-6">
        <div class="p-6 py-4 grid grid-cols-2 gap-2 items-center rounded-xl bg-primary-200">
          <p class="leading-none">Taxable Amt.</p>
          <p class="leading-none text-xl text-right currency">{{ props.taxableAmount }}</p>
        </div>
        <div class="p-6 py-4 grid grid-cols-2 gap-2 items-center rounded-xl bg-primary-100">
          <p class="leading-none">Total CGST</p>
          <p class="leading-none text-xl text-right currency">{{ props.totalCgst }}</p>
        </div>
        <div class="p-6 py-4 grid grid-cols-2 gap-2 items-center rounded-xl bg-primary-100">
          <p class="leading-none">Total SGST</p>
          <p class="leading-none text-xl text-right currency">{{ props.totalSgst }}</p>
        </div>
        <div class="p-6 py-4 grid grid-cols-2 gap-2 items-center rounded-xl bg-primary-100">
          <p class="leading-none">Total Amt.</p>
          <p class="leading-none text-xl text-right currency">{{ props.totalAmount }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <loading-dots :progress="props.req.progress" :message="props.req.message"></loading-dots>
    </div>
  </info-section>
</template>
<script setup>
import ListTransactions from './ListTransactions.vue';
import { onMounted, provide, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let props = defineProps([
  'req',
  'bookings',
  'taxableAmount',
  'totalCgst',
  'totalSgst',
  'totalAmount',
]);

let getTransactionsReq = reactive(useApi());
let transactions = ref([]);
let transactionGroups = ref([]);
let taxableAmount = ref();
let totalCgst = ref();
let totalSgst = ref();
let totalAmount = ref();

function getTransactions() {
  getTransactionsReq.send(
    `/api/client/v1/check-ins/${props.checkInId}/transactions`
  )
  .then (res => {
    if (res) {
      transactions.value = res.transactions;
      transactionGroups.value = res.transactionGroups;
      taxableAmount.value = res.taxableAmount;
      totalCgst.value = res.totalCgst;
      totalSgst.value = res.totalSgst;
      totalAmount.value = res.totalAmount;
    }
  });
}

provide('getTransactions', getTransactions);

function onTransactionCreated(props, data) {
  getTransactions();
  props.close();
}

defineExpose({
  getTransactions
});

onMounted(() => {
  // getTransactions();
});
</script>