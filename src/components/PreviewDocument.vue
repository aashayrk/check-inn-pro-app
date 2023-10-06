<template>
  <div>

    <!-- img -->
    <modal-dialog size="xsm" :disabled="! document">
      <template #trigger>
        <slot name="trigger"></slot>
      </template>
      <template #default="defaultProps">
        <info-section section-title="Preview">
          <img :src="document.url" :alt="document.type" class="w-full h-auto rounded-b-xl">
        </info-section>
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