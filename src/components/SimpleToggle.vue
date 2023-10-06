<template>
  <div>
    <div @click="emits('toggle')">
      
      <slot name="title"></slot>
    </div>
    <div v-if="props.isOpen">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

let props = defineProps([
  'isOpen'
]);
let emits = defineEmits([
  'toggle',
  'open',
  'close'
]);
</script>