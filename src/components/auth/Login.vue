<template>
  <div class="flex flex-col fixed top-0 left-0 w-full h-full bg-primary-100">
    <div class="flex-grow flex items-center justify-center">

      <!-- logo -->
      <div class="p-6 text-center">
        <img src="/images/check-inn-pro-logo.svg" alt="Check-Inn Pro Logo" class="w-32 md:w-48 h-auto mx-auto">
        <div class="mt-4">
          <p class="leading-none font-bold text-3xl md:text-5xl tracking-tighter font-logo">Check-Inn Pro</p>
          <p class="leading-none tracking-tighter font-logo mt-2">An Ideal Software for Hotel & Resort Management</p>
        </div>
      </div>
    </div>
    <div class="bg-white">

      <!-- form -->
      <api-request :req="loginReq" @reset="loginReq.reset()" @retry="login()">
        <div class="w-full max-w-md mx-auto">
          <div class="h-10 px-6 flex items-center">
            <p class="leading-none text-xs uppercase font-bold">Login to CheckInn-Pro</p>
          </div>
          <div class="p-6">
  
            <!-- Email Address -->
            <div>
              <label for="">Email Address</label>
              <input type="email" class="input" placeholder="Email Address" name="email" v-model="email" :disabled="loginReq.progress">
              <field-error :errors="loginReq.errors.email"></field-error>
            </div>
  
            <!-- Username -->
            <div class="mt-4">
              <label for="">Username</label>
              <input type="text" class="input" placeholder="Username" name="username" v-model="username" :disabled="loginReq.progress">
              <field-error :errors="loginReq.errors.username"></field-error>
            </div>
  
            <!-- Password -->
            <div class="mt-4">
              <label for="">Password</label>
              <input type="password" class="input" name="password" v-model="password" :disabled="loginReq.progress">
              <field-error :errors="loginReq.errors.password"></field-error>
            </div>
  
            <!-- Actions -->
            <div class="flex justify-end mt-6">
              <button class="btn btn-primary w-full justify-center" @click="login()" :disabled="loginReq.progress">
                <span>Login</span>
                <msr-icon>arrow_forward</msr-icon>
              </button>
            </div>
          </div>  
        </div>
      </api-request>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import { useStorage } from '@/services/storage.js';
import { useRouter } from 'vue-router';

let storage = useStorage();
let router = useRouter();
let email = ref('');
let username = ref('');
let password = ref('');
let message = ref();
let loginReq = reactive(useApi());

function login() {
  message.value = 'Logging In..';

  loginReq.send(
    '/api/sanctum/token',
    'POST',
    {
      email: email.value,
      username: username.value,
      password: password.value,
    }
  )
  .then (res => {
    if (res) {
      storage.set('token', res.token);
      
      window.location.href = '/';
    }
  })
  .finally(() => {
    message.value = '';
  })
}

onMounted(async () => {
  let token = await storage.get('token');
  if (token) {
    window.location.href = '/';
  }
})
</script>