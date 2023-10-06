<template>
  <page>
    <div v-if="getCheckInsReq.success">
      <page-topbar back-to="/" page-title="Check Ins"></page-topbar>
      <info-section section-title="Check Ins">
        
        <!-- old bills -->
        <div class="p-6 flex justify-end">
          <router-link to="/old-bills">
            <button class="btn btn-primary">
              <span>View Old Bills</span>
              <msr-icon>arrow_forward</msr-icon>
            </button>
          </router-link>
        </div>
        
        <!-- <template #actions> -->
          <!-- <modal-dialog :disabled="userAbilities.deny('create', 'checkIns')">
            <template #trigger>
              <button class="btn btn-primary" :disabled="userAbilities.deny('create', 'checkIns')">
                <span>New Check In</span>
                <msr-icon>add</msr-icon>
              </button>
            </template>
            <template #default="defaultProps">
              <info-section section-title="New Check In">
                <check-in-form @close="onCheckInCreated(defaultProps, $event)"></check-in-form>
              </info-section>
            </template>
          </modal-dialog> -->

          <!-- options -->
          <!-- <dropdown-menu size="lg" class="ml-2">
            <template #trigger>
              <button class="btn btn-round">
                <msr-icon>more_vert</msr-icon>
              </button>
            </template>
            <template #default="dropdownProps">
              <div class="p-2"> -->

                <!-- apply tariff -->
                <!-- <modal-dialog :disabled="userAbilities.deny('applyTariff', 'checkIns')">
                  <template #trigger>
                    <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('applyTariff', 'checkIns')">
                      <msr-icon>add</msr-icon>
                      <span>Apply Tariff</span>
                    </button>
                  </template>
                  <template #default="defaultProps">
                    <info-section section-title="Apply Tariff">
                      <tariff-reminder></tariff-reminder>
                    </info-section>
                  </template>
                </modal-dialog> -->

                <!-- manage folio groups -->
                <!-- <modal-dialog @close="onGroupsManaged()" :disabled="userAbilities.deny('manageGroups', 'checkIns')">
                  <template #trigger>
                    <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('manageGroups', 'checkIns')">
                      <msr-icon>arrow_forward</msr-icon>
                      <span>Manage Groups</span>
                    </button>
                  </template>
                  <template #default="modalProps">
                    <info-section section-title="Manage Folio Groups">
                      <manage-check-in-groups></manage-check-in-groups>
                    </info-section>
                  </template>
                </modal-dialog> -->
              <!-- </div>
            </template>
          </dropdown-menu> -->
        <!-- </template> -->
        <div v-if="checkIns.length">
          <div class="py-2">
            <div v-for="(checkIn, index) in checkIns" :key="index" class="row-item">
  
              <!-- parent checkin -->
              <div class="data-row">
                <div class="data-info">
                  <div class="grid md:grid-cols-2 gap-6 items-center p-6 py-4">
                    <div class="flex items-center">
  
                      <!-- avatar/photo -->
                      <preview-document :documents="checkIn.guests[0].guest.documents" type="Photo">
                        <template #trigger>
                          <img :src="`${checkIn.guests[0].guest.avatar}`" class="w-16 h-16 rounded-full ring ring-primary-200 cursor-pointer">
                        </template>
                      </preview-document>
  
                      <!-- info -->
                      <div class="ml-4">
                        <p class="leading-none text-xl">Room {{ checkIn.room.number }}</p>
                        <p class="leading-none text-xs mt-1">
                          <span v-if="checkIn.guests[0].guest.title">{{ checkIn.guests[0].guest.title.name }}. </span>
                          <span>{{ checkIn.guests[0].guest.name }}</span>
                        </p>
                        <p class="leading-none text-xs mt-1">{{ checkIn.folio_number }}</p>
                      </div>
                    </div>
                    <div class="col-tags">
                      <p class="tag bg-primary-200">In: {{ checkIn.in_time }}</p>
                      <p class="tag" :class="{
                          'bg-teal-200': checkIn.stay_ends_today,
                          'bg-red-200': checkIn.pending_check_out,
                          'bg-primary-200': ! checkIn.pending_check_out && ! checkIn.stay_ends_today,
                        }">Out: {{ checkIn.out_time }}</p>
  
                      <p class="tag bg-lime-300" v-if="checkIn.house_guest">House Guest</p>
                    </div>
                  </div>
                </div>
                <div class="data-actions flex">
        
                  <!-- details -->
                  <router-link class="btn btn-round btn-small" :to="`/check-ins/${checkIn.id}`" v-if="userAbilities.allow('view', 'checkIns')">
                    <msr-icon>chevron_right</msr-icon>
                  </router-link>
                </div>
              </div>
  
              <!-- sub checkins -->
              <div v-for="(subCheckIn, index) in checkIn.subCheckIns" :key="index" class="row-item">
                <div class="data-row ml-2">
                  <div class="data-info">
                    <div class="grid md:grid-cols-2 gap-6 items-center p-6 py-4">
                      <div class="flex items-center">
    
                        <!-- avatar/photo -->
                        <preview-document :documents="subCheckIn.guests[0].guest.documents" type="Photo">
                          <template #trigger>
                            <img :src="`${subCheckIn.guests[0].guest.avatar}`" class="w-12 h-12 rounded-full ring ring-primary-100 cursor-pointer">
                          </template>
                        </preview-document>
    
                        <!-- info -->
                        <div class="ml-4">
                          <p class="leading-none">Room {{ subCheckIn.room.number }}</p>
                          <p class="leading-none text-xs mt-1">
                            <span v-if="subCheckIn.guests[0].guest.title">{{ subCheckIn.guests[0].guest.title.name }}. </span>
                            <span>{{ subCheckIn.guests[0].guest.name }}</span>
                          </p>
                          <p class="leading-none text-xs mt-1">{{ subCheckIn.folio_number }}</p>
                        </div>
                      </div>
                      <div class="col-tags">
                        <p class="tag bg-primary-200">In: {{ subCheckIn.in_time }}</p>
                        <p class="tag" :class="{
                            'bg-teal-200': subCheckIn.stay_ends_today,
                            'bg-red-200': subCheckIn.pending_check_out,
                            'bg-primary-200': ! subCheckIn.pending_check_out && ! subCheckIn.stay_ends_today,
                          }">Out: {{ subCheckIn.out_time }}</p>
    
                        <p class="tag bg-lime-300" v-if="subCheckIn.house_guest">House Guest</p>
                      </div>
                    </div>
                  </div>
                  <div class="data-actions flex">
          
                    <!-- details -->
                    <router-link class="btn btn-round btn-small" :to="`/check-ins/${subCheckIn.id}`" v-if="userAbilities.allow('view', 'checkIns')">
                      <msr-icon>chevron_right</msr-icon>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6" v-else>
          <p class="leading-none">No checkins yet!</p>
        </div>
      </info-section>
    </div>
    <div v-else>
      <loading-dots :progress="getCheckInsReq.progress" :message="getCheckInsReq.message"></loading-dots>
    </div>
  </page>
</template>
<script setup>
// import CheckInForm from './create-check-in/CheckInForm.vue';
// import TariffReminder from '@/vue/TariffReminder.vue';
// import ManageCheckInGroups from './ManageCheckInGroups.vue';
import PreviewDocument from '@/components/PreviewDocument.vue';
import { onMounted, provide, reactive, ref } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';

let getCheckInsReq = reactive(useApi());
let checkIns = ref([]);
let userAbilities = useUserAbilities();
provide('userAbilities', userAbilities);

function getCheckIns() {
  getCheckInsReq.send('/api/client/v1/check-ins')
    .then (res => {
      if (res) {
        checkIns.value = res.checkIns;
      }
    });
}

function onImageCaptured(data, modal) {
  modal.close();
  console.log(data);
}

function onCheckInCreated(props, data) {
  props.close();
  getCheckIns();
}

function onGroupsManaged() {
  getCheckIns();
}

onMounted(() => {
  getCheckIns();
});
</script>