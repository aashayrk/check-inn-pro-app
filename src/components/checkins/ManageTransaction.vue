<template>
  <div>

    <!-- details -->
    <div>
      <div class="p-6" v-if="section === 'details'">

        <!-- actions -->
        <!-- <div class="actions">
          <button class="btn btn-round" @click="section = 'edit'" :disabled="userAbilities.deny('modify', 'transactions')">
            <msr-icon>edit</msr-icon>
          </button>
          <button class="btn btn-round ml-2" @click="section = 'delete'" :disabled="userAbilities.deny('destroy', 'transactions')">
            <msr-icon>delete</msr-icon>
          </button>
        </div> -->
        <!-- <p class="tag bg-primary-200">Transaction Details</p> -->
        <div class="border border-stone-100 rounded-xl">
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Transaction type</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.transaction.type.code }} - {{ props.transaction.type.name }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Transaction Date</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.transaction.date }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Quantity</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.transaction.quantity }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Rate</p>
            </div>
            <div class="col-2">
              <p class="leading- currency">{{ props.transaction.rate }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Amount</p>
            </div>
            <div class="col-2">
              <p class="leading-none currency">{{ props.transaction.amount }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">CGST</p>
            </div>
            <div class="col-2">
              <p class="leading-none currency">{{ props.transaction.cgst_amount }} @ {{ props.transaction.cgst }}%</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">SGST</p>
            </div>
            <div class="col-2">
              <p class="leading-none currency">{{ props.transaction.sgst_amount }} @ {{ props.transaction.sgst }}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- edit -->
      <!-- <div v-if="section === 'edit'">
        <div class="px-6 mt-6">
          <p class="tag bg-primary-200">Edit Transaction</p>
        </div>
        <edit-transaction :transaction="props.transaction" @close="onTransactionUpdated()"></edit-transaction>
      </div> -->
  
      <!-- delete -->
      <!-- <div v-if="section === 'delete'">
        <div class="px-6 mt-6">
          <p class="tag bg-red-500 text-white">Delete Transaction</p>
        </div>
        <confirm-delete @cancel="section = 'details'" @confirm="deleteTransaction()">
          Are you sure you want to delete this transaction? This action cannot be undone!
        </confirm-delete>
      </div> -->
    </div>
  </div>
</template>
<script setup>
// import EditTransaction from './EditTransaction.vue';
import { inject, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let userAbilities = inject('userAbilities');

let section = ref('details');
let deleteTransactionReq = reactive(useApi());

let props = defineProps([
  'transaction',
  'checkIn'
]);

let emits = defineEmits([
  'transaction-updated',
  'transaction-deleted'
]);

function onTransactionUpdated() {
  section.value = 'details';
  emits('transaction-updated');
}

function deleteTransaction() {
  deleteTransactionReq.send(
    `/api/client/v1/check-ins/${props.transaction.check_in_id}/transactions/${props.transaction.id}`,
    'DELETE'
  )
  .then (res => {
    if (res) {
      emits('transaction-deleted');
    }
  });
}
</script>