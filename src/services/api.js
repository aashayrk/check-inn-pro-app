import { ref } from 'vue';
import { useStorage } from './storage';
import axios from 'axios';

export function useApi () {
  let progress = ref(false);
  let success = ref(undefined);
  let message = ref('');
  let errors = ref({});
  let storage = useStorage();

  let send = async (url, method = 'GET', data = null, params = {}, headers = {}) => {
    progress.value = true;
    // message.value = 'Working on it...';
    message.value = '';

    // add authorization header
    headers['Authorization'] = `Bearer ${await (storage.get('token'))}`;
    
    return axios({
      url: import.meta.env.VITE_API_HOST + url,
      method: method,
      data: data,
      params: params,
      headers: headers
    })
    .then (res => {
      progress.value = false;
      success.value = true;

      if (res.data) {
        message.value = res.data.message && res.data.message.length ? res.data.message : 'Done.';
      }
      else {
        message.value = 'Done.';
      }

      errors.value = {};

      return res.data ? res.data.data : true;
    })
    .catch (err => {
      progress.value = false;
      success.value = false;

      if (err.response.data) {
        message.value = err.response.data.message && err.response.data.message.length ? err.response.data.message : 'Request failed!';
      }

      errors.value = err.response.data ? err.response.data.errors : {};

      return false;
    });
  }

  let reset = () => {
    progress.value = false;
    success.value = undefined;
    message.value = '';
  }

  return {
    progress,
    success,
    message,
    errors,
    send,
    reset,
  }
}