<template>
  <div class="relative">

    <!-- backdrop -->
    <transition name="fade">
      <div class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-grayscale flex items-end justify-end rounded-b-xl z-10 p-1" v-if="props.req.progress || props.req.success === false">
      </div>
    </transition>

    <!-- message -->
    <transition name="fade">
      <div class="absolute left-0 bottom-0 message p-6 bg-primary-100 rounded-b-xl w-full max-h-full overflow-y-auto z-20" 
      v-if="props.req.progress || props.req.success === false">
        <p class="leading-tight">
          {{ props.req.message }}
        </p>
        <div class="actions mt-12" v-if="props.req.success === false">
          <button class="btn btn-white" @click.prevent="reset">
            <msr-icon name="arrow_back"></msr-icon>
            <span>Back</span>
          </button>
          <button class="btn btn-primary ml-1" @click.prevent="retry">
            <span>Retry</span>
            <msr-icon name="sync"></msr-icon>
          </button>
        </div>
      </div>
    </transition>

    <!-- content -->
    <slot></slot>
  </div>
</template>
<script setup>
let props = defineProps([
  'req'
]);

let emits = defineEmits([
  'retry',
  'reset'
]);

function retry() {
  emits('retry');
}

function reset() {
  emits('reset');
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  @apply transform duration-150 opacity-100;
}

.fade-enter-from, .fade-leave-to {
  @apply transform duration-150 opacity-0;
}
.bottom-in-enter-active, .bottom-in-leave-active {
  @apply transform duration-150 origin-bottom scale-100 opacity-100;
}

.bottom-in-enter-from, .bottom-in-leave-to {
  @apply transform duration-150 origin-bottom scale-90 opacity-0;
}
</style>
