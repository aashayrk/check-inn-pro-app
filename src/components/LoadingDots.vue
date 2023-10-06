<template>
  <div>
    <div class="inline-flex items-center p-6">
      <div class="flex mr-4" id="loader" v-if="props.progress">
        <div class="dot dot1 w-2 h-2 rounded-full bg-primary-600"></div>
        <div class="dot dot2 w-2 h-2 rounded-full bg-primary-500 ml-2"></div>
        <div class="dot dot3 w-2 h-2 rounded-full bg-primary-400 ml-2"></div>
      </div>
      <p class="leading-none">{{ props.message }}</p>
    </div>
  </div>
</template>
<script setup>
let props = defineProps([
  'progress',
  'message'
]);
</script>
<style scoped>
  .dot1 {
    animation-name: pulse;
    animation-duration: 450ms;
    animation-delay: 0ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  
  .dot2 {
    animation-name: pulse;
    animation-duration: 450ms;
    animation-delay: 150ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  
  .dot3 {
    animation-name: pulse;
    animation-duration: 450ms;
    animation-delay: 300ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes pulse {
    0% {
      transform: scale(100%); 
    }
    100% {
      transform: scale(120%);
    }
  }
</style>