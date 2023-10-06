<template>
  <div>
    <div v-if="props.req.success">
      <div v-if="count">
        <slot></slot>
      </div>
      <div v-else>
        <div class="p-6">
          <p class="leading-none">{{ props.message ?? 'No data found!' }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="p-6">
        <p class="leading-none">{{ props.req.message }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
let props = defineProps([
  'req',
  'count',
  'message'
]);
</script>