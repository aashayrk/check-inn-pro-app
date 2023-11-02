<template>
  <div class="flex items-center fixed top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600 overflow-y-auto">
    <div class="p-8 w-full">
      <div class="h-10 px-6 flex items-center">
        <p class="leading-none text-xs uppercase text-primary-300 font-bold text-center">Login to CheckInn-Pro</p>
      </div>
      <div class="flex items-center justify-center bg-primary-100 rounded-t-xl">

        <!-- logo -->
        <div class="p-8 text-center">
          <img src="/images/check-inn-pro-logo.svg" alt="Check-Inn Pro Logo" class="w-24 md:w-32 h-auto mx-auto">
          <div class="mt-4">
            <p class="leading-none font-bold text-3xl md:text-5xl tracking-tighter font-logo">Check-Inn Pro</p>
            <p class="leading-none tracking-tighter font-logo mt-2">An Ideal Software for Hotel & Resort Management</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-b-xl shadow-md">
  
        <!-- form -->
        <div class="w-full max-w-md mx-auto">
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
      </div>
      <div class="h-10 px-6 flex items-center">
        <p class="leading-none text-xs uppercase text-primary-300 font-bold text-center">{{ message }}</p>
      </div>
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