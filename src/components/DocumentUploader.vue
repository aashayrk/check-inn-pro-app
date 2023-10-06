<template>
  <div>
    <modal-dialog size="xsm" @open="onOpen()" @close="onClose()">
      <template #trigger>
        <slot></slot>
      </template>
      <template #default="modalProps">
        <info-section section-title="Upload Document">
          <api-request :req="saveDocumentReq" @reset="saveDocumentReq.reset()" @retry="saveDocument(modalProps)">
            <div>

              <!-- preview -->
              <div class="relative" v-if="previewUrl">
                <img :src="previewUrl" class="w-full h-auto">
                
                <!-- clear -->
                <div class="actions p-6 py-4">
                  <button class="btn btn-small btn-primary" @click="clear()" :disabled="saveDocumentReq.progress">
                    <span>Clear</span>
                  </button>
                </div>
              </div>
              
              <!-- dummy -->
              <div v-else>
                <div class="w-full aspect-square flex items-center justify-center relative bg-primary-100">
                  <p class="leading-none">No file selected !</p>
                </div>
                <div class="p-6 py-2">
                  <field-error :errors="saveDocumentReq.errors.file"></field-error>
                </div>
                
                <!-- select -->
                <div class="actions p-6 py-4">
                  <label for="file" class="btn btn-primary btn-small cursor-pointer">
                    <span>Select File</span>
                    <msr-icon>arrow_forward</msr-icon>
                  </label>
                  <input type="file" accept=".jpg,.jpeg,.png" id="file" class="hidden" @change="onFileSelected($event)" ref="fileInput">
                </div>
              </div>

              <!-- info -->
              <div class="p-6">

                <!-- type -->
                <div>
                  <label for="">Document Type</label>
                  <select class="input" v-model="documentType">
                    <option value="">Select Document</option>
                    <option value="Pan Card">Pan Card</option>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Drivers Licence">Driver's Licence</option>
                    <option value="Passport">Passport</option>
                    <option value="Photo">Photo</option>
                    <option value="Logo">Logo</option>
                    <option value="Other">Other</option>
                  </select>
                  <field-error :errors="saveDocumentReq.errors.documentType"></field-error>
                </div>
  
                <!-- number -->
                <div class="mt-4">
                  <label for="">Document ID / Number</label>
                  <input type="text" class="input" v-model="documentNumber">
                  <field-error :errors="saveDocumentReq.errors.documentNumber"></field-error>
                </div>
              </div>

              <!-- actions -->
              <div class="actions p-6">
  
                <!-- cancel -->
                <button class="btn ml-1" @click="cancel(modalProps)" :disabled="saveDocumentReq.progress">
                  <span>Cancel</span>
                </button>
                
                <!-- save -->
                <button class="btn btn-primary ml-1" @click="saveDocument(modalProps)" :disabled="saveDocumentReq.progress">
                  <span>{{ file ? 'Upload and Save' : 'Save' }}</span>
                  <msr-icon>arrow_forward</msr-icon>
                </button>
              </div>
            </div>
          </api-request>
        </info-section>
      </template>
    </modal-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useApi } from "@/services/api";

let props = defineProps([
  'resourceUrl',
  'document'
]);
let emits = defineEmits([
  'uploaded'
]);

let fileInput = ref(null);
let previewUrl = ref('');
let documentType = ref('Pan Card');
let documentNumber = ref('');
let file = ref();
let saveDocumentReq = reactive(useApi());
let mode = ref('create');

function saveDocument(modal) {
  let formData = new FormData();
  let url = props.resourceUrl;

  if (file.value) {
    formData.append('file', file.value);
  }

  formData.append('documentType', documentType.value);
  formData.append('documentNumber', documentNumber.value);
  
  if (mode.value === 'update') {
    formData.append('_method', 'PATCH');
    url += `/${props.document.id}`;
  }

  saveDocumentReq.send(url, 'POST', formData)
    .then (res => {
      if (res) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = res.url;
        file.value = undefined;
        fileInput.value = '';

        emits('uploaded', res.document);

        modal.close();
      }
    });
}

function onFileSelected(e) {
  file.value = e.target.files[0];
  previewUrl.value = URL.createObjectURL(file.value);
}

function clear() {
  if (file.value) {
    URL.revokeObjectURL(previewUrl.value);
    file.value = undefined;
    fileInput.value = '';
  }

  previewUrl.value = '';
}

function cancel(modalProps) {
  clear();
  modalProps.close();
}

function onOpen() {
  if (props.document) {
    previewUrl.value = props.document.url;
    documentType.value = props.document.type;
    documentNumber.value = props.document.number;
    mode.value = 'update';
  }
}

function onClose() {
  clear();
  saveDocumentReq.errors = {};
}
</script>