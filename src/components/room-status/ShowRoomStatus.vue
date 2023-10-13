<template>
  <page :tab-bar="true" class="pb-20">
    <page-topbar :menu="true"></page-topbar>

    <div v-if="infoReq.success">
      <info-section section-title="Rooms">
        <div class="bg-white z-10">
          <div class="flex p-6">
  
            <!-- legend -->
            <div class="flex flex-wrap w-full overflow-x-auto">
              <div class="mr-4 mt-1 flex items-center">
                <div class="w-4 h-4 rounded-md bg-green-200"></div>
                <p class="leading-none text-xs whitespace-nowrap ml-1">Available</p>
              </div>
              <div class="mr-4 mt-1 flex items-center">
                <div class="w-4 h-4 rounded-md bg-yellow-200"></div>
                <p class="leading-none text-xs whitespace-nowrap ml-1">Dirty</p>
              </div>
              <div class="mr-4 mt-1 flex items-center">
                <div class="w-4 h-4 rounded-md bg-red-200"></div>
                <p class="leading-none text-xs whitespace-nowrap ml-1">Occupied</p>
              </div>
              <div class="mr-4 mt-1 flex items-center">
                <div class="w-4 h-4 rounded-md bg-lime-200"></div>
                <p class="leading-none text-xs whitespace-nowrap ml-1">Booked - Tentative</p>
              </div>
              <div class="mr-4 mt-1 flex items-center">
                <div class="w-4 h-4 rounded-md bg-orange-200"></div>
                <p class="leading-none text-xs whitespace-nowrap ml-1">Booked - Confirmed</p>
              </div>
              <div class="mr-4 mt-1 flex items-center">
                <div class="w-4 h-4 rounded-md bg-stone-400"></div>
                <p class="leading-none text-xs whitespace-nowrap ml-1">Blocked</p>
              </div>
            </div>
  
            <!-- options -->
            <dropdown-menu size="lg" class="ml-1">
              <template #trigger>
                <button class="btn btn-round">
                  <msr-icon>more_vert</msr-icon>
                </button>
              </template>
              <template #default="dropdownProps">
                <div>
                  <div class="p-6">
                    <div class="col-tags">
                      <p class="tag bg-primary-200">Group By</p>
                    </div>
                  </div>
  
                  <!-- group by room groups -->
                  <div class="row tight">
                    <div class="col-1">
                      <div class="ra">
                        <label class="justify-between">
                          <p class="leading-none font-normal text-base">Room Group</p>
                          <input type="radio" name="groupBy" value="roomGroup" v-model="groupBy">
                        </label>
                      </div>
                    </div>
                  </div>
  
                  <!-- group by room type -->
                  <div class="row tight">
                    <div class="col-1">
                      <div class="ra">
                        <label class="justify-between">
                          <p class="leading-none font-normal text-base">Room Type</p>
                          <input type="radio" name="groupBy" value="roomType" v-model="groupBy">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </dropdown-menu>
          </div>
        </div>
        <div v-if="roomGroups.length && roomTypes.length">
  
          <!-- room groups -->
          <div class="" v-if="groupBy === 'roomGroup'">
            <div v-for="(group, index) in roomGroups" :key="index" class="row-item transition-opacity duration-150" :class="{ 'opacity-25': infoReq.progress }">
              <div class="p-6">
  
                <!-- group name -->
                <div class="col-tags">
                  <p class="tag bg-primary-200">{{ group.name }}</p>
                </div>
  
                <!-- rooms -->
                <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-2 items-stretch mt-6" v-if="group.rooms.length">
                  <div v-for="(room, index) in group.rooms" :key="index">
                    <available-room :room="room" :day="day" v-if="roomAvailable(room)" @close="getData()"></available-room>
                    <occupied-room :room="room" :day="day" v-if="roomOccupied(room)" @close="getData()"></occupied-room>
                    <booked-room :room="room" :day="day" v-if="roomBooked(room)" @close="getData()"></booked-room>
                    <blocked-room :room="room" :day="day" v-if="roomBlocked(room)"></blocked-room>
                    <multi-allocated-room :room="room" :day="day" v-if="roomMultiAllocated(room)"></multi-allocated-room>
                  </div>
                </div>
                <div v-else class="mt-6">
                  <p class="leading-none">No rooms found.</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- room types -->
          <div class="" v-if="groupBy === 'roomType'">
            <div v-for="(group, index) in roomTypes" :key="index" class="row-item transition-opacity duration-150" :class="{ 'opacity-25': infoReq.progress }">
              <div class="p-6">
  
                <!-- group name -->
                <div class="col-tags">
                  <p class="tag bg-primary-200">{{ group.name }}</p>
                </div>
  
                <!-- rooms -->
                <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-2 items-stretch mt-6" v-if="group.rooms.length">
                  <div v-for="(room, index) in group.rooms" :key="index">
                    <available-room :room="room" :day="day" v-if="roomAvailable(room)" @close="getData()"></available-room>
                    <occupied-room :room="room" :day="day" v-if="roomOccupied(room)" @close="getData()"></occupied-room>
                    <booked-room :room="room" :day="day" v-if="roomBooked(room)" @close="getData()"></booked-room>
                    <blocked-room :room="room" :day="day" v-if="roomBlocked(room)"></blocked-room>
                    <multi-allocated-room :room="room" :day="day" v-if="roomMultiAllocated(room)"></multi-allocated-room>
                  </div>
                </div>
                <div v-else class="mt-6">
                  <p class="leading-none">No rooms found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="p-6">
            <p class="leading-none">No rooms found!</p>
          </div>
        </div>
      </info-section>
    </div>
    <div v-else>
      <loading-dots :progress="infoReq.progress" :message="infoReq.message"></loading-dots>
    </div>

    <!-- navigator -->
    <template #bottom v-if="infoReq.success">
  
      <!-- navigator -->
      <div class="flex items-center justify-end p-6 py-4">
        <button class="btn btn-round btn-small btn-transparent" title="Prev Week" @click="navigate(-7)">
          <msr-icon>keyboard_double_arrow_left</msr-icon>
          <!-- <span>-7</span> -->
        </button>
        <button class="btn btn-round btn-small btn-transparent ml-1" title="Prev Day" @click="navigate(-1)">
          <msr-icon>chevron_left</msr-icon>
          <!-- <span>-1</span> -->
        </button>
        <button class="btn btn-small btn-transparent ml-1" title="Today" @click="navigate('today')">{{ statusDay.format('DD-MM-YYYY') }}</button>
        <button class="btn btn-round btn-small btn-transparent ml-1" title="Next Day" @click="navigate(1)">
          <!-- <span>+1</span> -->
          <msr-icon>chevron_right</msr-icon>
        </button>
        <button class="btn btn-round btn-small btn-transparent ml-1" title="Next Week" @click="navigate(7)">
          <!-- <span>+7</span> -->
          <msr-icon>keyboard_double_arrow_right</msr-icon>
        </button>
      </div>
    </template>
  </page>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import moment from 'moment';
import AvailableRoom from './AvailableRoom.vue';
import OccupiedRoom from './OccupiedRoom.vue';
import BookedRoom from './BookedRoom.vue';
import MultiAllocatedRoom from './MultiAllocatedRoom.vue';
import BlockedRoom from './BlockedRoom.vue';

let roomGroups = ref([]);
let roomTypes = ref([]);
let statusDay = ref(moment());
let day = ref();
let groupBy = ref('roomGroup');
let infoReq = reactive(useApi());

function getData() {
  infoReq.send(
    `/api/client/v1/room-status`,
    'GET',
    null,
    {
      date: statusDay.value.format('YYYY-MM-DD HH:mm:ss')
    }
  )
    .then(res => {
      if (res) {
        roomGroups.value = res.roomGroups;
        roomTypes.value = res.roomTypes;
        day.value = {
          date: statusDay.value.format('YYYY-MM-DD HH:mm'),
          isToday: res.isToday,
          isPast: res.isPast,
          isFuture: res.isFuture,
        }
      }
    });
}

function navigate(n) {
  if (n === 'today') {
    statusDay.value = moment();
  }
  else {
    statusDay.value = statusDay.value.clone().add(n, 'day');
  }

  getData();
}

function roomAvailable(room) {
  return (
    !roomOccupied(room) &&
    !roomBooked(room) &&
    !roomBlocked(room) &&
    !roomMultiAllocated(room)
  );
}

function roomOccupied(room) {
  return (
    room.allocations.length === 1 &&
    room.allocations[0].type === 'Check In'
  );
}

function roomBooked(room) {
  return (
    room.allocations.length === 1 &&
    room.allocations[0].type === 'Booking'
  );
}

function roomBlocked(room) {
  return (
    room.allocations.length === 1 &&
    room.allocations[0].type === 'Blocking'
  );
}

function roomMultiAllocated(room) {
  return room.allocations.length > 1;
}

onMounted(() => {
  getData();
});
</script>