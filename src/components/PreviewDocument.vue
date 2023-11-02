<template>
  <div>

    <!-- img -->
    <modal-dialog size="xsm" :disabled="! document" dialog-title="Preview">
      <template #trigger>
        <slot name="trigger"></slot>
      </template>
      <template #default="defaultProps">
        <img :src="document.url" :alt="document.type" class="w-full h-auto rounded-b-xl">
      </template>
    </modal-dialog>
  </div>
</template>

<script setup>
let props = defineProps([
  'documents',
  'type'
]);

let document = props.documents.find(doc => {
  return (doc.type === props.type);
});
</script>