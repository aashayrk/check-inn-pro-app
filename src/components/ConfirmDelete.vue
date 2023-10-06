<template>
  <div>
    <div class="p-6">
      <slot></slot>
      <div class="actions mt-12">
        <button class="btn" @click.prevent="cancel">Cancel</button>
        <button class="btn btn-primary ml-1" @click.prevent="confirm">
          <span>{{ props.action ?? 'Yes' }}</span>
          <msr-icon>arrow_forward</msr-icon>
        </button>
      </div>
    </div>
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

function cancel() {
  emits('cancel');
}

function confirm() {
  emits('confirm');
}

</script>