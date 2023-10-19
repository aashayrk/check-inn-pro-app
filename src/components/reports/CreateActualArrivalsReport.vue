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

            <!-- users -->
            <div class="flex justify-between items-center mt-6">
              <div>
                <p class="leading-none">All Users</p>
                <p class="leading-none text-xs mt-1">Show report for all Users</p>
              </div>
              <div class="sw py-1">
                <label for="">
                  <input type="checkbox" v-model="filters.allUsers" title="All Users">
                </label>
              </div>
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
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import moment from 'moment';

let props = defineProps([
  'report'
]);

let filters = reactive({
  from: '',
  to: '',
  allUsers: false,
});

let user = ref();
let createReportReq = reactive(useApi());
let getInitialDataReq = reactive(useApi());

function createReport() {
  createReportReq.send(
    `/api/client/v1/reports/actual-arrivals`,
    'POST',
    {
      report: props.report,
      from: filters.from,
      to: filters.to,
      allUsers: filters.allUsers,
    }
  )
    .then(res => {
      if (res) {
        window.open(res.url, 'blank');
      }
    });
}

onMounted(() => {
  filters.from = moment().startOf('day').format('YYYY-MM-DD HH:mm');
  filters.to = moment().endOf('day').format('YYYY-MM-DD HH:mm');
});
</script>