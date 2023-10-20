<template>
  <modal-dialog size="sm" class="ml-1" dialog-title="Collection Report Options" @open="getInitialData()">
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
          <div class="flex justify-between items-center mt-6">
            <div class="my-6 col-tags">
              <p class="tag bg-primary-200">Payment Modes</p>
            </div>
            <div class="actions">
              <button class="btn btn-small" @click="selectAll()">All</button>
              <button class="btn btn-small ml-1" @click="deSelectAll()">None</button>
            </div>
          </div>
          <div class="row-item" v-for="payMode in allPayModes" :key="payMode.code">
            <div class="flex justify-between items-center">
              <p class="leading-none">{{ payMode.name }}</p>
              <div class="sw py-1">
                <label for="">
                  <input type="checkbox" :value="payMode.code" v-model="filters.payModes">
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
          
          <!-- cancelled receipts -->
          <div class="flex justify-between items-center mt-6">
            <div>
              <p class="leading-none">Cancelled Receipts</p>
              <p class="leading-none text-xs mt-1">Show report for cancelled receipts only.</p>
            </div>
            <div class="sw py-1">
              <label for="">
                <input type="checkbox" v-model="filters.cancelledOnly" title="Cancelled Only">
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
  payModes: [],
  allUsers: false,
  cancelledOnly: false
});

let allPayModes = ref([]);
let user = ref();
let getInitialDataReq = reactive(useApi());
let createReportReq = reactive(useApi());
let actions = reactive(useReports('Collection Report'));

function getInitialData() {
  getInitialDataReq.send(
    `/api/client/v1/reports/collection/create`,
  )
    .then(res => {
      if (res) {
        allPayModes.value = res.allPayModes;

        // init filters
        filters.from = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        filters.to = moment().endOf('day').format('YYYY-MM-DD HH:mm');

        user.value = res.user;

        selectAll();
      }
    });
}

function selectAll() {
  filters.payModes = allPayModes.value.map(pm => pm.code);
}

function deSelectAll() {
  filters.payModes = [];
}

function createReport(callback) {
  createReportReq.send(
    `/api/client/v1/reports/collection`,
    'POST',
    {
      report: props.report,
      from: filters.from,
      to: filters.to,
      payModes: filters.payModes.join(','),
      allUsers: filters.allUsers ? null : user.value.id,
      cancelledOnly: filters.cancelledOnly ? true : null
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
</script>