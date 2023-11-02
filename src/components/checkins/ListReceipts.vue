<template>
  <div>

    <!-- payment mode -->
    <div class="py-4">
      <div class="data-row" v-for="(item, index) in props.receipts" :key="index">
        <div class="data-info">
          <div class="row tight" :class="{'opacity-50': item.cancelled === 1}">
            <div class="col-2">
              <div class="flex items-center">
                <div v-if="item.cancelled === 1" class="mr-4">
                  <msr-icon class="text-red-500">cancel</msr-icon>
                </div>
                <div>
                  <p class="leading-none text-xs">{{ item.date }}</p>
                  <p class="leading-none text-xs mt-1">{{ item.receipt_number }}</p>
                </div>
              </div>
            </div>
            <div class="col-2 text-right">
              <p class="leading-none currency">{{ item.amount }}</p>
            </div>
          </div>
        </div>
        <div class="data-actions">
  
          <!-- manage receipt -->
          <modal-dialog dialog-title="Receipt Details">
            <template #trigger>
              <button class="btn btn-round btn-small">
                <msr-icon>chevron_right</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <manage-receipt :receipt="item" :check-in="props.checkIn" @receipt-updated="getReceipts()" @receipt-cancelled="onReceiptCancelled(defaultProps)"></manage-receipt>
            </template>
          </modal-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ManageReceipt from './ManageReceipt.vue';
import { computed, inject } from 'vue';

let props = defineProps([
  'receipts',
  'checkIn'
]);

let getReceipts = inject('getReceipts');

function onReceiptCancelled(dialogProps) {
  getReceipts();
}
</script>