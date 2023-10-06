<template>
  <div>
    <p class="leading-none text-xs text-red-500 italic mt-1" 
    v-for="(error, index) in props.errors" :key="index">{{ error }}</p>
  </div>
</template>
<script setup>
let props = defineProps([
  'errors',
]);
</script>