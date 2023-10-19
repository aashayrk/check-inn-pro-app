<template>
  <div class="bg-white rounded-none">

    <!-- title -->
    <div class="h-10 px-6 border-b border-stone-100 rounded-t-xl flex items-center">
      <p class="leading-none text-xs font-bold uppercase relative top-0.5">{{ props.sectionTitle ?? 'Page Section' }}</p>
    </div>

    <!-- actions -->
    <div class="p-6 flex items-center justify-end" v-if="props.actions">
      <slot name="actions"></slot>
    </div>

    <!-- content -->
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

let props = defineProps([
  'sectionTitle',
  'actions'
]);
</script>