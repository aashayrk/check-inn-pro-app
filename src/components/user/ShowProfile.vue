<template>
  <page>
    <page-topbar page-title="My Profile" user-widget="false"></page-topbar>
    <div v-if="getProfileReq.success && user">
      <div class="grid lg:grid-cols-2 gap-2">

        <!-- col -->
        <div class="col">
          <info-section section-title="User Details">
            <div class="actions p-6">

              <!-- change password -->
              <modal-dialog dialog-title="Change Password">
                <template #trigger>
                  <button class="btn">
                    <span>Change Password</span>
                    <msr-icon>lock</msr-icon>
                  </button>
                </template>
                <template #default="defaultProps">
                  <change-password :user="user" @close="onPasswordChanged($event, defaultProps)"></change-password>
                </template>
              </modal-dialog>

              <!-- edit profile -->
              <!-- <modal-dialog class="ml-1">
                <template #trigger>
                  <button class="btn btn-round">
                    <msr-icon>edit</msr-icon>
                  </button>
                </template>
                <template #default="defaultProps">
                  <info-section section-title="Edit Profile">
                    <edit-user-profile :user="user" @close="onUserUpdated($event, defaultProps)"></edit-user-profile>
                  </info-section>
                </template>
              </modal-dialog> -->
            </div>
            <div class="p-6 -mt-6">
              <div class="border border-primary-200 rounded-xl">
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Name</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ user.name }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Username</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ user.username }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Email Address</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ user.email }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Contact Number</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ user.contact_number ?? '...' }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Address</p>
                  </div>
                  <div class="col-2">
                    <p class="leading-none">{{ user.address ?? '...' }}</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Status</p>
                  </div>
                  <div class="col-2">
                    <p class="tag lone-tag bg-lime-300" v-if="user.active === 1">Active</p>
                    <p class="tag lone-tag bg-red-200" v-if="user.active === 0">Inactive</p>
                  </div>
                </div>
                <div class="row tight">
                  <div class="col-2">
                    <p class="leading-none">Roles</p>
                  </div>
                  <div class="col-2 col-tags">
                    <p class="tag bg-primary-200" v-for="role in user.roles">{{ role.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </info-section>
        </div>
      </div>
    </div>
    <div v-else>
      <loading-dots :progress="getProfileReq.progress" :message="getProfileReq.message"></loading-dots>
    </div>
  </page>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
// import EditUserProfile from './EditUserProfile.vue';
import ChangePassword from './ChangePassword.vue';

let getProfileReq = reactive(useApi());
let user = ref();

function getUserProfile() {
  getProfileReq.send(
    `/api/client/v1/user-profile`,
  )
  .then(res => {
    if (res) {
      user.value = res.user;
    }
  });
}

function onUserUpdated(e, modal) {
  getUserProfile();
  modal.close();
}

function onPasswordChanged(e, modal) {
  getUserProfile();
  modal.close();
}

onMounted(() => {
  getUserProfile();
});
</script>

<style scoped>
.section+.section {
  @apply mt-2;
}
</style>