<template>
  <modal-dialog size="sm" class="ml-1" dialog-title="Occupancy Report Options">
    <template #trigger>
      <button class="btn btn-round btn-small">
        <msr-icon>chevron_right</msr-icon>
      </button>
    </template>
    <template #default>
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
import { reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';
import { useReports } from '@/services/reports.js';
import { Toast } from '@capacitor/toast';
import { FileOpener } from '@capacitor-community/file-opener';
import moment from 'moment';

let props = defineProps([
  'report'
]);

let filters = reactive({
  date: null,
  withAmount: false,
});

let createReportReq = reactive(useApi());
let actions = reactive(useReports('Occupancy Report'));

function createReport(callback) {
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

          FileOpener.open({
            filePath: result.uri
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
  filters.date = moment().format('YYYY-MM-DD HH:mm');
});
</script>