<template>
  <div class="msr-icon">
    <span class="material-icons-round" :class="props.size">
      <slot>{{ props.name }}</slot>
    </span>
  </div>
</template>
<script setup>
let props = defineProps([
  'size',
  'name'
]);
</script>
