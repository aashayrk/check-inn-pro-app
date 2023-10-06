<template>
  <div>
    <div class="py-4">
      <div class="data-row row-item" v-for="(item, index) in props.transactions" :key="index">
        <div class="data-info">
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none">{{ item.date }}</p>
            </div>
            <div class="col-2">
              <p class="leading-none currency text-right">{{ item.amount }}</p>
            </div>
          </div>
        </div>
        <div class="data-actions flex">
    
          <!-- view transaction -->
          <modal-dialog dialog-title="Transaction Details">
            <template #trigger>
              <button class="btn btn-small btn-round ml-1" title="Manage">
                <msr-icon>chevron_right</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <view-transaction :transaction="item" :booking="props.booking"></view-transaction>
            </template>
          </modal-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ViewTransaction from './ViewTransaction.vue';

let props = defineProps([
  'group',
  'transactions',
  'booking'
]);
</script>