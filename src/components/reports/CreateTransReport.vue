<template>
  <modal-dialog size="sm" class="ml-1" dialog-title="Transaction Report Options" @open="getInitialData()">
    <template #trigger>
      <button class="btn btn-round btn-small">
        <msr-icon>chevron_right</msr-icon>
      </button>
    </template>
    <template #default>
      <div v-if="getInitialDataReq.success">
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
            <div class="flex justify-between items-center mt-6">
              <div class="my-6 col-tags">
                <p class="tag bg-primary-200">Transaction Types</p>
              </div>
              <div class="actions">
                <button class="btn btn-small" @click="selectAll()">All</button>
                <button class="btn btn-small ml-1" @click="deSelectAll()">None</button>
              </div>
            </div>
            <div class="row-item" v-for="transType in allTransTypes" :key="transType.code">
              <div class="flex justify-between items-center">
                <p class="leading-none">{{ transType.name }}</p>
                <div class="sw py-1">
                  <label for="">
                    <input type="checkbox" :value="transType.code" v-model="filters.transTypes">
                  </label>
                </div>
              </div>
            </div>
  
            <!-- users -->
            <div class="flex justify-between items-center mt-6">
              <div>
                <p class="leading-none">All Users</p>
                <p class="leading-none text-xs mt-1">Show report for all users.</p>
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
      </div>
      <div v-else>
        <loading-dots :progress="getInitialDataReq.progress" :message="getInitialDataReq.message"></loading-dots>
      </div>
    </template>
  </modal-dialog>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useApi } from '@/services/api.js';
import moment from 'moment';
import { useReports } from '@/services/reports.js';
import { Toast } from '@capacitor/toast';

let props = defineProps([
  'report'
]);

let filters = reactive({
  from: '',
  to: '',
  transTypes: [],
  allUsers: false
});

let allTransTypes = ref([]);
let user = ref();
let getInitialDataReq = reactive(useApi());
let createReportReq = reactive(useApi());
let actions = reactive(useReports('Transaction Report'));

function getInitialData() {
  getInitialDataReq.send(
    `/api/client/v1/reports/transactions/create`,
  )
  .then (res => {
    if (res) {
      allTransTypes.value = res.allTransTypes;

      // init filters
      filters.from = moment().startOf('day').format('YYYY-MM-DD HH:mm');
      filters.to = moment().endOf('day').format('YYYY-MM-DD HH:mm');

      user.value = res.user;

      selectAll();
    }
  });
}

function selectAll() {
  filters.transTypes = allTransTypes.value.map(t => t.code);
}

function deSelectAll() {
  filters.transTypes = [];
}

function createReport(callback) {
  createReportReq.send(
    `/api/client/v1/reports/transactions`,
    'POST',
    {
      report: props.report,
      from: filters.from,
      to: filters.to,
      transTypes: filters.transTypes.join(','),
      user: filters.allUsers ? null : user.value.id
    }
  )
  .then (res => {
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
</script>