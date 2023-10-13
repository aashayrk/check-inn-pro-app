<template>

  <!-- Transactions Ovreview -->
  <div class="bg-white shadow-sm rounded-xl">
    <div class="title h-10 px-6 flex items-center border-b border-stone-100">
      <p class="leading-none font-bold uppercase text-xs">Transactions Overview</p>
    </div>
    <div class="p-6 flex justify-between items-center">
      <div>
        <p class="leading-none">From : {{ moment(filters.from).format('DD-MM-YYYY HH:mm') }}</p>
        <p class="leading-none mt-1">to : {{ moment(filters.to).format('DD-MM-YYYY HH:mm') }}</p>
      </div>
      <div class="actions">
        <modal-dialog size="sm" @close="drawChart()">
          <template #trigger>
            <button class="btn btn-round"><msr-icon>filter_alt</msr-icon></button>
          </template>
          <template #default="defaultProps">
            <div class="p-6">
              <div class="grid lg:grid-cols-2 gap-4">
                <div>
                  <label for="">From</label>
                  <input class="input" type="datetime-local" v-model="filters.from">
                </div>
                <div>
                  <label for="">To</label>
                  <input class="input" type="datetime-local" v-model="filters.to">
                </div>
              </div>
              <div>
                <div class="flex justify-between items-center my-6">
                  <div class="col-tags">
                    <p class="tag bg-primary-200">Transaction Types</p>
                  </div>
                  <div class="actions">
                    <button class="btn btn-small" @click="filters.types = []">None</button>
                    <button class="btn btn-small ml-1" @click="filters.types = data.allTransTypes.map(type => type.code)">All</button>
                  </div>
                </div>
                <div class="row-item" v-for="transType in data.allTransTypes" :key="transType.code">
                  <div class="flex justify-between items-center">
                    <p class="leading-none" :class="filters.types.some(type => type === transType.code) ? 'opacity-100' : 'opacity-50'">{{ transType.name }}</p>
                    <div class="sw py-1">
                      <label for="">
                        <input type="checkbox" :value="transType.code" v-model="filters.types">
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
    <div class="grid lg:grid-cols-2 items-center">
      <div class="p-6 lg:mt-12">
        
        <!-- chart -->
        <div id="transactions-overview" style="height: 320px;"></div>
      </div>
      <div class="p-6" v-if="data">
        <div class="border border-primary-200 rounded-xl xl:w-3/4 max-w-sm mx-auto">
          <div class="p-4 py-1 row-item flex" v-for="transType in data.transTypes" :key="transType.code">
            <div class="w-1/2 p-2">
              <p class="leading-none">{{ transType.name }}</p>
            </div>
            <div class="w-1/2 p-2">
              <p class="leading-none text-right currency">{{ transType.total }}</p>
            </div>
          </div>
          <div class="p-4 py-1 row-item flex font-bold">
            <div class="w-1/2 p-2">
              <p class="leading-none">Total Transactions</p>
            </div>
            <div class="w-1/2 p-2">
              <p class="leading-none text-right currency">{{ data.total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import moment from 'moment';
import { useApi } from '@/services/api.js';
import ApexCharts from 'apexcharts';

let data = ref();
let dataReq = reactive(useApi());
let filters = reactive({
  from: moment().subtract(1, 'month'),
  to: moment(),
  types: []
});

let chart = null;

async function drawChart() {
  let res = await dataReq.send(
    `/api/client/v1/dashboard/transactions-overview`,
    'GET',
    null,
    {
      from: moment(filters.from).format('YYYY-MM-DD HH:mm'),
      to: moment(filters.to).format('YYYY-MM-DD HH:mm'),
      types: filters.types.join(',')
    }
  );

  data.value = res;

  filters.types = [];
  res.transTypes.forEach(type => {
    filters.types.push(type.code);
  });

  let chartOptions = {
    chart: {
      type: 'pie',
      height: '100%',
    },
    series: data.value.transTypes.map(pm => +pm.total).some(total => total > 0) ? 
      data.value.transTypes.map(pm => +pm.total) : [],

    labels: data.value.transTypes.map(pm => pm.name),
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
    },
    noData: {
      text: 'No transactions for the duration!',
      style: {
        fontFamily: 'Manrope'
      }
    },
  }

  if (chart) {
    chart.updateOptions(chartOptions);
  }
  else {
    chart = new ApexCharts(document.getElementById('transactions-overview'), chartOptions);
    chart.render();
  }
}

function onFiltersApplied(modal) {
  modal.close();
  drawChart();
}

onMounted(() => {
  filters.from = moment().startOf('day').format('YYYY-MM-DD HH:mm');
  filters.to = moment().format('YYYY-MM-DD HH:mm');

  drawChart();
});

onBeforeUnmount(() => {
  chart.destroy();
})
</script>