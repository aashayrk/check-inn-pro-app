<template>
  <div>
    <api-request :req="updatePasswordReq" @retry="updatePassword()" @reset="updatePasswordReq.reset()">
      <div class="p-6">

        <!-- Current Password -->
        <div>
          <label for="">Current Password</label>
          <input type="password" class="input" v-model="currentPassword" autocomplete="off">
          <field-error :errors="updatePasswordReq.errors.curentPassword"></field-error>
        </div>
        
        <!-- New Password -->
        <div class="mt-4">
          <label for="">New Password</label>
          <input type="password" class="input" v-model="newPassword" autocomplete="off">
          <field-error :errors="updatePasswordReq.errors.newPassword"></field-error>
        </div>

        <!-- Action -->
        <div class="actions mt-12">
          <button class="btn" @click="close()">
            <span>Cancel</span>
          </button>
          <button class="btn btn-primary ml-1" @click="updatePassword()">
            <span>Save</span>
            <msr-icon name="arrow_forward"></msr-icon>
          </button>
        </div>
      </div>
    </api-request>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';

let emits = defineEmits([
  'close'
]);

let props = defineProps([
  'user'
]);

let currentPassword = ref('');
let newPassword = ref('');
let updatePasswordReq = reactive(useApi());

function updatePassword() {
  updatePasswordReq.send(
    `/api/client/v1/user-profile/password`,
    'POST',
    {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    }
  )
  .then (res => {
    if (res) {
      close(true);
    }
  });
}

function close(data = null) {
  emits('close', data);
}
</script>