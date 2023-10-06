<template>
  <div class="msr-icon">
    <span class="material-icons-round">
      <slot>{{ props.name }}</slot>
    </span>
  </div>
</template>
<script setup>
let props = defineProps([
  'name'
]);
</script>
