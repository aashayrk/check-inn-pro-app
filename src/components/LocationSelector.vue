<template>
  <div>
    <div class="grid lg:grid-cols-3 gap-4">

      <!-- country -->
      <div>
        <label>Country</label>
        <select class="input" v-model="country" @change="getStates()" :disabled="request.progress">
          <option value="">Select Country</option>
          <option :value="country.id" v-for="(country, index) in countries" :key="index">
            {{ country.name }}
          </option>
        </select>
      </div>

      <!-- state -->
      <div>
        <label>State</label>
        <select class="input" v-model="state" @change="getCities()" :disabled="request.progress">
          <option value="">Select State</option>
          <option :value="state.id" v-for="(state, index) in states" :key="index">
            {{ state.name }}
          </option>
        </select>
      </div>

      <!-- city -->
      <div>
        <label>City</label>
        <select class="input" v-model="city" @change="getData()" :disabled="request.progress">
          <option value="">Select City</option>
          <option :value="city.id" v-for="(city, index) in cities" :key="index">
            {{ city.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '@/services/api.js';

let countries = ref([]);
let states = ref([]);
let cities = ref([]);
let country = ref('');
let state = ref('');
let city = ref('');

let request = reactive(useApi());
let props = defineProps([
  'country',
  'state',
  'city'
]);
let emits = defineEmits([
  'country',
  'state',
  'city'
]);

function getData() {
  request.send(
    `/api/v1/location`,
    'POST',
    {
      country: country.value,
      state: state.value,
      city: city.value,
    }
  )
  .then (res => {
    if (res) {
      countries.value = res.countries;
      states.value = res.states;
      cities.value = res.cities;
    }

    emits('country', country.value);
    emits('state', state.value);
    emits('city', city.value);
  });
}

function getCountries() {
  country.value = '';
  state.value = '';
  city.value = '';
  getData();
}

function getStates() {
  state.value = '';
  city.value = '';
  getData();
}

function getCities() {
  city.value = '';
  getData();
}

onMounted(() => {
  getCountries();

  if (props.country) {
    country.value = props.country;
    getStates();
  }

  if (props.state) {
    state.value = props.state;
    getCities();
  }

  if (props.city) {
    city.value = props.city;
  }
});
</script>