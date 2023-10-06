<template>
  <div>

    <!-- month navigator -->
    <div class="p-2 flex items-center justify-between">
      <p class="btn btn-transparent">
        {{ months[calendarDate.getMonth()] }} - {{ calendarDate.getFullYear() }}
      </p>
      <div class="flex">
        <button class="btn btn-round btn-transparent"
          @click.prevent="navigate(-1)"
          :disabled="! canGoBack">
          <msr-icon>chevron_left</msr-icon>
        </button>
        <button class="btn btn-round btn-transparent ml-2"
          @click.prevent="navigate(1)"
          :disabled="! canGoForward">
          <msr-icon>chevron_right</msr-icon>
        </button>
      </div>
    </div>

    <!-- day names -->
    <div class="flex bg-primary-100">
      <div class="day-name p-2" v-for="name in dayNames" :key="name">
        <span class="leading-none text-xs font-bold">{{ name }}</span>
      </div>
    </div>

    <!-- days -->
    <div class="flex flex-wrap transition-opacity duration-500 bg-white p-px" :class="{'opacity-25': props.disabled}">
      <div class="day-wrapper p-px relative" v-for="day in days" :key="day.date">

        <!-- days -->
        <div class="day h-full w-full flex flex-col bg-stone-50 cursor-pointer overflow-hidden"
          v-if="day.date !== undefined"
          :class="{
            'today': day.isToday,
            'selected': day.isSelected,
          }"
          @click.prevent="select(day.date)">

          <!-- date -->
          <div class="flex p-2 pt-6">
            <span class="leading-none text-xl font-medium">{{ day.date }}</span>
          </div>

          <!-- tariff -->
          <div class="tariffs items-center p-2 border-t-4" v-if="day.date !== undefined && day.tariff" :class="{
            'border-primary-400': ! day.isWeekend && day.tariff.rev === 0, 
            'border-yellow-400': day.isWeekend && day.tariff.rev === 0, 
            'border-red-400': day.isWeekend && day.tariff.rev > 0, 
          }">
            <p class="leading-none text-xxs md:text-xs md:leading-none">
              tar : {{ day.isWeekend ? day.tariff.base_we : day.tariff.base_wd }}
            </p>
            <p class="leading-none text-xxs md:text-xs md:leading-none mt-1">
              exa : {{ day.isWeekend ? day.tariff.extra_adult_we : day.tariff.extra_adult_wd }}
            </p>
            <p class="leading-none text-xxs md:text-xs md:leading-none mt-1">
              exc : {{ day.isWeekend ? day.tariff.extra_child_we : day.tariff.extra_child_wd }}
            </p>
          </div>
          <div v-else>
            <div class="p-2 bg-stone-100">
              <p class="leading-none text-xs">NA</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- revise tariff -->
    <div class="p-6 flex justify-end border-t border-stone-100" v-if="selectedDay">
      <modal-dialog :disabled="! canReviseTariff">
        <template #trigger>
          <button class="btn btn-primary" :disabled="! canReviseTariff">
            <span>Revise Tariff</span>
            <msr-icon>refresh</msr-icon>
          </button>
        </template>
        <info-section section-title="Revise Tariff">
          <revise-tariff :package="props.package" :day="selectedDay" :tariff="selectedDay.tariff"></revise-tariff>
        </info-section> 
      </modal-dialog>
    </div>
  </div>
</template>
<script setup>
import ReviseTariff from '@/vue/client/packages/ReviseTariff.vue';
import { ref, onMounted,defineEmits, defineProps,defineExpose, computed } from "vue";
import moment from 'moment';

let props = defineProps([
  'calendarTitle',
  'disabled',
  'package',
  'tariffs'
]);

let emit = defineEmits([
  "rendered",
  "marked",
  "navigated",
  "selected",
  "revise-tariff"
]);

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let today = new Date();
let calendarDate = ref(new Date());
let days = ref([]);
let selectedDay = ref();

function render() {
  days.value = [];

  let totalDays = new Date(
    calendarDate.value.getFullYear(),
    calendarDate.value.getMonth() + 1,
    0
  ).getDate();

  let firstDay = new Date(
    calendarDate.value.getFullYear(),
    calendarDate.value.getMonth(),
    1
  ).getDay();

  // render blank days if any
  for (let i = 0; i < firstDay; i++) {
    days.value.push({});
  }

  // render real days
  for (let i = 1; i <= totalDays; i++) {

    let date = i;
    let month = calendarDate.value.getMonth() + 1;
    let year = calendarDate.value.getFullYear();
    let day = new Date(year, (month - 1), date).getDay();
    let dateString = `${year}-${month}-${date}`;
    let mt = moment(dateString, 'YYYY-M-D');

    days.value.push(
      {
        date,
        month,
        year,
        day,
        isWeekend: ((day % 6) === 0),
        dateString, 
        mt,
        isToday:
          i === today.getDate() &&
          calendarDate.value.getMonth() === today.getMonth() &&
          calendarDate.value.getFullYear() === today.getFullYear(),

        isSelected: false,
        isMarked: false,
        isHighlighted: false,
        bookings: [],
        tariff: tariffForTheDay({
          date,
          month,
          year,
        })
      }
    );
  }

  emit("rendered", {
    date: calendarDate.value.getDate(),
    month: (calendarDate.value.getMonth() + 1),
    year: calendarDate.value.getFullYear()
  });
}

function tariffForTheDay(day) {
  let date = moment(new Date(day.year, day.month, day.date, 0, 0, 0, 0));
  let tariff = null;

  props.tariffs.forEach(tar => {
    let tariffWef = moment(new Date(tar.wef_year, tar.wef_month, tar.wef_date, 0, 0, 0, 0));
    
    if (tariffWef.isSameOrBefore(date)) {
      tariff = tar;
    }
  });
  
  return tariff;
}

function navigate(direction) {
  calendarDate.value = new Date(
    calendarDate.value.getFullYear(),
    calendarDate.value.getMonth() + direction,
    1
  );

  render();
}

function select(date) {
  if (date === undefined) {
    return;
  }

  if (props.disabled) {
    return;
  }

  days.value.map((day) => {
    if (day.date === date) {
      day.isSelected = true;
      
      selectedDay.value = day;
    } 
    else {
      day.isSelected = false;
    }
    
    return day;
  });
}

let canGoBack = computed(() => {  
  let packageCategoryActiveFrom = moment(props.package.category.active_from_input);
  let navigated = moment(calendarDate.value.toISOString()); 

  return packageCategoryActiveFrom.isSameOrBefore(navigated);
});

let canGoForward = computed(() => {  
  if (props.package.category.ends_on) {
    let packageCategoryEndsOn = moment(props.package.category.ends_on_input);
    let navigated = moment(calendarDate.value.toISOString()); 
  
    return navigated.isSameOrBefore(packageCategoryEndsOn);
  }

  return true;
});

let canReviseTariff = computed(() => {
  let today = moment();

  return selectedDay.value.mt.startOf('day').isSameOrAfter(today.startOf('day'));
});

// exposed properties
defineExpose({
  render
});

onMounted(() => {
  calendarDate.value = new Date();
  render();
});

</script>

<style scoped>
  .day-name {
    width: 14.285714%;
  }
  .day-wrapper {
    width: 14.285714%;
  }
  .day.today {
    @apply bg-primary-100;
  }
  .day.today .tariffs {
    @apply bg-primary-100;
  }
  .day.selected {
    @apply bg-primary-500 text-white;
  }
  .day.selected .tariffs {
    @apply text-white;
  }
  .day.today.selected {
    @apply bg-primary-500 text-white;
  }
  .day.today.selected .tariffs {
    @apply bg-primary-500 text-white;
  }
  .day .special {
    animation-name: stretchSquash;
    animation-direction: alternate;
    animation-duration: 850ms;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
    @apply rounded-full w-8 h-8 bg-red-300 bg-opacity-25;
  }

  .day .marked {
    @apply rounded-full w-8 h-8 ring-2 ring-red-300;
  }

  @keyframes stretchSquash {
    0% {
      @apply w-6 h-6;
    }
    100% {
      @apply w-10 h-10;
    }
  }
</style>