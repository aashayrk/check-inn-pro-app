<template>
  <div class="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-start justify-center p-2 md:p-4" v-if="isOpen">
    <info-section section-title="Apply Tariff" class="w-full max-w-screen-sm">
      <div v-if="checkIns.length">
        <div>
          <div class="px-6 mt-6 flex items-center justify-between">
            <div class="col-tags">
              <p class="tag bg-primary-200">Check Ins</p>
            </div>

            <!-- select all -->
            <div class="flex">
              <button class="btn btn-small" @click="selectedCheckIns = []">
                <span>None</span>
              </button>
              <button class="btn btn-small ml-1" @click="selectAll()">
                <span>All</span>
              </button>
            </div>
          </div>
      
          <!-- checkins list -->
          <div class="mt-6">
            <div class="row-item" v-for="(checkIn, index) in checkIns" :key="index">
              <div class="data-row">
                <div class="data-info">
                  <div class="row">
                    <div class="col-2">
                      <p class="leading-none font-bold">
                        Room {{ checkIn.room.number }}
                      </p>
                      <p class="leading-none text-xs mt-2">
                        Check Out : {{ checkIn.out_time }}
                      </p>
                    </div>
                    <div class="col-2 col-tags">
                      <span class="tag" v-if="! checkIn.progress">Applied Upto : {{ checkIn.tariff_applied_upto }}</span>
                      <span class="tag bg-primary-200" v-if="checkIn.progress">Applying Tariff...</span>
                    </div>
                  </div>
                </div>
                <div class="data-actions">
                  <div class="cb" title="Select">
                    <label>
                      <input type="checkbox" :value="checkIn.id" v-model="selectedCheckIns">
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <!-- actions -->
          <div class="actions p-6 mt-6">
            <button class="btn" @click="reschedule()" v-if="reschedulable">Remind me in 10 mins</button>
            <button class="btn btn-primary ml-1" @click="applyTariff(true)" :disabled="selectedCheckIns.length === 0 || tariffReq.progress">
              <span>Apply</span>
              <msr-icon>arrow_forward</msr-icon>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="p-6">
          <p class="leading-none">No Check Ins found!</p>
        </div>
      </div>
    </info-section>
  </div>
</template>
<script setup>
import { useApi } from '@/services/api.js';
import { ref, reactive, onMounted } from 'vue';

let checkIns = ref([]);
let tariffApplication = ref();
let selectedCheckIns = ref([]);
let reschedulable = ref(true);
let rescheduleReq = reactive(useApi());
let tariffReq = reactive(useApi());
let isOpen = ref(false);

let props = defineProps([
  'channel'
]);

let emits = defineEmits([
  'close'
]);

function selectAll() {
  selectedCheckIns.value = checkIns.value.map(c => c.id);
}

function reschedule() {
  if (reschedulable.value) {
    rescheduleReq.send(
      `/api/client/v1/tariff-applications/${tariffApplication.value.id}`, 
      'PATCH', 
      {
        postponeFor: 1
      }
    )
    .then (res => {
      if (res) {
        isOpen.value = false;
      }
    })
  }
}

function applyTariff(userInitiated) {
  selectedCheckIns.value.forEach(id => {
    let checkIn = checkIns.value.find(checkIn => checkIn.id === id);
    checkIn.progress = true;
  
    tariffReq.send(
      `/api/client/v1/check-ins/${id}/tariff`,
      'POST',
      {
        userInitiated: userInitiated
      }
    )
    .then (res => {
      if (res) {
        checkIn.progress = false;
        checkIn.tariff_applied_upto = res.tariffAppliedUpto;
        selectedCheckIns.value = [];

        isOpen.value = false;
      }
    })
    .catch (err => {
      checkIn.progress = false;
      selectedCheckIns.value = [];
    });
  });
}

onMounted(() => {
  Echo.channel(props.channel)
    .listen('ApplyTariff', event => {
      checkIns.value = event.details.checkIns;
      tariffApplication.value = event.details.tariffApplication;
      reschedulable.value = event.details.reschedulable;

      if (event.details.method === 'Auto') {
        selectedCheckIns.value = checkIns.value.map(item => item.id);

        applyTariff(false);
      }
      if (event.details.method === 'Prompt') {
        isOpen.value = true;
      }
    })
});

</script>