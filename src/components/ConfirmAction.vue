<template>
  <div>
    <modal-dialog>
      <template #trigger>
        <slot name="trigger"></slot>
      </template>
      <template #default="defaultProps">
        <info-section section-title="Confirm Action">
          <div class="p-6">
  
            <!-- content -->
            <slot></slot>
    
            <!-- actions -->
            <div class="actions mt-12">
              <button class="btn" @click.prevent="cancel(defaultProps)">Cancel</button>
              <button class="btn btn-primary ml-1" @click.prevent="confirm(defaultProps)">
                <span>{{ props.action ?? 'Yes' }}</span>
                <msr-icon>arrow_forward</msr-icon>
              </button>
            </div>
          </div>
        </info-section>
      </template>
    </modal-dialog>
  </div>
</template>
<script setup>

let props = defineProps([
  'dialogTitle',
  'action'
]);
let emits = defineEmits([
  'cancel',
  'confirm'
]);

function cancel(modalProps) {
  modalProps.close();
  emits('cancel');
}

function confirm(modalProps) {
  modalProps.close();
  emits('confirm');
}

</script>