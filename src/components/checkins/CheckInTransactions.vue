<template>
  <div>
    <info-section section-title="Transactions" class="mt-2">
      <!-- <template #actions>
        <div class="actions">
          <modal-dialog class="ml-1" :disabled="props.checkIn && props.checkIn.checked_out === 1 || userAbilities.deny('create', 'transactions')">
            <template #trigger>
              <button class="btn btn-primary" :disabled="props.checkIn && props.checkIn.checked_out === 1 || userAbilities.deny('create', 'transactions')">
                <span>Add New</span>
                <msr-icon>add</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <info-section section-title="Add Transaction">
                <add-transaction :check-in="checkIn" @close="onTransactionCreated(defaultProps, $event)"></add-transaction>
              </info-section>
            </template>
          </modal-dialog>
        </div>
      </template> -->
      <div v-if="getTransactionsReq.success">
        <div v-if="transactionGroups.length">
          <div class="py-4">
            <div class="data-row row-item" v-for="(item, index) in transactionGroups" :key="index">
              <div class="data-info">
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">{{ item.type.code }} - {{ item.type.name }}</p>
                    <p class="leading-none text-xs mt-1">{{ item.transactions.length }} Transactions</p>
                  </div>
                  <div class="col-2 text-right">
                    <p class="leading-none currency">{{ item.amount }}</p>
                  </div>
                </div>
              </div>
              <div class="data-actions">
  
                <!-- list transactions -->
                <modal-dialog dialog-title="Transactions">
                  <template #trigger>
                    <button class="btn btn-small btn-round">
                      <msr-icon>chevron_right</msr-icon>
                    </button>
                  </template>
                  <template #default="defaultProps">
                    <list-transactions :check-in="checkIn" :group="item" :transactions="item.transactions" :key="checkIn.id"></list-transactions>
                  </template>
                </modal-dialog>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6" v-else>
          <p class="leading-none">No transactions found!</p>
        </div>
        
        <!-- summary -->
        <div class="grid gap-2 p-6" v-if="transactionGroups.length">
          <div class="grid grid-cols-2 bg-primary-100 p-6 py-4 rounded-xl">
            <p class="leading-none">Taxable Amt.</p>
            <p class="leading-none currency text-right text-xl">{{ taxableAmount }}</p>
          </div>
          <div class="grid grid-cols-2 bg-primary-100 p-6 py-4 rounded-xl">
            <p class="leading-none">Total CGST</p>
            <p class="leading-none currency text-right text-xl">{{ totalCgst }}</p>
          </div>
          <div class="grid grid-cols-2 bg-primary-100 p-6 py-4 rounded-xl">
            <p class="leading-none">Total SGST</p>
            <p class="leading-none currency text-right text-xl">{{ totalSgst }}</p>
          </div>
          <div class="grid grid-cols-2 bg-primary-200 p-6 py-4 rounded-xl">
            <p class="leading-none">Total Amt.</p>
            <p class="leading-none currency text-right text-xl">{{ totalAmount }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <loading-dots :progress="getTransactionsReq" :message="getTransactionsReq.message"></loading-dots>
      </div>
    </info-section>
  </div>
</template>
<script setup>
// import AddTransaction from './AddTransaction.vue';
import ListTransactions from './ListTransactions.vue';
import { inject, onMounted, provide, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let props = defineProps([
  'checkInId',
  'checkIn',
]);

let getTransactionsReq = reactive(useApi());
let transactions = ref([]);
let transactionGroups = ref([]);
let taxableAmount = ref();
let totalCgst = ref();
let totalSgst = ref();
let totalAmount = ref();

let transactionsDialog = ref(null);

let userAbilities = inject('userAbilities');
let dialog = inject('dialog');

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
  getTransactions();
});

function onSwipeDown(e) {
  console.log(e)
}
</script>