<template>
  <div class="relative">

    <!-- trigger -->
    <div class="cursor-pointer" @click.prevent="open">
      <slot name="trigger"></slot>
    </div>

    <!-- overlay -->
    <transition name="fade-blur">
      <div class="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-10" v-if="isOpen" @click.prevent="close"></div>
    </transition>

    <!-- panel -->
    <transition name="bottom-up">
      <div class="panel bg-white rounded-t-xl fixed bottom-0 right-0 w-full md:max-w-xs max-h-[90%] overflow-y-auto z-20" v-if="isOpen">
        <slot :open="open" :close="close" :isOpen="isOpen"></slot>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue';

let props = defineProps([
  'size'
]);
let emits = defineEmits([
  'open',
  'close',
]);
let isOpen = ref(false);
let modal = inject('modal');

function open () {
  isOpen.value = true;
  if (modal.register({
    isOpen: isOpen,
  })) {
    emits('open');
  };
}

function close () {
  isOpen.value = false;
  emits('close');
}

defineExpose({
  open,
  close
});

</script>
<style scoped>
.fade-blur-enter-active, .fade-blur-leave-active {
  @apply duration-150;
}
.fade-blur-enter-from, .fade-blur-leave-to {
  @apply bg-opacity-0;
}
.bottom-up-enter-active, .bottom-up-leave-active {
  @apply duration-150 translate-y-0 opacity-100;
}

.bottom-up-enter-from, .bottom-up-leave-to {
  @apply duration-150 translate-y-16 opacity-0;
}
</style>