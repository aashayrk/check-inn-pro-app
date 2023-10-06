<template>
  <div>

    <!-- details -->
    <div>
      <div class="p-6" v-if="section === 'details'">

        <!-- actions -->
        <!-- <div class="actions" v-if="! props.receipt.cancelled">
          <button class="btn btn-round" @click="section = 'edit'">
            <msr-icon>edit</msr-icon>
          </button>
          <button class="btn ml-2" @click="section = 'delete'" title="Cancel Receipt">
            <span>Cancel</span>
          </button>
        </div> -->
        <div class="border border-stone-100 rounded-xl">
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Payment Mode</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.receipt.pay_mode.code }} - {{ props.receipt.pay_mode.name }}</p>
            </div>
          </div>
          <div class="row tight" v-if="props.receipt.pay_mode.code === 'CHQ'">
            <div class="col-2">
              <p class="leading-none">Cheque Details</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.receipt.cheque_number }} / {{ props.receipt.cheque_date }}</p>
            </div>
          </div>
          <div class="row tight" v-if="props.receipt.pay_mode.code === 'CHQ'">
            <div class="col-2">
              <p class="leading-none">Bank</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.receipt.cheque_bank }}</p>
            </div>
          </div>
          <div class="row tight" v-if="! (props.receipt.pay_mode.code === 'CHQ' || props.receipt.pay_mode.code === 'CAS')">
            <div class="col-2">
              <p class="leading-none">Transaction ID</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.receipt.transaction_id }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Date</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.receipt.date }}</p>
            </div>
          </div>
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Amount</p>
            </div>
            <div class="col-2">
              <p class="leading-none currency">{{ props.receipt.amount }}</p>
            </div>
          </div>
          <div class="row tight" v-if="props.receipt.cancelled">
            <div class="col-2">
              <p class="leading-none">Status</p>
            </div>
            <div class="col-2 col-tags">
              <p class="tag bg-red-300">Cancelled</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- edit -->
      <!-- <div v-if="section === 'edit'">
        <div class="px-6 mt-6">
          <p class="tag bg-primary-200">Edit Receipt</p>
        </div>
        <edit-receipt :receipt="props.receipt" :check-in="props.booking" @close="onReceiptUpdated()"></edit-receipt>
      </div> -->
  
      <!-- delete -->
      <!-- <div v-if="section === 'delete'">
        <api-request :req="deleteReq" @retry="deleteReceipt()" @reset="deleteReq.reset()">
          <div class="px-6 mt-6">
            <p class="tag bg-primary-200">Cancel Receipt</p>
          </div>
          <confirm-delete @cancel="section = 'details'" @confirm="deleteReceipt()">
            <div>
              <label for="">Reason for Cancellation</label>
              <input type="text" class="input" v-model="cancellationNote">
              <field-error :errors="deleteReq.errors.cancellationNote"></field-error>
            </div>
          </confirm-delete>
        </api-request>
      </div> -->
    </div>
  </div>
</template>
<script setup>
// import EditReceipt from './EditReceipt.vue';
import { reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let section = ref('details');
let deleteReq = reactive(useApi());
let cancellationNote = ref('');

let props = defineProps([
  'receipt',
  'booking'
]);

let emits = defineEmits([
  'receipt-updated',
  'receipt-deleted'
]);

function onReceiptUpdated() {
  section.value = 'details';
  emits('receipt-updated');
}

function deleteReceipt() {
  deleteReq.send(
    `/api/client/v1/bookings/${props.receipt.booking_id}/receipts/${props.receipt.id}`,
    'DELETE',
    {
      cancellationNote: cancellationNote.value
    }
  )
  .then (res => {
    if (res) {
      section.value = 'details';
      emits('receipt-cancelled');
    }
  });
}
</script>