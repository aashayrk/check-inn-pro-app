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
                <msr-icon>summarize</msr-icon>
                <span class="ml-6 leading-none">Transactions Report</span>
              </p>
            </div>
          </div>
        </div>
        <div class="data-actions">
          <create-trans-report report="transactions"></create-trans-report>
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