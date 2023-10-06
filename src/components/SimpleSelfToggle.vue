<template>
  <div>

    <!-- title -->
    <div class="flex justify-between items-center cursor-pointer" :class="{'bg-stone-50': isOpen}">
      
      <!-- title -->
      <div class="flex-grow" @click="toggle">
        <slot name="title" :toggle="toggle"></slot>
      </div>

      <!-- indicator -->
      <button class="btn btn-round btn-small btn-transparent mx-6" @click="toggle">
        <msr-icon v-if="! isOpen">expand_more</msr-icon>
        <msr-icon v-if="isOpen">expand_less</msr-icon>
      </button>
    </div>

    <!-- content -->
    <div v-if="isOpen" class="border-b border-stone-200">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

let isOpen = ref(false);
let emits = defineEmits([
  'open',
  'close'
]);

function toggle() {
  isOpen.value = ! isOpen.value;

  if (isOpen.value) {
    emits('open');
  }
  else {
    emits('close');
  }
}
</script>