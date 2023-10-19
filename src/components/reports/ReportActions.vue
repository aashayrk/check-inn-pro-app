<template>
  <div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStorage } from '@/services/storage.js';
import { Toast } from '@capacitor/toast';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import axios from 'axios';

let storage = useStorage();
let host = ref(import.meta.env.VITE_API_HOST);
let downloadProgress = ref(false);
let mailProgress = ref(false);

async function mail(previewUrl, name) {
  mailProgress.value = true;

  axios({
    url: `${host.value}/api/client-app/v1/reports/mail`,
    method: 'POST',
    data: {
      previewUrl,
      title: props.title,
    },
    headers: {
      Authorization: `Bearer ${await storage.get('token')}`
    },
  })
  .then (res => {
    if (res) {
      Toast.show({
        text: `Email sent.`
      })
    }
  })
  .finally(() => {
    mailProgress.value = false;
  })
}

async function download(previewUrl, name) {
  downloadProgress.value = true;

  axios({
    url: `${host.value}/api/client-app/v1/reports/download`,
    method: 'POST',
    data: {
      previewUrl,
      title: props.title,
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
      let filename = `${props.title}`;

      Filesystem.writeFile({
        directory: Directory.Documents,
        path: `checkinn-pro/reports/${filename}.pdf`,
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
    downloadProgress.value = false;
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
</script>