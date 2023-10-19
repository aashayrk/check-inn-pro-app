<template>
  <div>

    <!-- bill number -->
    <div class="p-6 border-b border-stone-100">
      <div class="p-6 py-4 bg-stone-100 rounded-xl grid grid-cols-2 gap-2" v-if="parentCheckIn && parentCheckIn.bill_number">
        <p class="leading-none">Bill Number</p>
        <p class="leading-none text-right text-xl">{{ parentCheckIn.bill_number }}</p>
      </div>
      <div class="flex items-center justify-between" v-else>
        <div>
          <p class="leading-none">Bill Number</p>
          <p class="leading-none text-xs mt-1">Generate Bill Number</p>
        </div>
        <div class="sw">
          <label for="">
            <input type="checkbox" v-model="billNumber">
          </label>
        </div>
      </div>
    </div>
    
    <!-- bill/estimate type -->
    <div class="py-4">
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Invoice (GST)</p>
        </div>
        <div class="col-2 flex justify-end">

          <!-- share -->
          <button class="btn btn-round btn-small ml-1" @click="share(previewUrls.gstInvoice, 'GST-Invoice')" :disabled="sharing === 'GST-Invoice'">
            <msr-icon>share</msr-icon>
          </button>

          <!-- download -->
          <button class="btn btn-round btn-small ml-1" @click="download(previewUrls.gstInvoice, 'GST-Invoice')" :disabled="! previewUrls.gstInvoice || downloading === 'GST-Invoice'">
            <msr-icon>download</msr-icon>
          </button>

          <!-- mail -->
          <button class="btn btn-round btn-small ml-1" @click="mail(previewUrls.gstInvoice, 'GST-Invoice')" :disabled="(mailReq.progress && mailing === 'GST-Invoice') || ! previewUrls.gstInvoice">
            <msr-icon>send</msr-icon>
          </button>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Invoice (Summary)</p>
        </div>
        <div class="col-2 flex justify-end">

          <!-- share -->
          <button class="btn btn-round btn-small ml-1" @click="share(previewUrls.invoice, 'Invoice')" :disabled="sharing === 'Invoice'">
            <msr-icon>share</msr-icon>
          </button>

          <!-- download -->
          <button class="btn btn-round btn-small ml-1" @click="download(previewUrls.invoice, 'Invoice')" :disabled="! previewUrls.invoice || downloading === 'Invoice'">
            <msr-icon>download</msr-icon>
          </button>

          <!-- mail -->
          <button class="btn btn-round btn-small ml-1" @click="mail(previewUrls.invoice, 'Invoice')" :disabled="(mailReq.progress && mailing === 'Invoice') || ! previewUrls.invoice">
            <msr-icon>send</msr-icon>
          </button>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Transaction Details</p>
        </div>
        <div class="col-2 flex justify-end">

          <!-- share -->
          <button class="btn btn-round btn-small ml-1" @click="share(previewUrls.transactions, 'Transactions')" :disabled="sharing === 'Transactions'">
            <msr-icon>share</msr-icon>
          </button>

          <!-- download -->
          <button class="btn btn-round btn-small ml-1" @click="download(previewUrls.transactions, 'Transactions')" :disabled="! previewUrls.transactions || downloading === 'Transactions'">
            <msr-icon>download</msr-icon>
          </button>

          <!-- mail -->
          <button class="btn btn-round btn-small ml-1" @click="mail(previewUrls.transactions, 'Transactions')" :disabled="(mailReq.progress && mailing === 'Transactions') || ! previewUrls.transactions">
            <msr-icon>send</msr-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import { useStorage } from '@/services/storage.js';
import { Toast } from '@capacitor/toast';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import axios from 'axios';

let props = defineProps([
  'checkIn',
]);

let emits = defineEmits([
  'close'
]);

let storage = useStorage();
let host = ref(import.meta.env.VITE_API_HOST);
let previewUrls = reactive({
  invoice: null,
  gstInvoice: null,
  transactions: null,
})

let billNumber = ref(false);
let parentCheckIn = ref();
let previewUrlsReq = reactive(useApi());
let mailReq = reactive(useApi());
let mailing = ref('');
let downloading = ref('');
let sharing = ref('');

function getPreviewUrls() {
  previewUrlsReq.send(
    `/api/client-app/v1/check-ins/${props.checkIn.id}/bills/preview`,
    'POST',
    {
      billNumber: billNumber.value,
    }
  )
  .then (res => {
    if (res) {
      previewUrls.invoice = res.invoice;
      previewUrls.gstInvoice = res.gstInvoice;
      previewUrls.transactions = res.transactions;
    }
  });
}

async function mail(previewUrl, name) {
  mailing.value = name;

  mailReq.send(
    `/api/client-app/v1/check-ins/${props.checkIn.id}/bills/mail`,
    'POST',
    {
      previewUrl
    }
  )
  .then (res => {
    if (res) {
      Toast.show({
        text: `Email sent.`
      })
    }
  })
  .finally(() => {
    mailing.value = '';
  })
}

async function download(previewUrl, name) {
  downloading.value = name;

  axios({
    url: `${host.value}/api/client-app/v1/check-ins/${props.checkIn.id}/bills/download`,
    method: 'POST',
    data: {
      previewUrl
    },
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${await storage.get('token')}`
    },
  })
  .then (res => {
    let reader = new FileReader();
    reader.readAsDataURL(res.data);

    reader.onloadend = function () {
      let filename = `${props.checkIn.folio_number}-${name}`;

      Filesystem.writeFile({
        directory: Directory.Documents,
        path: `checkinn-pro/bills/${filename}.pdf`,
        recursive: true,
        data: reader.result,
      })
      .then (result => {
        Toast.show({
          text: 'PDF downloaded to ' + result.uri
        })
      })
    }
  })
  .finally(() => {
    downloading.value = '';
  })
}

async function share(previewUrl, name) {
  sharing.value = name;

  axios({
    url: `${host.value}/api/client-app/v1/check-ins/${props.checkIn.id}/bills/download`,
    method: 'POST',
    data: {
      previewUrl
    },
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${await storage.get('token')}`
    },
  })
  .then (res => {
    let reader = new FileReader();
    reader.readAsDataURL(res.data);

    reader.onloadend = function () {
      let filename = `${props.checkIn.folio_number}-${name}`;

      Filesystem.writeFile({
        directory: Directory.Documents,
        path: `checkinn-pro/bills/${filename}.pdf`,
        recursive: true,
        data: reader.result,
      })
      .then (result => {
        Share.share({
          url: result.uri
        })
      })
    }
  })
  .finally(() => {
    sharing.value = '';
  })
}

onMounted(() => {
  getPreviewUrls();
});
</script>