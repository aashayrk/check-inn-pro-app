<template>
  <page page-title="Old Bills" back-to="/">
    <div v-if="getCheckInsReq.success">
      <page-topbar back-to="/" page-title="All Old Bills"></page-topbar>
      <info-section section-title="Old Bills">
        <div class="actions p-6">

          <!-- filters -->
          <modal-dialog dialog-title="Filter Old Bills">
            <template #trigger>
              <button class="btn btn-round relative">
                <msr-icon>filter_alt</msr-icon>
                <span class="w-4 h-4 bg-red-500 bg-opacity-50 absolute top-0 right-0 rounded-full" v-if="filtersActive"></span>
              </button>
            </template>
            <template #default="defaultProps">
              <div class="p-6">

                <!-- guest -->
                <div>
                  <label for="">Guest</label>
                  <input type="text" class="input" v-model="filters.guestName">
                </div>

                <!-- bill number -->
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="">From Bill Number</label>
                    <input type="text" class="input" v-model="filters.fromBillNumber">
                  </div>
                  <div>
                    <label for="">To Bill Number</label>
                    <input type="text" class="input" v-model="filters.toBillNumber">
                  </div>
                </div>

                <!-- bill date -->
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="">From Bill Date</label>
                    <input type="date" class="input" v-model="filters.fromBillDate">
                  </div>
                  <div>
                    <label for="">To Bill Date</label>
                    <input type="date" class="input" v-model="filters.toBillDate">
                  </div>
                </div>

                <!-- in date -->
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="">From In Date</label>
                    <input type="date" class="input" v-model="filters.fromInDate">
                  </div>
                  <div>
                    <label for="">To In Date</label>
                    <input type="date" class="input" v-model="filters.toInDate">
                  </div>
                </div>
                
                <!-- out date -->
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="">From Out Date</label>
                    <input type="date" class="input" v-model="filters.fromOutDate">
                  </div>
                  <div>
                    <label for="">To Out Date</label>
                    <input type="date" class="input" v-model="filters.toOutDate">
                  </div>
                </div>

                <!-- room number -->
                <div class="mt-4">
                  <label for="">Room Number</label>
                  <input type="number" class="input" v-model="filters.roomNumber">
                </div>

                <!-- folio number -->
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="">From Folio Number</label>
                    <input type="text" class="input" v-model="filters.fromFolioNumber">
                  </div>
                  <div>
                    <label for="">To Folio Number</label>
                    <input type="text" class="input" v-model="filters.toFolioNumber">
                  </div>
                </div>

                <!-- actions -->
                <div class="actions mt-12">
                  <button class="btn" @click="resetFilters(defaultProps)">
                    <span>Reset</span>
                  </button>
                  <button class="btn btn-primary ml-1" @click="onFiltersApplied(defaultProps)">
                    <span>Apply</span>
                    <msr-icon>arrow_forward</msr-icon>
                  </button>
                </div>
              </div>
            </template>
          </modal-dialog>
        </div>

        <!-- list -->
        <data-list :count="checkInGroups.length" :req="getCheckInsReq">
          <div v-for="(group, index) in checkInGroups" :key="index" class="row-item">
            <div v-for="(checkIn, index) in group" :key="index" class="row-item">
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
                        <p class="leading-none text-xl mt-1">Room {{ checkIn.room.number }}</p>
                        <p class="leading-none text-xs mt-1">
                          <span v-if="checkIn.guests[0].guest.title">{{ checkIn.guests[0].guest.title.name }}. </span>
                          <span>{{ checkIn.guests[0].guest.name }}</span>
                          <span>, {{ checkIn.bill_number ? checkIn.bill_number : checkIn.parent_check_in.bill_number }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="xl:col-span-9 col-tags">
                      <p class="tag bg-primary-200">In: {{ checkIn.in_time }}</p>
                      <p class="tag bg-primary-200">Out: {{ checkIn.out_time }}</p>
  
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
            </div>
          </div>
        </data-list>
      </info-section>
    </div>
    <div v-else>
      <loading-dots :progress="getCheckInsReq.progress" :message="getCheckInsReq.message"></loading-dots>
    </div>
  </page>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useApi } from '@/services/api.js';
import { useUserAbilities } from '@/services/userAbilities.js';

let getCheckInsReq = reactive(useApi());
let checkInGroups = ref([]);

let userAbilities = useUserAbilities();

let filters = reactive({
  guestName: '',
  fromBillNumber: '',
  toBillNumber: '',
  fromBillDate: '',
  toBillDate: '',
  fromInDate: '',
  toInDate: '',
  fromOutDate: '',
  toOutDate: '',
  roomNumber: '',
  fromFolioNumber: '',
  toFolioNumber: '',
});

let filtersActive = computed(() => {
  for (let item in filters) {
    if (filters[item]) {
      return true;
    }
  }

  return false;
});

function getCheckIns() {
  getCheckInsReq.send(
      '/api/client-app/v1/old-bills',
      'GET',
      null, 
      filters
    )
    .then (res => {
      if (res) {
        checkInGroups.value = res.checkInGroups;
      }
    });
}

function onFiltersApplied(modal) {
  modal.close();
  getCheckIns();
}

function resetFilters(modal) {
  filters.guestName = '';
  filters.fromBillNumber = '';
  filters.toBillNumber = '';
  filters.fromBillDate = '';
  filters.toBillDate = '';
  filters.fromInDate = '';
  filters.toInDate = '';
  filters.fromOutDate = '';
  filters.toOutDate = '';
  filters.roomNumber = '';
  filters.fromFolioNumber = '';
  filters.toFolioNumber = '';
}

onMounted(() => {
  getCheckIns();
});
</script>