<template>
  <page page-title="Reports" tab-bar="true">
    <page-topbar menu="true"></page-topbar>
    
    <info-section section-title="Reports">

      <!-- transactions -->
      <div class="data-row" v-if="userAbilities.allow('viewTransactionsReport', 'dailyReports')">
        <div class="data-info">
          <div class="row">
            <div class="col-1">
              <p class="leading-none flex items-center">
                <msr-icon>sync_alt</msr-icon>
                <span class="ml-6 leading-none">Transactions</span>
              </p>
            </div>
          </div>
        </div>
        <div class="data-actions">
          <create-trans-report report="transactions"></create-trans-report>
        </div>
      </div>

      <!-- collection -->
      <div class="data-row" v-if="userAbilities.allow('viewCollectionReport', 'dailyReports')">
        <div class="data-info">
          <div class="row">
            <div class="col-1">
              <p class="leading-none flex items-center">
                <msr-icon>currency_rupee</msr-icon>
                <span class="ml-6 leading-none">Collection</span>
              </p>
            </div>
          </div>
        </div>
        <div class="data-actions">
          <create-collection-report report="collections"></create-collection-report>
        </div>
      </div>

      <!-- Actual Arrivals -->
      <div class="data-row" v-if="userAbilities.allow('viewActualArrivalsReport', 'dailyReports')">
        <div class="data-info">
          <div class="row">
            <div class="col-1">
              <p class="leading-none flex items-center">
                <msr-icon>south_east</msr-icon>
                <span class="ml-6 leading-none">Actual Arrivals</span>
              </p>
            </div>
          </div>
        </div>
        <div class="data-actions">
          <create-actual-arrivals-report report="actual-arrivals"></create-actual-arrivals-report>
        </div>
      </div>

      <!-- Actual Departures -->
      <div class="data-row" v-if="userAbilities.allow('viewActualDeparturesReport', 'dailyReports')">
        <div class="data-info">
          <div class="row">
            <div class="col-1">
              <p class="leading-none flex items-center">
                <msr-icon>north_east</msr-icon>
                <span class="ml-6 leading-none">Actual Departures</span>
              </p>
            </div>
          </div>
        </div>
        <div class="data-actions">
          <create-actual-departures-report report="actual-departures"></create-actual-departures-report>
        </div>
      </div>

      <!-- Occupancy -->
      <div class="data-row" v-if="userAbilities.allow('viewOccupancyReport', 'dailyReports')">
        <div class="data-info">
          <div class="row">
            <div class="col-1">
              <p class="leading-none flex items-center">
                <msr-icon>bed</msr-icon>
                <span class="ml-6 leading-none">Occupancy</span>
              </p>
            </div>
          </div>
        </div>
        <div class="data-actions">
          <create-occupancy-report report="occupancy"></create-occupancy-report>
        </div>
      </div>
    </info-section>
  </page>
</template>
<script setup>
import CreateTransReport from './CreateTransReport.vue';
import CreateCollectionReport from './CreateCollectionReport.vue';
import CreateActualArrivalsReport from './CreateActualArrivalsReport.vue';
import CreateActualDeparturesReport from './CreateActualDeparturesReport.vue';
import CreateOccupancyReport from './CreateOccupancyReport.vue';

import { useUserAbilities } from '@/services/userAbilities';

let userAbilities = useUserAbilities();
</script>