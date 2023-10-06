<template>
  <div class="relative w-full">
    <input type="text" class="input" @keydown.prevent.up="up()" @keydown.prevent.down="down()" v-model="keywords" @focus="focus()" @blur="blur()" @keyup.enter="select()" @keyup.stop.esc="clear()" @keyup.backspace="clear()">

    <div class="absolute left-0 top-full max-w-full mt-2 z-10" v-if="keywords && keywords !== selected">
      <div class="bg-white rounded-sm shadow-md overflow-hidden">
        <div v-for="(item, index) in matches" :key="index">
          <div class="p-6 py-2 hover:bg-primary-100 cursor-pointer" @mouseover="selectedIndex = index" :class="{'bg-primary-200': selectedIndex === index}">
            <p class="leading-none text-xs">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue';

let props = defineProps([
  'data',
  'value'
]);

let emits = defineEmits([
  'selected'
]);

let keywords = ref('');
let list = ref([
  'Amanda Hug',
  'Ben Dover',
  'Eileen Dover',
  'Willie Makit',
  'Willie Findit',
  'Skye Blue',
  'Staum Clowd',
  'Addie Minstra',
  'Anne Ortha',
  'Dave Allippa',
  'Dee Zynah',
  'Hugh Mannerizorsa',
  'Loco Lyzayta',
  'Manny Jah',
  'Mark Ateer',
  'Reeve Ewer',
  'Tex Ryta',
  'Theresa Green',
  'Barry Kade',
  'Stan Dupp',
  'Neil Down',
  'Con Trariweis',
  'Don Messwidme',
]);
let focused = ref(false);
let selectedIndex = ref(undefined);
let matches = computed(() => {
  if (keywords.value) {
    selectedIndex.value = 0;
    return props.data.filter(item => item.toLowerCase().indexOf(keywords.value.trim().toLowerCase()) !== -1)
  }

  return [];
});
let selected = computed(() => {
  if (keywords.value) {
    return matches.value[selectedIndex.value];
  }

  return '';
});

function focus() {
  focused.value = true;
}

function blur() {
  focused.value = false;
  select();
}

function up() {
  selectedIndex.value === 0 ? selectedIndex.value = (matches.value.length - 1) : selectedIndex.value--;
}

function down() {
  selectedIndex.value === (matches.value.length - 1) ? selectedIndex.value = 0 : selectedIndex.value++;
}

function select() {
  keywords.value = matches.value[selectedIndex.value];
  emits('selected', selected.value);
}

function clear() {
  keywords.value = '';
  emits('selected', selected.value);
}

onMounted(() => {
  if (props.value) {
    keywords.value = props.value;
    select();
  }
});

</script>
