<template>
  <div>
    <info-section section-title="Room Chart">
      <div>

        <!-- navigator -->
        <div class="p-6 flex justify-end items-center">

          <!-- next / prev -->
          <div class="actions items-center ml-4">
            <button class="btn btn-round btn-transparent" :disabled="infoReq.progress" @click="navigate(-14)">
              <msr-icon>chevron_left</msr-icon>
            </button>
            <button class="btn btn-transparent mx-4" @click="navigate(0)">{{ chartDay.format('DD-MM-YYYY') }}</button>
            <div>
            </div>
            <button class="btn btn-round btn-transparent" :disabled="infoReq.progress" @click="navigate(14)">
              <msr-icon>chevron_right</msr-icon>
            </button>

            <!-- options -->
            <modal-dialog size="sm" class="ml-1">
              <template #trigger>
                <button class="btn btn-round relative">
                  <msr-icon>filter_alt</msr-icon>
                  <div class="w-4 h-4 rounded-full bg-red-500 bg-opacity-50 absolute top-0 right-0" v-if="filtersActive"></div>
                </button>
              </template>
              <template #default="modalProps">
                <info-section section-title="Filters">
                  <div class="p-6">
                    <div class="col-tags">
                      <p class="tag bg-primary-200">Room Status</p>
                    </div>
                    <div class="mt-6">
                      <div>
                        <label for="">Room Status</label>
                        <select v-model="filters.roomStatus" class="select">
                          <option value="">All</option>
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Booked">Booked</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </div>
                      <div class="mt-4">
                        <label for="">Room Type</label>
                        <select v-model="filters.roomType" class="select">
                          <option value="">All</option>
                          <option :value="roomType.code" v-for="roomType in allRoomTypes" :key="roomType.code">{{ roomType.code }} - {{ roomType.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="actions mt-6">
                      <button class="btn" @click="resetFilters(modalProps)">
                        <span>Reset</span>
                      </button>
                      <button class="btn btn-primary ml-1" @click="onFiltersApplied(modalProps)">
                        <span>Apply</span>
                        <msr-icon>arrow_forward</msr-icon>
                      </button>
                    </div>
                  </div>
                </info-section>
              </template>
            </modal-dialog>
          </div>
        </div>

        <!-- legend -->
        <div class="flex flex-wrap p-6 -mt-6">
          <div class="mr-4 mt-2 flex items-center">
            <div class="w-4 h-4 rounded-md bg-primary-300"></div>
            <p class="leading-none text-xs ml-2">Available</p>
          </div>
          <div class="mr-4 mt-2 flex items-center">
            <div class="w-4 h-4 rounded-md bg-yellow-300"></div>
            <p class="leading-none text-xs ml-2">Dirty</p>
          </div>
          <div class="mr-4 mt-2 flex items-center">
            <div class="w-4 h-4 rounded-md bg-red-300"></div>
            <p class="leading-none text-xs ml-2">Occupied</p>
          </div>
          <div class="mr-4 mt-2 flex items-center">
            <div class="w-4 h-4 rounded-md bg-teal-300"></div>
            <p class="leading-none text-xs ml-2">Checkout</p>
          </div>
          <div class="mr-4 mt-2 flex items-center">
            <div class="w-4 h-4 rounded-md bg-purple-300"></div>
            <p class="leading-none text-xs ml-2">Booked</p>
          </div>
          <div class="mr-4 mt-2 flex items-center">
            <div class="w-4 h-4 rounded-md bg-stone-400"></div>
            <p class="leading-none text-xs ml-2">Blocked</p>
          </div>
        </div>

        <!-- chart -->
        <div class="p-6 -mt-6 flex overflow-x-auto transition-opacity duration-150" v-if="chartDay" :class="{'opacity-25': infoReq.progress}">
          <div class="column" v-for="(day, index) in days" :class="day.isToday ? '' : ''">

            <!-- day -->
            <div class="day p-0.5">
              <div class="p-4 rounded-xl" :class="day.isToday ? 'bg-primary-500 text-white' : 'bg-stone-50'">
                <p class="leading-none font-bold flex justify-between">
                  <span class="leading-none">{{ moment(day.date).format('DD') }}</span>
                  <span class="leading-none text-xs font-normal relative bottom-2 left-2">{{ moment(day.date).format('ddd') }}</span>
                </p>
                <p class="leading-none text-xs font-bold mt-1">{{ moment(day.date).format('MMM') }}</p>
              </div>
            </div>
              
            <!-- rooms -->
            <div class="p-0.5 -mt-1">
              <div v-for="(room, index) in day.rooms" :key="index">
                
                <!-- room box -->
                <div class="mt-1 rounded-xl overflow-hidden" v-if="true">
                  <div :class="roomColor(room, day)">
                    <modal-dialog>
                      <template #trigger>
                        
                        <!-- room info -->
                        <div class="aspect-square cursor-pointer p-4">
                          <p class="leading-none font-bold">{{ room.number }}</p>
                          <p class="leading-none text-xs mt-1 hidden md:block">{{ room.type.name }}</p>
                          <p class="leading-none text-xs mt-1 hidden md:block">{{ room.group.name }}</p>
                        </div>
                      </template>
                      <template #default>
    
                        <info-section section-title="Check In Summary" v-if="room.allocation && room.allocation.check_in_id">
                          <check-in-summary :check-in-id="room.allocation.check_in_id"></check-in-summary>
                        </info-section>
    
                        <info-section section-title="Check In Summary" v-if="room.allocation && room.allocation.booking_id">
                          <div class="p-6">
                            <p class="leading-none">Booking Summary</p>
                          </div>
                        </info-section>
    
                        <info-section section-title="New Check In" v-if="room.allocation && room.allocation.room_status === 'Blocked'">
                          <div class="p-6">
                            <p class="leading-none">Room Blocked</p>
                          </div>
                        </info-section>

                        <info-section section-title="New Check In" v-if="! room.allocation && day.isToday && ! room.clean">
                          <div class="p-6">
                            <p class="leading-none">Room Dirty. Please clean the room to check in.</p>
                          </div>
                        </info-section>
    
                        <info-section section-title="New Check In" v-if="! room.allocation && day.isToday && room.clean">
                          <check-in-form :room="room"></check-in-form>
                        </info-section>
    
                        <info-section section-title="New Check In" v-if="! room.allocation && day.isInThePast">
                          <div class="p-6">
                            <p class="leading-none">This room was available on {{ moment(day.date).format('YYYY-MM-DD') }}</p>
                          </div>
                        </info-section>
    
                        <info-section section-title="New Check In" v-if="! room.allocation && day.isInTheFuture">
                          <div class="p-6">
                            <p class="leading-none">Advance Booking...</p>
                          </div>
                        </info-section>
                      </template>
                    </modal-dialog>
                  </div>
                  <!-- <div class="h-8 px-4 flex items-center justify-end" :class="statusColor(room)">
                    <p class="leading-none text-xs text-right font-bold" v-show="! infoReq.progress">{{ room.allocation ? room.allocation.room_status : 'Available' }}</p>
                    <p class="leading-none text-xs text-right font-bold animate-pulse" v-show="infoReq.progress">...</p>
                  </div> -->
                </div>

                <!-- dummy room -->
                <!-- <div class="aspect-square p-4 rounded-xl mt-1 opacity-20" v-else>
                  <p class="leading-none font-bold">{{ room.number }}</p>
                  <p class="leading-none text-xs mt-1 hidden md:block">{{ room.type.name }}</p>
                  <p class="leading-none text-xs mt-1 hidden md:block">{{ room.group.name }}</p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="p-6">
            <p class="leading-none">No rooms found!</p>
          </div>
        </div>
      </div>
    </info-section>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useApi } from '@/services/api.js';
import moment from 'moment';
import CheckInSummary from './client/room-chart/CheckInSummary.vue';
import CheckInForm from './client/check-ins/create-check-in/CheckInForm.vue';

let days = ref([]);
let allRoomTypes = ref([]);
let chartDay = ref(moment());
let filters = reactive({
  roomStatus: '',
  roomType: ''
});
let filtersActive = computed(() => {
  for (let item in filters) {
    if (filters[item]) {
      return true;
    }
  }
  return false;
});
let infoReq = reactive(useApi());

function getData() {
  infoReq.send(
    `/api/client/v1/room-chart`,
    'GET',
    null,
    {
      from: chartDay.value.format('YYYY-MM-DD HH:mm:ss'),
      to: chartDay.value.clone().add(13, 'day').format('YYYY-MM-DD HH:mm:ss'),
      roomType: filters.roomType,
      roomStatus: filters.roomStatus
    }
  )
  .then (res => {
    if (res) {
      days.value = res.days;
      allRoomTypes = res.allRoomTypes
    }
  });
}

function navigate(n) {
  if (n === 0) {
    chartDay.value = moment();
  }
  else {
    chartDay.value.add(n, 'day');
  }
  
  getData();
}

function roomColor(room, day) {
  if (! room.allocated) {
    if (! room.clean && day.isToday) {
      return 'bg-yellow-200 hover:bg-yellow-300';
    }
    return 'bg-primary-100 hover:bg-primary-200';
  }
  if (room.blocking) {
    return 'bg-stone-300 hover:bg-stone-300';
  }
  if (room.checkIn) {
    return 'bg-red-200 hover:bg-red-300';
  }
  // if (room.allocation.room_status === 'Checkout') {
  //   return 'bg-teal-200 hover:bg-teal-300';
  // }
  if (room.booking) {
    return 'bg-purple-200 hover:bg-purple-300';
  }
}

function onFiltersApplied(modal) {
  getData();
  modal.close();
}

function resetFilters() {
  for (let item in filters) {
    filters[item] = '';
  }
}

onMounted(() => {
  getData();
});
</script>
<style scoped>

.column {
  width: 100%;
  max-width: 25%;
  flex-shrink: 0;
  flex-grow: 0;
}

@media screen and (min-width: 1280px) {
  .column {
    max-width: 7.142857142857143%;
  }
}
</style>