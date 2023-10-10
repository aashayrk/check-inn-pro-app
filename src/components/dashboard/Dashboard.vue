<template>
  <div>
    <page page-title="Dashboard" tab-bar="true">
      <page-topbar page-title="Dashboard" menu="true"></page-topbar>
      <occupancy-overview></occupancy-overview>
      <transactions-overview class="mt-2"></transactions-overview>
      <collection-overview class="mt-2"></collection-overview>
    </page>
  </div>
</template>
<script setup>
import TabBar from '@/components/layout/TabBar.vue';
import OccupancyOverview from './OccupancyOverview.vue';
import TransactionsOverview from './TransactionsOverview.vue';
import CollectionOverview from './CollectionOverview.vue';
</script>