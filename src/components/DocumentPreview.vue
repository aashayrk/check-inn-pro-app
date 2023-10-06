<template>
  <div class="border border-primary-200 rounded-xl overflow-hidden">
                      
    <!-- info -->
    <div class="actions justify-between items-center p-4 bg-primary-100">
      <div>
        <p class="leading-none font-bold">{{ props.document.type }}</p>
        <p class="leading-none text-xs mt-1">{{ props.document.number ?? '-' }}</p>
      </div>
    </div>
    
    <!-- preview -->
    <div class="w-full aspect-square bg-contain bg-no-repeat bg-center" :style="`background-image: url('${props.document.url}');`"></div>

    <!-- actions -->
    <div class="actions p-4" v-if="showActions">

      <!-- delete -->
      <confirm-action @confirm="emits('delete')">
        <template #trigger>
          <button class="btn btn-round">
            <msr-icon>delete</msr-icon>
          </button>
        </template>
        <p class="leading-tight">Are you sure you want to delete this document? This action cannot be undone!</p>
      </confirm-action>

      <!-- edit -->
      <document-uploader :resource-url="props.resourceUrl" :document="props.document" @uploaded="emits('refresh')">
        <button class="btn ml-1">
          <span>Edit</span>
          <msr-icon>edit</msr-icon>
        </button>
      </document-uploader>
      </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import DocumentUploader from './DocumentUploader.vue';
import ConfirmAction from '@/vue/ConfirmAction.vue';

let props = defineProps([
  'document',
  'resourceUrl',
  'actions'
]);

let emits = defineEmits([
  'delete',
  'refresh'
]);

let showActions = computed(() => {
  if (props.actions === undefined) {
    return true;
  }

  return props.actions;
});

</script>