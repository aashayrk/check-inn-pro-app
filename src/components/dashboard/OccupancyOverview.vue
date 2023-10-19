<template>

  <!-- Occupancy Status -->
  <div class="bg-white shadow-sm">
    <div class="title h-10 px-6 flex items-center border-b border-stone-100">
      <p class="leading-none font-bold uppercase text-xs">Occupancy Status</p>
    </div>
    <div class="p-6 flex justify-between items-center">
      <div>
        <p class="leading-none">Occupancy Status</p>
        <p class="leading-none text-xs mt-1">{{ moment().format('DD-MM-YYYY hh:mm a') }}</p>
        <!-- <p class="leading-none mt-1">to : {{ moment(filters.to).format('DD-MM-YYYY hh:mm a') }}</p> -->
      </div>
      <div class="actions">
        <modal-dialog dialog-title="Filters" @close="drawChart()">
          <template #trigger>
            <button class="btn btn-round"><msr-icon>filter_alt</msr-icon></button>
          </template>
          <template #default="defaultProps">
            <div class="p-6">
              <!-- <div class="grid lg:grid-cols-2 gap-4">
                <div>
                  <label for="">From</label>
                  <input class="input" type="datetime-local" v-model="filters.from">
                </div>
                <div>
                  <label for="">To</label>
                  <input class="input" type="datetime-local" v-model="filters.to">
                </div>
              </div> -->
              <div>
                <div class="flex justify-between items-center mb-6">
                  <div class="col-1 col-tags">
                    <p class="tag bg-primary-200">Status</p>
                  </div>
                  <div class="actions">
                    <button class="btn btn-small" @click="filters.types = []">None</button>
                    <button class="btn btn-small ml-1" @click="filters.types = types.map(type => type.code)">All</button>
                  </div>
                </div>
                <div class="row-item" v-for="status in types" :key="status.code">
                  <div class="flex justify-between items-center" :class="filters.types.some(type => type === status.code) ? 'opacity-100' : 'opacity-50'">
                    <p class="leading-none">{{ status.title }}</p>
                    <div class="sw py-1">
                      <label for="">
                        <input type="checkbox" :value="status.code" v-model="filters.types">
                      </label>
                    </div>
                  </div>
                </div>

                <!-- action -->
                <div class="actions mt-12">
                  <button class="btn btn-primary ml-1" @click="onFiltersApplied(defaultProps)">
                    <span>Apply</span>
                    <msr-icon name="arrow_forward"></msr-icon>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </modal-dialog>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 items-center" v-if="req.success">
      <div class="p-6 lg:mt-12">
        
        <!-- chart -->
        <div id="chart-container" style="height: 320px;"></div>
      </div>
      <div class="p-6" v-if="data">
        <div class="border border-primary-200 rounded-xl xl:w-3/4 max-w-sm mx-auto">
          <div class="p-4 py-1 row-item flex font-bold">
            <div class="w-1/2 p-2">
              <p class="leading-none">Total Rooms</p>
            </div>
            <div class="w-1/2 p-2">
              <p class="leading-none text-right">{{ data['Total Rooms'] }}</p>
            </div>
          </div>
          <div class="p-4 py-1 row-item flex" v-for="(item) in data.occupancySummary" :key="item.status">
            <div class="w-1/2 p-2">
              <p class="leading-none">{{ item.status }}</p>
            </div>
            <div class="w-1/2 p-2">
              <p class="leading-none text-right">{{ item.count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading-dots v-else :progress="req.progress" :message="req.message"></loading-dots>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import moment from 'moment';
import { useApi } from '@/services/api.js';
import ApexCharts from 'apexcharts';

let data = ref();
let req = reactive(useApi());
let types = [
  {
    code: 'available',
    title: 'Available Rooms',
  },
  {
    code: 'occupied',
    title: 'Occupied Rooms',
  },
  {
    code: 'booked',
    title: 'Booked Rooms',
  },
  {
    code: 'blocked',
    title: 'Blocked Rooms',
  },
  {
    code: 'expectedCheckIns',
    title: 'Expected Check Ins',
  },
  {
    code: 'expectedCheckOuts',
    title: 'Expected Check Outs',
  },
];
let filters = reactive({
  from: moment().subtract(1, 'month'),
  to: moment(),
  types: []
});

let chart = null;

async function drawChart() {
  let res = await req.send(
    `/api/client/v1/dashboard/occupancy-status`,
    'GET',
    null,
    {
      from: moment(filters.from).format('YYYY-MM-DD HH:mm'),
      to: moment(filters.to).format('YYYY-MM-DD HH:mm'),
      types: filters.types.join(',')
    }
  );

  if (res) {
    data.value = res;
  
    let chartOptions = {
      chart: {
        type: 'pie',
        height: '100%',
      },
      series: res.occupancySummary.map(item => item.count).some(count => count > 0) ? 
        res.occupancySummary.map(item => item.count) : [],
  
      labels: res.occupancySummary.map(item => item.status),
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'bottom',
      },
      noData: {
        text: 'No occupancy data for now!',
        style: {
          fontFamily: 'Manrope'
        }
      },
    }
  
    if (chart) {
      chart.updateOptions(chartOptions);
    }
    else {
      nextTick(() => {
        chart = new ApexCharts(document.getElementById('chart-container'), chartOptions);
        chart.render();
      })
    }
  }
}

function onFiltersApplied(modal) {
  modal.close();
  drawChart();
}

onMounted(() => {
  filters.from = moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm');
  filters.to = moment().format('YYYY-MM-DD HH:mm');
  filters.types = types.map(type => type.code);

  drawChart();
});

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
  }
})
</script>