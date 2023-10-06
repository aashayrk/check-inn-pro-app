<template>
  <div class="p-6">
    <div class="border border-stone-100 rounded-xl">
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Transaction type</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.transaction.type.code }} - {{ props.transaction.type.name }}</p>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Transaction Date</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.transaction.date }}</p>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Quantity</p>
        </div>
        <div class="col-2">
          <p class="leading-none">{{ props.transaction.quantity }}</p>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Rate</p>
        </div>
        <div class="col-2">
          <p class="leading- currency">{{ props.transaction.rate }}</p>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">Amount</p>
        </div>
        <div class="col-2">
          <p class="leading-none currency">{{ props.transaction.amount }}</p>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">CGST</p>
        </div>
        <div class="col-2">
          <p class="leading-none currency">{{ props.transaction.cgst_amount }} @ {{ props.transaction.cgst }}%</p>
        </div>
      </div>
      <div class="row tight">
        <div class="col-2">
          <p class="leading-none">SGST</p>
        </div>
        <div class="col-2">
          <p class="leading-none currency">{{ props.transaction.sgst_amount }} @ {{ props.transaction.sgst }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let props = defineProps([
  'transaction',
  'booking'
]);
</script>