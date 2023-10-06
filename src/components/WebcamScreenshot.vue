<template>
  <modal-dialog size="xsm" @open="prepareCamera()" @close="reset()">
    <template #trigger>
      <button class="btn btn-round">
        <msr-icon>camera</msr-icon>
      </button>
    </template>
    <template #default="modalProps">
      <info-section section-title="Capture Photograph">
        <div v-if="cameraReady">

          <!-- camera -->
          <div class="camera relative rounded-xl" v-if="! imageUrl">
          
            <!-- canvas -->
            <canvas ref="canvasEle" class="hidden"></canvas>
            
            <!-- cam preview -->
            <video ref="videoEle" class="aspect-square"></video>
            
            <!-- capture trigger -->
            <div class="actions p-6">
              <button class="btn btn-primary" @click="captureImage()">
                <msr-icon>camera</msr-icon>
                <span>Capture</span>
              </button>
            </div>
          </div>
          <div v-if="imageUrl">
            <api-request :req="saveDocumentReq" @retry="saveImage()" @reset="saveDocumentReq.reset()">
        
              <!-- preview -->
              <div class="aspect-square">
                <img :src="imageUrl" class="w-full h-full">
              </div>
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
              <div class="actions p-6">
                <button class="btn" @click="switchToCamera()">
                  <span>Cancel</span>
                </button>
                <button class="btn btn-primary ml-1" @click="saveImage(modalProps)">
                  <span>Save Image</span>
                  <msr-icon>arrow_forward</msr-icon>
                </button>
              </div>
            </api-request>
          </div>
        </div>
        <div v-else>
          <loading-dots :progress="! cameraReady"></loading-dots>
        </div>
      </info-section>
    </template>
  </modal-dialog>
</template>
<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';

let cameraReady = ref(false);
let videoEle = ref(null);
let canvasEle = ref(null);
let videoStream = ref();
let imageBlob = ref();
let imageUrl = ref();
let documentType = ref('');
let documentNumber = ref();
let saveDocumentReq = reactive(useApi());
let emits = defineEmits([
  'uploaded'
]);
let props = defineProps([
  'resourceUrl'
]);

function prepareCamera() {
  navigator.mediaDevices.getUserMedia({
    video: {
      width: 720,
      height: 720
    },
    audio: false,
  })
  .then (stream => {
    if (stream) {
      cameraReady.value = true;
      
      nextTick(() => {
        videoStream.value = stream;
        videoEle.value.srcObject = stream;
        videoEle.value.play();
      });
    }
  });
}

function captureImage() {
  if (videoStream.value) {
    canvasEle.value.width = videoEle.value.videoWidth;
    canvasEle.value.height = videoEle.value.videoHeight;
    canvasEle.value
      .getContext('2d')
      .drawImage(videoEle.value, 0, 0, videoEle.value.videoWidth, videoEle.value.videoHeight);
      
    canvasEle.value.toBlob(blob => {
      imageBlob.value = blob;
      imageUrl.value = URL.createObjectURL(blob);
    });
  }
}

function saveImage(modal) {
  let formData = new FormData();
  let url = props.resourceUrl;

  formData.append('file', imageBlob.value);
  formData.append('documentType', documentType.value);
  formData.append('documentNumber', documentNumber.value);

  saveDocumentReq.send(url, 'POST', formData)
    .then (res => {
      if (res) {
        reset();

        emits('uploaded');
        modal.close();
      }
    });
}

function switchToCamera() {
  reset();
  prepareCamera();
}

function reset() {
  videoStream.value.getTracks().forEach(track => {
    track.stop();
  });

  URL.revokeObjectURL(imageUrl.value);
  imageUrl.value = undefined;
  imageBlob.value = undefined;
  cameraReady.value = false;
}
</script>