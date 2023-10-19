<template>
  <div>
    <page page-title="Dashboard" tab-bar="true">
      <page-topbar page-title="Dashboard" menu="true"></page-topbar>
      <occupancy-overview></occupancy-overview>
      <transactions-overview></transactions-overview>
      <collection-overview></collection-overview>
    </page>
  </div>
</template>
<script setup>
import OccupancyOverview from './OccupancyOverview.vue';
import TransactionsOverview from './TransactionsOverview.vue';
import CollectionOverview from './CollectionOverview.vue';
</script>