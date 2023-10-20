<template>
  <modal-dialog size="sm" class="ml-1" dialog-title="Actual Arrivals Report Options">
    <template #trigger>
      <button class="btn btn-round btn-small">
        <msr-icon>chevron_right</msr-icon>
      </button>
    </template>
    <template #default>
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
        <button class="btn btn-round" @click="download()" :disabled="actions.progress">
          <msr-icon>download</msr-icon>
        </button>
        <button class="btn btn-round ml-1" @click="mail()" :disabled="actions.progress">
          <msr-icon>send</msr-icon>
        </button>
        <button class="btn btn-round ml-1" @click="share()" :disabled="actions.progress">
          <msr-icon>share</msr-icon>
        </button>
        <!-- <button class="btn ml-1" @click="view()" :disabled="actions.progress">
          <span>View</span>
          <msr-icon>arrow_forward</msr-icon>
        </button> -->
      </div>
    </template>
  </modal-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import { useReports } from '@/services/reports.js';
import { Toast } from '@capacitor/toast';
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
let actions = reactive(useReports('Actual Arrivals Report'));

function createReport(callback) {
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
        callback(res.url);
      }
      else {
        callback(false);
      }
    });
}

function download() {
  createReport(url => {
    if (url) {
      actions.download(url, result => {
        if (result) {
          Toast.show({
            text: `Report downloaded as ${result.uri}.`,
            duration: 'long'
          })
        }
        else {
          Toast.show({
            text: 'Unable to download report!'
          })
        }
      })
    }
    else {
      Toast.show({
        text: 'Unable to prepare report!'
      })
    }
  })
}

function mail() {
  createReport(url => {
    if (url) {
      actions.mail(url);
    }
    else {
      Toast.show({
        text: 'Unable to prepare report!'
      })
    }
  })
}

function share() {
  createReport(url => {
    if (url) {
      actions.share(url);
    }
    else {
      Toast.show({
        text: 'Unable to prepare report!'
      })
    }
  })
}

function view() {
  createReport(url => {
    if (url) {
      actions.view(url);
    }
    else {
      Toast.show({
        text: 'Unable to prepare report!'
      })
    }
  })
}

onMounted(() => {
  filters.from = moment().startOf('day').format('YYYY-MM-DD HH:mm');
  filters.to = moment().endOf('day').format('YYYY-MM-DD HH:mm');
});
</script>