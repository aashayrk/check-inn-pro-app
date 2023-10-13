<template>
  <div class="p-6">
    <div class="border border-primary-200 rounded-xl">
      <div class="row tight"> 
        <div class="col-2">
          <p class="leading-none">Room Number</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.room.number }}</p>
        </div>
      </div>
      <div class="row tight"> 
        <div class="col-2">
          <p class="leading-none">Blocked from</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.allocation.from }}</p>
        </div>
      </div>
      <div class="row tight"> 
        <div class="col-2">
          <p class="leading-none">Blocked upto</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.allocation.upto }}</p>
        </div>
      </div>
      <div class="row tight"> 
        <div class="col-2">
          <p class="leading-none">Reason</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.allocation.note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let props = defineProps([
  'room',
  'allocation'
]);
</script>