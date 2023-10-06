<template>
  <div>
    {{ loginReq.message }}
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import { useStorage } from '@/services/storage.js';
import { useRouter } from 'vue-router';

let loginReq = reactive(useApi());
let message = ref();
let storage = useStorage();
let router = useRouter();

onMounted(() => {
  loginReq.send(
    '/api/sanctum/token',
    'POST',
    {
      email: 'client@gmail.com',
      username: 'suneeshs',
      password: '12345678'
    }
  )
  .then (res => {
    if (res) {
      storage.set('token', res.token);

      router.push('/');
    }
  })
})
</script>