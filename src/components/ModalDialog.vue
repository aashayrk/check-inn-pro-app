<template>
  <div class="relative">

    <!-- trigger -->
    <div @click.prevent="open">
      <slot name="trigger"></slot>
    </div>

    <!-- overlay -->
    <transition name="fade-blur">
      <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 backdrop-grayscale z-10" v-if="isOpen">
      </div>
    </transition>
    
    <!-- panel -->
    <transition name="bottom-up">
      <div class="fixed bottom-0 right-0 w-full max-h-[90%] overflow-y-auto z-20 bg-white md:max-w-md" 
      v-if="isOpen" ref="panel">
        <div class="flex items-center justify-between sticky top-0 bg-white z-10">
          <div class="h-10 flex items-center">
            <p class="leading-none text-xs uppercase font-bold px-6">{{ props.dialogTitle ?? 'Modal Dialog' }}</p>
          </div>
          <button class="btn btn-round btn-small bg-stone-200 border-b-2 border-stone-300 absolute right-0 top-0 rounded-none" @click.prevent="close">
            <msr-icon>close</msr-icon>
          </button>
        </div>

        <!-- content -->
        <div class="bg-white rounded-t-xl overflow-y-auto">
          <slot :open="open" :close="close" :isOpen="isOpen"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

let props = defineProps([
  'dialogTitle',
  'size',
  'disabled'
]);

let panel = ref(null);
let modal = inject('modal');
let isOpen = ref(false);
let emits = defineEmits([
  'open',
  'close'
]);

function open () {
  if (! props.disabled) {
    isOpen.value = true;

    if (modal.register({
      isOpen: isOpen,
    })) {
      emits('open');
    };
  }
}

function close () {
  if (modal.close()) {
    emits('close');
  };
}

onMounted(() => {
  //
});

onBeforeUnmount(() => {
  document.removeEventListener('keyup', close);
});

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
  @apply duration-75 bg-opacity-0;
}
.bottom-up-enter-active, .bottom-up-leave-active {
  @apply duration-150 opacity-100 translate-y-0;
}

.bottom-up-enter-from, .bottom-up-leave-to {
  @apply duration-150 opacity-0 translate-y-16;
}
</style>