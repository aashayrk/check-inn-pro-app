import { ref } from 'vue';
import { useStorage } from '@/services/storage.js';
import { Toast } from '@capacitor/toast';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';
import axios from 'axios';
import moment from 'moment';

export function useReports(title) {
  let storage = useStorage();
  let host = ref(import.meta.env.VITE_API_HOST);
  let progress = ref(false);

  let download = async (previewUrl, callback) => {
    progress.value = true;

    axios({
      url: `${host.value}/api/client-app/v1/reports/download`,
      method: 'POST',
      data: {
        previewUrl,
        title,
      },
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${await storage.get('token')}`
      },
    })
    .then (res => {
      let reader = new FileReader();
      reader.readAsDataURL(res.data);

      reader.onloadend = async function () {
        let filename = `${title}-${moment().format('DD-MM-YYYY HH:mm')}`;

        Filesystem.writeFile({
          directory: Directory.Cache,
          path: `${filename}.pdf`,
          recursive: true,
          data: reader.result,
        })
        .then (result => {
          if (result) {
            callback(result);
          }
          else {
            callback(false);
          }
        })
      }
    })
    .finally(() => {
      progress.value = false;
    })
  }

  let getDataUrl = async (previewUrl, callback) => {
    progress.value = true;

    axios({
      url: `${host.value}/api/client-app/v1/reports/download`,
      method: 'POST',
      data: {
        previewUrl,
        title,
      },
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${await storage.get('token')}`
      },
    })
    .then (res => {
      let reader = new FileReader();
      reader.readAsDataURL(res.data);

      reader.onloadend = async function () {
        let filename = `${title}-${moment().format('DD-MM-YYYY HH:mm')}`;
        callback(result.data, filename);
      }
    })
    .finally(() => {
      progress.value = false;
    })
  }

  let mail = async (previewUrl) => {
    progress.value = true;

    axios({
      url: `${host.value}/api/client-app/v1/reports/mail`,
      method: 'POST',
      data: {
        previewUrl,
        title
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
      else {
        Toast.show({
          text: `Unable to send mail!`
        })
      }
    })
    .finally(() => {
      progress.value = false;
    })
  }

  let share = async (previewUrl) => {
    download(previewUrl, result => {
      if (result) {
        Share.share({
          url: result.uri
        })
      }
      else {
        Toast.show({
          text: 'Unable to share this report!'
        })
      }
    })
  }

  let view = async (previewUrl) => {
    Browser.open({
      url: previewUrl
    })
  }

  return {
    download,
    getDataUrl,
    mail,
    share,
    view,
    progress,
  }
}