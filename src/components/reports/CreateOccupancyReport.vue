<template>
  <modal-dialog size="sm" class="ml-1">
    <template #trigger>
      <button class="btn btn-round btn-small">
        <msr-icon>chevron_right</msr-icon>
      </button>
    </template>
    <template #default>
      <info-section section-title="Filters">
        <div class="p-6">
          <div>
            <label for="">Date</label>
            <input class="input" type="datetime-local" v-model="filters.date">
          </div>
          <div class="flex justify-between items-center mt-6">
            <div>
              <p class="leading-none">With Amount</p>
              <p class="leading-none text-xs mt-1">Show report with Tariff</p>
            </div>
            <div class="sw py-1">
              <label for="">
                <input type="checkbox" v-model="filters.withAmount" title="With Amount">
              </label>
            </div>
          </div>
        </div>

        <!-- actions -->
        <div class="actions p-6">
          <button class="btn btn-primary" @click="createReport()" :disabled="createReportReq.progress">
            <span>View Report</span>
            <msr-icon>arrow_forward</msr-icon>
          </button>
        </div>
      </info-section>
    </template>
  </modal-dialog>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import moment from 'moment';

let props = defineProps([
  'report'
]);

let filters = reactive({
  date: null,
  withAmount: false,
});

let createReportReq = reactive(useApi());

function createReport() {
  createReportReq.send(
    `/api/client/v1/reports/occupancy`,
    'POST',
    {
      report: props.report,
      date: filters.date,
      withAmount: filters.withAmount ?? null,
    }
  )
  .then(res => {
    if (res) {
      window.open(res.url, 'blank');
    }
  });
}

onMounted(() => {
  filters.date = moment().format('YYYY-MM-DD HH:mm');
});
</script>