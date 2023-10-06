<template>
  <div>

    <!-- title -->
    <div class="data-row" :class="{'bg-stone-50': isOpen}">
      <div class="data-info cursor-pointer" @click="toggle">
        <slot name="title" :toggle="toggle"></slot>
      </div>
      <div class="data-actions flex">
        <slot name="actions"></slot>

        <button class="btn btn-round btn-small btn-transparent" @click="toggle">
          <msr-icon v-if="! isOpen">expand_more</msr-icon>
          <msr-icon v-if="isOpen">expand_less</msr-icon>
        </button>
      </div>
    </div>

    <!-- content -->
    <div v-if="isOpen">
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