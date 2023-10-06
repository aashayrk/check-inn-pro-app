<template>
  <div>
    
    <!-- transaction group -->
    <div class="py-4">
      <div class="data-row row-item" v-for="(item, index) in props.transactions" :key="index">
        <div class="data-info">
          <div class="row tight">
            <div class="col-2">
              <p class="leading-none text-xs">{{ item.date }}</p>
              <p class="leading-none text-xs mt-1">{{ item.level }}</p>
            </div>
            <div class="col-2">
              <p class="leading-none currency text-right">{{ item.amount }}</p>
            </div>
          </div>
        </div>
        <div class="data-actions flex">
  
          <!-- make supplimentary -->
          <!-- <button class="btn btn-round btn-small" title="Make Supplimentary" v-if="item.type.allow_supplimentary && item.level === 'Ordinary'" @click="updateLevel(item)" :disabled="updateLevelReq.progress || userAbilities.deny('convert', 'transactions')">
            <msr-icon>north_east</msr-icon>
          </button> -->
          
          <!-- make ordinary -->
          <!-- <button class="btn btn-round btn-small" title="Make Ordinary" v-if="item.level === 'Supplimentary'" @click="updateLevel(item)" :disabled="updateLevelReq.progress || userAbilities.deny('convert', 'transactions')">
            <msr-icon>north_west</msr-icon>
          </button> -->
  
          <!-- manage transaction -->
          <modal-dialog>
            <template #trigger>
              <button class="btn btn-small btn-round ml-1" title="View Details">
                <msr-icon>chevron_right</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <info-section section-title="Transaction Details">
                <manage-transaction :transaction="item" :check-in="props.checkIn" @transaction-updated="section = 'details'; getTransactions(props.checkIn)" @transaction-deleted="section = 'details'; getTransactions(props.checkIn);"></manage-transaction>
              </info-section>
            </template>
          </modal-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ManageTransaction from './ManageTransaction.vue';
import { inject, reactive, ref } from 'vue';
import { useApi } from '@/services/api';

let props = defineProps([
  'group',
  'transactions',
  'checkIn'
]);

let section = ref('');
let getTransactions = inject('getTransactions');
let updateLevelReq = reactive(useApi());
let userAbilities = inject('userAbilities');

function updateLevel(transaction) {
  updateLevelReq.send(
    `/api/client/v1/check-ins/${props.checkIn.id}/transactions/${transaction.id}/level`,
    'POST',
    {
      transactionLevel: transaction.level === 'Ordinary' ? 'Supplimentary' : 'Ordinary'
    }
  )
  .then (res => {
    if (res) {
      getTransactions(props.checkIn);
    }
  });
}

function updateLevelForAll(slotProps, level) {
  slotProps.close();
  
  props.transactions.forEach(transaction => {
    updateLevelReq.send(
      `/api/client/v1/check-ins/${props.checkIn.id}/transactions/${transaction.id}/level`,
      'POST',
      {
        transactionLevel: level
      }
    )
    .then (res => {
      if (res) {
        getTransactions(props.checkIn);
      }
    });
  });
}
</script>