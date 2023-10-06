<template>
  <div>

    <!-- preview -->
    <div class="relative aspect-square bg-center bg-cover w-full rounded-xl overflow-hidden border border-primary-200" :style="`background-image: url('${previewUrl}')`">

      <!-- actions -->
      <div class="absolute left-0 bottom-0 w-full flex justify-end p-2 bg-primary-200">

        <!-- upload -->
        <label :for="props.type" class="btn btn-primary btn-small cursor-pointer" v-if="! file">
          <msr-icon>file_upload</msr-icon>
          <span>Select File</span>
        </label>
        <input type="file" accept=".jpg,.jpeg,.png" :id="props.type" class="hidden" @change="onFileSelected($event)" ref="fileInput">

        <!-- cancel -->
        <button class="btn btn-small ml-1" @click="cancel()" v-if="file">
          <msr-icon>close</msr-icon>
          <span>Clear</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount } from "vue";

let props = defineProps([
  'type'
]);

let emits = defineEmits([
  'selected'
]);

let fileInput = ref(null);
let previewUrl = ref('');
let file = ref();

function onFileSelected(e) {
  file.value = e.target.files[0];
  previewUrl.value = URL.createObjectURL(file.value);
  emits('selected', file.value);
}

function cancel() {
  URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = '';
  file.value = undefined;
  fileInput.value.value = '';
  emits('selected', '');
}

onBeforeUnmount(() => {
  URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = '';
  file.value = undefined;
  fileInput.value.value = '';
});
</script>