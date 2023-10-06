<template>
  <div>

    <!-- details -->
    <div>
      <div class="p-6" v-if="section === 'details'">
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
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">Level</p>
            </div>
            <div class="col-2">
              <p class="leading-none">{{ props.receipt.level }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let section = ref('details');
let deleteReq = reactive(useApi());
let cancellationNote = ref('');
let userAbilities = inject('userAbilities');

let props = defineProps([
  'receipt',
  'checkIn'
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
    `/api/client/v1/check-ins/${props.receipt.check_in_id}/receipts/${props.receipt.id}`,
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