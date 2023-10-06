<template>
  <div>
    
    <!-- special instructions -->
    <info-section section-title="Special Instructions">
      <!-- <template #actions>
        <modal-dialog :disabled="props.checkIn && props.checkIn.checked_out === 1 || userAbilities.deny('createInstruction', 'checkIns')">
          <template #trigger>
            <button class="btn btn-primary" :disabled="props.checkIn && props.checkIn.checked_out === 1 || userAbilities.deny('createInstruction', 'checkIns')">
              <span>Add Instruction</span>
              <msr-icon>add</msr-icon>
            </button>
          </template>
          <template #default="defaultProps">
            <info-section section-title="Add Instruction">
              <add-instruction :check-in="checkIn" @close="onInstructionAdded(defaultProps, $event)"></add-instruction>
            </info-section>
          </template>
        </modal-dialog>
      </template> -->
      <div v-if="getInstructionsReq.success">
        <div v-if="instructions.length">
          <div class="py-4">
            <div class="data-row" v-for="(item, index) in instructions" :key="index">
              <div class="data-info">
                <div class="row tight">
                  <div class="col-1">
                    <div class="flex items-center">
                      <msr-icon class="pr-4 flex-shrink-0 text-amber-400">info</msr-icon>
                      <p class="leading-none">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="data-actions flex">
                <modal-dialog :disabled="userAbilities.deny('modifyInstruction', 'checkIns')">
                  <template #trigger>
                    <button class="btn btn-small btn-round" :disabled="userAbilities.deny('modifyInstruction', 'checkIns')">
                      <msr-icon>edit</msr-icon>
                    </button>
                  </template>
                  <template #default="defaultProps">
                    <info-section section-title="Edit Instruction">
                      <edit-instruction :check-in="props.checkIn" :instruction="item" @close="onInstructionUpdated(defaultProps, $event)"></edit-instruction>
                    </info-section>
                  </template>
                </modal-dialog>
                <modal-dialog class="ml-1" :disabled="userAbilities.deny('destroyInstruction', 'checkIns')">
                  <template #trigger>
                    <button class="btn btn-small btn-round" :disabled="userAbilities.deny('destroyInstruction', 'checkIns')">
                      <msr-icon>delete</msr-icon>
                    </button>
                  </template>
                  <template #default="defaultProps">
                    <info-section dialog-title="Delete Instruction">
                      <confirm-delete @confirm="deleteInstruction(defaultProps, item)" @cancel="defaultProps.close()">
                        <p class="leading-tight">
                          Are you sure you want to delete this instruction? This action cannot be undone!
                        </p>
                      </confirm-delete>
                    </info-section>
                  </template>
                </modal-dialog>
              </div> -->
            </div>
          </div>
        </div>
        <div class="p-6" v-else>
          <p class="leading-none">No instructions as such!</p>
        </div>
      </div>
      <div v-else>
        <loading-dots :progress="getInstructionsReq.progress" :message="getInstructionsReq.message"></loading-dots>
      </div>
    </info-section>
  </div>
</template>
<script setup>
// import AddInstruction from './AddInstruction.vue';
// import EditInstruction from './EditInstruction.vue';
import { reactive, ref, onMounted, inject } from 'vue';
import { useApi } from '@/services/api.js';

let props = defineProps([
  'checkInId',
  'checkIn'
]);

let userAbilities = inject('userAbilities');

let instructions = ref([]);
let getInstructionsReq = reactive(useApi());

function getInstructions() {
  getInstructionsReq.send(
    `/api/client/v1/check-ins/${props.checkInId}/instructions`
  )
  .then (res => {
    if (res) {
      instructions.value = res.instructions;
    }
  });
}

function onInstructionAdded(props, data) {
  props.close();
  getInstructions();
}

function onInstructionUpdated(props, data) {
  props.close();
  getInstructions();
}

function deleteInstruction(handle, instruction) {
  getInstructionsReq.send(
    `/api/client/v1/check-ins/${props.checkInId}/instructions/${instruction.id}`,
    'DELETE'
  )
  .then (res => {
    if (res) {
      getInstructions();
      handle.close();
    }
  });
}

onMounted(() => {
  getInstructions();
});
</script>