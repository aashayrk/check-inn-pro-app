<template>
  <div>
    <info-section section-title="Receipts" class="mt-2">
      <!-- <template #actions>
        <div class="actions">
          <modal-dialog class="ml-1" ref="createReceiptDialog" :disabled="userAbilities.deny('create', 'receipts')">
            <template #trigger>
              <button class="btn btn-primary" :disabled="userAbilities.deny('create', 'receipts')">
                <span>Create New</span>
                <msr-icon>add</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <info-section section-title="Create Receipt">
                <create-receipt :check-in="checkIn" @close="onReceiptCreated(defaultProps, $event)"></create-receipt>
              </info-section>
            </template>
          </modal-dialog>
        </div>
      </template> -->
      <div v-if="getReceiptsReq.success">
        <div v-if="receiptGroups.length > 0">
          <div class="py-4">
            <div class="data-row row-item" v-for="(item, index) in receiptGroups" :key="index">
              <div class="data-info">
                <div class="row row tight">
                  <div class="col-2">
                    <p class="leading-none">{{ item.mode }}</p>
                    <p class="leading-none text-xs mt-1">{{ item.receipts.length }} Receipts</p>
                  </div>
                  <div class="col-2 text-right">
                    <p class="leading-none currency">{{ item.sum }}</p>
                  </div>
                </div>
              </div>
              <div class="data-actions">
                
                <!-- list receipts -->
                <modal-dialog>
                  <template #trigger>
                    <button class="btn btn-small btn-round">
                      <msr-icon>chevron_right</msr-icon>
                    </button>
                  </template>
                  <template #default="defaultProps">
                    <info-section :section-title="`Receipts for ${item.mode}`">
                      <list-receipts :check-in="checkIn" :group="item" :receipts="item.receipts" :key="checkIn.id"></list-receipts>
                    </info-section>
                  </template>
                </modal-dialog>
              </div>
            </div>
          </div>

          <!-- summary -->
          <div class="p-6">
            <div class="rounded-xl bg-primary-100 p-6 py-4 grid grid-cols-2 items-center">
              <p class="leading-none">Total</p>
              <p class="leading-none currency text-right text-xl">{{ sum }}</p>
            </div>
          </div>
        </div>
        <div class="p-6" v-else>
          <p class="leading-none">No receipts found!</p>
        </div>
      </div>
      <div v-else>
        <loading-dots :progress="getReceiptsReq.progress" :message="getReceiptsReq.message"></loading-dots>
      </div>
    </info-section>
  </div>
</template>
<script setup>
// import CreateReceipt from './CreateReceipt.vue';
import ListReceipts from './ListReceipts.vue';
import { onMounted, provide, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';

let userAbilities = useUserAbilities();
provide('userAbilities', userAbilities);

let props = defineProps([
  'checkInId',
  'checkIn'
]);

let emits = defineEmits([
  'total'
]);

let getReceiptsReq = reactive(useApi());
let receipts = ref([]);
let receiptGroups = ref([]);
let sum = ref();

function getReceipts() {
  getReceiptsReq.send(
    `/api/client/v1/check-ins/${props.checkInId}/receipts`
  )
  .then (res => {
    if (res) {
      receipts.value = res.receipts;
      receiptGroups.value = res.receiptGroups;
      sum.value = res.sum;

      emits('total', sum.value);
    }
  });
}

provide('getReceipts', getReceipts);

function onReceiptCreated(props, data) {
  getReceipts();
  props.close();
}

defineExpose({
  getReceipts
});

onMounted(() => {
  getReceipts();
});
</script>