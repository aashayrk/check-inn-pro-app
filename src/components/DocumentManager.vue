<template>
  <div>

    <!-- preview -->
    <div v-if="getDocumentReq.success">
      <div class="relative aspect-square bg-center bg-cover w-full rounded-xl overflow-hidden border border-primary-200" :style="`background-image: url('${previewUrl}')`">
  
        <!-- overlay -->
        <div class="absolute top-0 left-0 z-20 w-full h-full bg-white flex flex-col bg-opacity-90 backdrop-blur-sm" v-if="saveDocumentReq.progress || saveDocumentReq.success === false">
          <div class="p-4">
            <p class="leading-none">{{ saveDocumentReq.message }}</p>
          </div>
          <div class="p-2 flex justify-end mt-auto bg-primary-200">
            <button class="btn btn-small" @click="saveDocumentReq.reset()">
              <msr-icon>arrow_back</msr-icon>
              <span>Back</span> 
            </button>
            <button class="btn btn-primary btn-small ml-1" @click="saveDocument()">
              <msr-icon>refresh</msr-icon>
              <span>Retry</span>
            </button>
          </div>
        </div>

        <!-- actions -->
        <div class="absolute left-0 bottom-0 w-full flex justify-end p-2 bg-primary-200" v-if="! disabled">

          <!-- upload -->
          <label :for="props.type" class="btn btn-primary btn-small cursor-pointer" v-if="! file">
            <msr-icon>file_upload</msr-icon>
            <span>Select File</span>
          </label>
          <input type="file" accept=".jpg,.jpeg,.png" :id="props.type" class="hidden" @change="onFileSelected($event)" ref="fileInput">
          
          <!-- cancel -->
          <button class="btn btn-small ml-1" @click="cancel()" :disabled="saveDocumentReq.progress" v-if="file">
            <msr-icon>close</msr-icon>
            <span>Cancel</span>
          </button>
          
          <!-- save -->
          <button class="btn btn-primary btn-small ml-1" @click="saveDocument()" :disabled="saveDocumentReq.progress" v-if="file">
            <msr-icon>check</msr-icon>
            <span>Upload</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <loading-dots :progress="getDocumentReq.progress" message="Generating preview..."></loading-dots>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useApi } from "@/services/api";

let props = defineProps([
  'resourceUrl',
  'type'
]);
let emits = defineEmits([
  'selected'
]);

let fileInput = ref(null);
let disabled = ref(false);
let previewUrl = ref('');
let file = ref();
let getDocumentReq = reactive(useApi());
let saveDocumentReq = reactive(useApi());

function getDocument() {
  getDocumentReq.send(props.resourceUrl)
    .then (res => {
      if (res) {
        if (res.url) {
          previewUrl.value = res.url;
          disabled.value = true;

          emits('selected', res.url);
        }
      }
    });
}

function saveDocument() {
  let formData = new FormData();
  formData.append('file', file.value);
  formData.append('_method', 'PATCH');

  saveDocumentReq.send(props.resourceUrl, 'POST', formData)
    .then (res => {
      if (res) {
        URL.revokeObjectURL(previewUrl.value);
        file.value = undefined;
        fileInput.value.value = '';
        previewUrl.value = res.url;

        emits('selected', res.url);
      }
    });
}

function onFileSelected(e) {
  file.value = e.target.files[0];
  previewUrl.value = URL.createObjectURL(file.value);
}

function cancel() {
  URL.revokeObjectURL(previewUrl.value);
  file.value = undefined;
  fileInput.value.value = '';
  saveDocumentReq.reset();
  disabled.value = false;
  getDocument();
}

onMounted(() => {
  getDocument();
});
</script>